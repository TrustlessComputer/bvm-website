import React from 'react';

import { iconToolNames } from '../../Buy.data';

import styles from './styles.module.scss';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import SvgInset from '@/components/SvgInset';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';

type Props = {
  icon?: string;
  title: string;
};

const Label = ({ icon, title }: Props) => {
  const { isCapture } = useCaptureStore();

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
      {_icon && <SvgInset svgUrl={_icon} size={20} />}

      <p className={`${styles.label__text}`}>{title}</p>
    </div>
  );
};

export default React.memo(Label);
