import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetByDTO, UserDTO } from './dto';
import { HypeUser } from './user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(HypeUser)
    private repository: Repository<HypeUser>,
  ) {}

  async getUserBy({ publicAddress }: GetByDTO): Promise<HypeUser> {
    return await this.repository.findOne({
      where: {
        address: publicAddress,
      },
    });
  }

  async updateAccount(userDTO: UserDTO): Promise<HypeUser> {
    const publicAddress = userDTO.address;
    const user = await this.getUserBy({ publicAddress });
    if (!user) {
      const newUser = new HypeUser();
      newUser.address = userDTO.address;
      newUser.username = userDTO.username;
      newUser.auth_date = userDTO.auth_date;
      return await newUser.save();
    }
    await this.repository.update(user.id, {
      username: userDTO.username,
      auth_date: userDTO.auth_date,
    });
    return await this.getUserBy({ publicAddress });
  }
}