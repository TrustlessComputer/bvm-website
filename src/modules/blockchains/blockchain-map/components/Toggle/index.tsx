import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
type Props = {
  background?: string;
  handleToggle?: () => void;
  toggle?: boolean;
};

const Toggle = ({ background = '#A041FF', handleToggle, toggle }: Props) => {
  const [_toggle, _setToggle] = React.useState(false);

  return (
    <div
      className={cn(styles.toggle, {
        [styles.toggle__active]: toggle ?? _toggle,
      })}
      onClick={() => (handleToggle ? handleToggle() : _setToggle(!_toggle))}
      style={{
        // @ts-ignore
        '--background': background,
      }}
    >
      <div
        className={cn(styles.toggle__circle, {
          [styles.toggle__circle__active]: toggle ?? _toggle,
        })}
      />
    </div>
  );
};

export default Toggle;
