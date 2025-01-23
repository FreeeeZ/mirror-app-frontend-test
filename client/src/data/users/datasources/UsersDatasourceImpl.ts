import { IHttpClient } from '@data/network/http/IHttpClient';
import { validateUsersList}  from '@data/users/validation/UsersValidationModel';
import { IUsersDatasource } from '@domain/users/datasources/IUsersDatasource';
import { UserModel } from '@domain/users/models/UserModel';

export class UsersDatasourceImpl implements IUsersDatasource {
  constructor(private httpClient: IHttpClient) {}

  async getUsers(): Promise<UserModel[]> {
    const response = await this.httpClient.get<UserModel[]>('users');

    return validateUsersList(response)
  }
}
