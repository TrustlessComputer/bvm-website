'use client';

import React, { useState } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import PreviewMapModal from '@/modules/blockchains/blockchain-map/components/PreviewMapModal';

const BlockchainMapPage = () => {


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


      </div>
    </div>
  );
};

export default BlockchainMapPage;
