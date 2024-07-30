import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './styles.module.scss';

type ButtonColor = 'gray' | 'transparent';
type ButtonVariant = 'solid' | 'outline' | 'plain';
type ButtonShape = 'circle' | 'full' | 'square';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  element: 'button';
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  element?: 'a';
  href: string;
  children: React.ReactNode;
};

type DefaultButtonProps = {
  color?: ButtonColor;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  icon?: boolean;
  disabled?: boolean;
};

type Props =
  | (DefaultButtonProps & ButtonProps)
  | (DefaultButtonProps & LinkProps);

const Button = ({
  color = 'gray',
  variant = 'solid',
  shape,
  icon = false,
  disabled = false,
  children,
  className = '',
  ...props
}: Props) => {
  const classes = cn(
    styles.button,
    styles[`button__color__${color}`],
    styles[`button__variant__${variant}`],
    {
      [styles['button__icon']]: icon,
      [styles[`button__shape__${shape}`]]: shape,
      [styles['button__disabled']]: disabled,
    },
    className,
  );

  if (props.element === 'button') {
    return (
      <button {...props} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <Link {...props} className={classes} href={props.href}>
      {children}
    </Link>
  );
};

export default Button;
