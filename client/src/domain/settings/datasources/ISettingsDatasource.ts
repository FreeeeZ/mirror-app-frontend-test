import { SettingsModel } from '@domain/settings/models/SettingsModel';

export interface ISettingsDatasource {
  getSettings(): Promise<SettingsModel>;
}
