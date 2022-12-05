import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ethereum, ipfs } from '../../../config';
import { BlockchainService, ContractTypes, ProviderType } from '../blockchain';
import { ContractPoolDTO, IContractPool } from './dto';
import { create, IPFSHTTPClient } from 'ipfs-http-client';

@Injectable()
export class ContractPoolsService {
  private logger = new Logger('ContractPoolsService');
  private ipfsClient: IPFSHTTPClient;

  constructor(
    @Inject(ethereum.KEY)
    private readonly ethereumConfig: ConfigType<typeof ethereum>,
    @Inject(ipfs.KEY)
    private readonly ipfsConfig: ConfigType<typeof ipfs>,
    private readonly blockchainService: BlockchainService,
  ) {
    const ipfsAuthorization =
      'Basic ' +
      Buffer.from(
        ipfsConfig.ipfsProjectId + ':' + ipfsConfig.ipfsSecret,
      ).toString('base64');
    this.ipfsClient = create({
      host: `ipfs.infura.io`,
      port: 5001,
      protocol: `https`,
      headers: {
        authorization: ipfsAuthorization,
      },
    });
  }

  public async create(pool: ContractPoolDTO): Promise<ContractPoolDTO> {
    const hypeContractInstance = this.blockchainService.getContractInstance(
      ContractTypes.HYPE_POOL,
      this.ethereumConfig.hypeContractAddress,
      ProviderType.WALLET,
    );
    const ipfsUri = await this.uploadToIpfs(pool.description);
    const formatedEndDate = new Date(pool.endDate).getTime();
    const overrideOptions = {
      gasLimit: 9999999,
    };
    try {
      const tx = await hypeContractInstance.createPool(
        ipfsUri,
        pool.projectName,
        pool.title,
        pool.cap,
        pool.token,
        pool.minReward,
        formatedEndDate,
        overrideOptions,
      );
      const rc = await tx.wait();
      const event = rc.events.find(
        (event: any) => event.event === 'PoolCreated',
      );
      const [
        poolId,
        creator,
        uri,
        projectName,
        title,
        active,
        poolCap,
        poolToken,
        minHypeReward,
        endDate,
      ] = event.args;
      const createdPool: IContractPool = {
        id: poolId,
        creator,
        uri,
        description: pool.description,
        projectName,
        title,
        active,
        cap: poolCap,
        token: poolToken,
        minReward: minHypeReward,
        endDate,
      };
      return createdPool;
    } catch (error) {
      this.logger.error(`Something went wrong: ${error}`);
      throw new InternalServerErrorException(
        'Something went wrong when creating a hype pool on-chain',
      );
    }
  }

  public async uploadToIpfs(description: string): Promise<string> {
    if (!description) {
      throw new NotFoundException('Description for Hype not found');
    }
    let url: string;
    try {
      const uploaded = await this.ipfsClient.add(
        JSON.stringify({ description: description }),
      );
      url = uploaded.path;
      console.log('uploaded: ', uploaded);
      console.log('url: ', url);
    } catch (error) {
      console.log('Error uploading to IPFS: ', error);
    } finally {
      return url;
    }
  }
}
