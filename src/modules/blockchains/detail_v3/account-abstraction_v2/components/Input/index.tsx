import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ disabled = false, className = '', ...props }: Props) => {
  return (
    <input
      className={cn(
        styles.input,
        {
          [styles.input__disabled]: disabled,
        },
        className,
      )}
      {...props}
    />
  );
};

export default React.memo(Input);
