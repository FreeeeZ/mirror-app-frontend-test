import { IHttpClient } from '@data/network/http/IHttpClient'
import { validatePostsList } from '@data/posts/validation/PostsValidationModel';
import { PostModel } from '@domain/posts/models/PostModel';
import { IPostsDatasource } from '@domain/posts/datasources/IPostsDatasource';

export class PostsDatasourceImpl implements IPostsDatasource {
  constructor(private httpClient: IHttpClient) {}

  async getPosts(): Promise<PostModel[]> {
    const response = await this.httpClient.get<PostModel[]>('posts')

    return validatePostsList(response)
  }
}
