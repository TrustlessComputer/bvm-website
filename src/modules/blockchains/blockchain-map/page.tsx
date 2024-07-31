'use client';

import React, { useState } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import PreviewMapModal from '@/modules/blockchains/blockchain-map/components/PreviewMapModal';

const BlockchainMapPage = () => {
  const [isShowModalPreview, setIsShowModalPreview] = useState<boolean>(false);


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.content_text}>
          Drag and drop modules to start new blockchains, new dapps, and new
          economies.
        </p>
      </div>

      <div className={styles.container__header}>
        <div></div>
        <div></div>
      </div>

      <div className={styles.container__content}>
        <div
          className={styles.container__content__droppable}
          id="left-droppable"
        ></div>

        <div
          className={cn(
            styles.container__content__droppable,
            styles.container__content__droppable__right,
          )}
        ></div>

        <div className={styles.container__content__sidebar}>
          <div
            className={`${styles.button} `}
            onClick={() => setIsShowModalPreview(true)}
          >
            <p>Preview Map</p>
          </div>
        </div>
      </div>
      <PreviewMapModal
        show={isShowModalPreview}
        onClose={() => setIsShowModalPreview(false)}
      />
    </div>
  );
};

export default BlockchainMapPage;
