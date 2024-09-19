import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const DotPulse = ({ className }: Props) => {
  return (
    <div className={cn(styles.dotPulse, className)}>
      <div className={styles.dotPulse__dot} />
      <div className={styles.dotPulse__dot} />
      <div className={styles.dotPulse__dot} />
      <div className={styles.dotPulse__dot} />
    </div>
  );
};

export default DotPulse;
