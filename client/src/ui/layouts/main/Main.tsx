import { PropsWithChildren } from 'react';

import { SettingsDatasourceImpl } from '@data/settings/datasources/SettingsDatasourceImpl';
import { FetchHttpClientImpl } from '@data/network/http/FetchHttpClientImpl';
import { ISettingsDatasource } from '@domain/settings/datasources/ISettingsDatasource';

import SettingsInfo from '@features/settings-info/SettingsInfo';
import UpdateSettingsButton from '@features/update-settings-button/UpdateSettingsButton';

import { createDatasource } from '@utils/datasource';

import { MainContext } from '@ui/layouts/main/Context';
import Loader from '@ui/kit/loader/Loader';

import classes from './Main.module.scss';

const apiClient = new FetchHttpClientImpl();

const settingsDatasource = new SettingsDatasourceImpl(apiClient);
const settingsData = createDatasource<ISettingsDatasource>(settingsDatasource);

export default function MainLayout({ children }: PropsWithChildren) {
  const { data: settings, refetch, isLoading, isError } = settingsData.getSettings().useQuery(['settings']);

  const handleRefetch = () => {
    return refetch();
  }

  return (
    <div className={classes.wrapper}>
      <aside className={classes.sidebar}>
        {isLoading ? (
          <Loader />
        ) : (
          settings &&
          !isError && (
            <>
              <UpdateSettingsButton refetch={handleRefetch} />
              <SettingsInfo settings={settings} />
            </>
          )
        )}
      </aside>
      <main className={classes.main}>
        {settings && !isError ? (
          <MainContext.Provider value={settings}>
            {children}
          </MainContext.Provider>
        ) : (
          !isLoading &&
          isError && (
            <span className={classes.error}>
              Настройки отсутствуют или произошла ошибка, повторите попытку
            </span>
          )
        )}
      </main>
    </div>
  );
}