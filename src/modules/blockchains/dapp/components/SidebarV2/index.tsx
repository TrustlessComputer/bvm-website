import React from 'react';

import useDappsStore from '../../stores/useDappStore';
import useChainStore from '../../stores/useChainStore';

import styles from './styles.module.scss';

type Props = {};

const SidebarV2 = ({}: Props) => {
  const { modelCategories } = useChainStore();

  return (
    <React.Fragment>
      <div className={styles.header}>
        {modelCategories.map((category) => {
          return (
            <div className={styles.header__item} key={category.key}>
              <div className={styles.header__item__inner}>
                <div className={styles.header__item__inner__icon}></div>
                <div className={styles.header__item__inner__title}></div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default SidebarV2;
