import React from 'react';

import styles from './styles.module.scss';

const DotPulse = () => {
  return (
    <div className={styles.dotPulse}>
      <div className={styles.dotPulse__dot}>.</div>
      <div className={styles.dotPulse__dot}>.</div>
      <div className={styles.dotPulse__dot}>.</div>
    </div>
  );
};

export default DotPulse;
