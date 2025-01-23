import { createContext } from 'react';
import { SettingsModel } from '@domain/settings/models/SettingsModel';

export const MainContext = createContext<SettingsModel>({} as SettingsModel);