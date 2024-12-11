import Image from 'next/image';
import React from 'react';

import { iconToolNames } from '@/modules/agent-studio/Buy/Buy.data';
import styles from './styles.module.scss';

type Props = {
  icon?: string;
  title: string;
};

const Label = ({ icon, title }: Props) => {
  const _icon =
    iconToolNames.find(
      (item) =>
        icon?.replace('https://storage.googleapis.com/bvm-network', '') ===
        item,
    ) ||
    icon ||
    null;

  return (
    <div className={styles.label}>
      {_icon && <Image src={_icon} width={20} height={20} alt="_icon" />}
      <p className={styles.label__text}>{title}</p>
    </div>
  );
};

export default React.memo(Label);
