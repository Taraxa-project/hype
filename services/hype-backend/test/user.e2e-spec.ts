import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { bootstrapTestInstance } from './api';
import { GetByDTO, UserDTO } from '../src/modules/user/dto';
import { UsersService } from '../src/modules/user/user.service';

describe('User tests', () => {
  let app: INestApplication;
  let userService: UsersService;
  let configService: ConfigService;

  beforeAll(async () => {
    ({ app, userService, configService } = await bootstrapTestInstance());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add a new user, updated it and then fetch it by address', async () => {
    const newUser: UserDTO = {
      address: '0xA2222D333C33333339999999911111111111eee1',
      username: 'coolUser',
      auth_date: 123123,
    };
    const { body: createdUser } = await postUser(HttpStatus.CREATED, newUser);
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.address).toBe(newUser.address);

    const existingUser: UserDTO = {
      address: '0xA2222D333C33333339999999911111111111eee1',
      username: 'coolUser 2',
      auth_date: 123124,
    };
    const { body: updatedUser } = await postUser(
      HttpStatus.CREATED,
      existingUser,
    );
    expect(updatedUser.username).toBe(existingUser.username);
    expect(updatedUser.address).toBe(existingUser.address);

    const publicAddress = '0xA2222D333C33333339999999911111111111eee1';
    const filter: GetByDTO = {
      publicAddress,
    };
    const { body: user } = await requestUserBy(HttpStatus.OK, filter);
    expect(user.address).toBe(publicAddress);
  });

  const requestUserBy = async (
    status: HttpStatus,
    filterDTO: GetByDTO,
  ): Promise<any> =>
    await request(app.getHttpServer())
      .get(`/users`)
      .query(filterDTO)
      .expect(status);

  const postUser = async (status: HttpStatus, body: UserDTO): Promise<any> =>
    await request(app.getHttpServer())
      .post(`/users`)
      .send({
        ...body,
      })
      .expect(status);
});
