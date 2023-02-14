import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CID, create, IPFSHTTPClient, Options } from 'ipfs-http-client';
import { ipfs } from '../../../config';
import { ProjectDetailsDTO } from './dto';

export interface IpfsResult {
  Name: string;
  Hash: string;
}

export interface IpfsAddResult {
  cid: CID;
  size: number;
  path: string;
  mode?: number;
}

@Injectable()
export class IpfsService {
  private logger = new Logger('IpfsService');
  private ipfsClient: IPFSHTTPClient;
  private ipfsUrl: string;
  private ipfsHost: string;
  private ipfsPort: number;
  private ipfsProtocol: string;
  private ipfsAuthorization: string;
  private ipfsUseAuth: boolean;
  private ipfsBaseUrl: string;

  constructor(
    @Inject(ipfs.KEY)
    private readonly ipfsConfig: ConfigType<typeof ipfs>,
  ) {
    this.ipfsHost = ipfsConfig.ipfsHost;
    this.ipfsPort = Number(ipfsConfig.ipfsPort);
    this.ipfsProtocol = ipfsConfig.ipfsProtocol;
    this.ipfsUrl = ipfsConfig.ipfsUrl;
    this.ipfsBaseUrl = ipfsConfig.ipfsBaseUrl;
    if (
      ipfsConfig.ipfsProjectId &&
      ipfsConfig.ipfsSecret &&
      ipfsConfig.ipfsUseAuth === 'true'
    ) {
      this.ipfsAuthorization =
        'Basic ' +
        Buffer.from(
          ipfsConfig.ipfsProjectId + ':' + ipfsConfig.ipfsSecret,
        ).toString('base64');
      this.ipfsUseAuth = ipfsConfig.ipfsUseAuth === 'true';
    }
  }

  public getFullIpfsUrl(resourcePath: string): string {
    return `${this.ipfsBaseUrl}${resourcePath}`;
  }

  private setIpfsClient(): void {
    let ipfsOptions: Options;
    if (this.ipfsUrl) {
      ipfsOptions = {
        url: this.ipfsUrl,
      };
    } else {
      ipfsOptions = {
        host: this.ipfsHost || `ipfs.infura.io`,
        port: this.ipfsPort || 5001,
        protocol: this.ipfsProtocol || `https`,
      };
    }

    if (this.ipfsAuthorization && this.ipfsUseAuth) {
      ipfsOptions.headers = {
        authorization: this.ipfsAuthorization,
      };
    }

    this.ipfsClient = create(ipfsOptions);
  }

  public getIpfsClient(): IPFSHTTPClient {
    return this.ipfsClient;
  }

  public async uploadToIpfs(
    details: ProjectDetailsDTO,
  ): Promise<IpfsResult | IpfsAddResult> {
    if (!details) {
      throw new NotFoundException('Project details for Hype not found');
    }
    this.setIpfsClient();
    const ipfsClient = this.getIpfsClient();
    const { description, projectDescription } = details;
    try {
      const uploaded = await ipfsClient.add(
        JSON.stringify({ description, projectDescription }),
      );
      console.log('uploaded: ', uploaded);
      return uploaded;
    } catch (error) {
      console.log('Error uploading to IPFS: ', error);
      throw new InternalServerErrorException(
        `Error uploading to IPFS: ${error}`,
      );
    }
  }
}
