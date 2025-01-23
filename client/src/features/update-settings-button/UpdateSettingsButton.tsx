import Button from '@ui/kit/button/Button';

import classes from './UpdateSettingsButton.module.scss';

type TProps = {
  refetch: () => void;
}

export default function UpdateSettingsButton(props: TProps) {
  const { refetch } = props;

  return <Button className={classes.button} onClick={refetch}>Обновить настройки</Button>
}