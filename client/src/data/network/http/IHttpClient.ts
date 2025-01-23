export type THeaders = Record<string, string>;

export interface IHttpClient {
  get<TResult>(resource: string, headers?: THeaders): Promise<TResult>;
}
