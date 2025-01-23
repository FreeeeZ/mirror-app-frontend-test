import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './Button.module.scss';

type TProps = {
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: PropsWithChildren<TProps>) {
  const { className, children } = props;

  return <button {...props} className={clsx(classes.button, classes.primary_button, className)}>{children}</button>
}