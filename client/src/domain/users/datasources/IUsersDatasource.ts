import { UserModel } from '@domain/users/models/UserModel';

export interface IUsersDatasource {
  getUsers(): Promise<UserModel[]>;
}
