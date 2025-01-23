import { HttpError } from '@data/network/http/errors/HttpError';
import { IHttpClient, THeaders } from '@data/network/http/IHttpClient';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class FetchHttpClientImpl implements IHttpClient {
  private readonly _baseUrl: string | undefined;
  private readonly _baseHeaders: Record<string, string>;

  constructor(baseURL?: string, baseHeaders?: Record<string, string>) {
    this._baseUrl = baseURL ?? BASE_URL;
    this._baseHeaders = {
      'content-Type': 'application/json',
      ...baseHeaders,
    };
  }

  async get<TResult>(resource: string, headers?: THeaders): Promise<TResult> {
    const request = {
      method: 'GET',
      headers: { ...this._baseHeaders, ...headers },
    } as RequestInit;

    return await this.fetch<TResult>(resource, request);
  }

  private async fetch<T>(resource: string, options: RequestInit): Promise<T> {
    let response;

    try {
      response = await fetch(`${this._baseUrl}/${resource}`, options);
    } catch (error) {
      throw new HttpError('Network Error', String(error));
    }

    if (response.ok) {
      return await response.json();
    }

    const json = await response.json();

    throw new HttpError(response.statusText, json, response.status);
  }
}
