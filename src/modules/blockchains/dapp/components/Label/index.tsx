import React from 'react';
import Image from 'next/image';

import SvgInset from '@/components/SvgInset';

import styles from './styles.module.scss';

type Props = {
  icon?: string;
  title: string;
};

const Label = ({ icon, title }: Props) => {
  return (
    <div className={styles.label}>
      {icon && <Image src={icon} width={20} height={20} alt="icon" />}

      <p className={styles.label__text}>{title}</p>
    </div>
  );
};

export default React.memo(Label);
