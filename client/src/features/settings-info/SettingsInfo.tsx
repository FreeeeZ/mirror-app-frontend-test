import { SettingsModel } from '@domain/settings/models/SettingsModel';

import classes from './SettingsInfo.module.scss';

type TProps = {
  settings: SettingsModel
}

export default function SettingsInfo(props: TProps) {
  const { settings } = props;

  const currentLayout = settings.layout.current;
  const currentLayoutSettings = Object.entries(settings.layout.params[currentLayout]);
  const listOfLayouts = Object.keys(settings.layout.params);
  const cardTemplate = settings.template;
  const navigationType = settings.navigation;

  return (
    <div className={classes.settings_info}>
      <span>Текущий шаблон: <br/>{currentLayout}</span>
      <span>Настройки текущего шаблона: <br/>{currentLayoutSettings.map(item => `${item[0]}: ${item[1]}`).join(', ')}</span>
      <span>Список шаблонов: <br/>{listOfLayouts.map(item => item).join(', ')}</span>
      <span>Текущий шаблон карточки: <br/>{cardTemplate}</span>
      <span>Текущий тип навигации: <br/>{navigationType}</span>
    </div>
  )
}