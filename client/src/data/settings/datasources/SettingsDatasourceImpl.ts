import { IHttpClient } from '@data/network/http/IHttpClient';
import { validateSettings } from '@data/settings/validation/SettingsValidationModel';
import { SettingsModel } from '@domain/settings/models/SettingsModel';
import { ISettingsDatasource } from '@domain/settings/datasources/ISettingsDatasource';

export class SettingsDatasourceImpl implements ISettingsDatasource {
  constructor(private httpClient: IHttpClient) {}

  async getSettings(): Promise<SettingsModel> {
    const response = await this.httpClient.get<SettingsModel>('settings')

    return validateSettings(response)
  }
}
