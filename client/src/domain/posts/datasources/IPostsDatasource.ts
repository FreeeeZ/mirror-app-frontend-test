import { PostModel } from '@domain/posts/models/PostModel';

export interface IPostsDatasource {
  getPosts(): Promise<PostModel[]>;
}
