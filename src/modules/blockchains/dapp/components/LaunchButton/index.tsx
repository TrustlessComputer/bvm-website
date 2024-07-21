import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';

type Props = {};

const LaunchButton = () => {
  return (
    <button className={styles.button}>
      Launch <Image src="/launch.png" alt="launch" width={24} height={24} />
    </button>
  );
};

export default LaunchButton;
