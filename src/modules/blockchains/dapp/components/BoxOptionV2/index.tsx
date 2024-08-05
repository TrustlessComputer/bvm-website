import React from 'react';

import Draggable from '../Draggable';
import Lego from '../Lego';
import { useThisDapp } from '../../hooks/useThisDapp';
import useChainStore from '../../stores/useChainStore';

import styles from './styles.module.scss';

type Props = {};

const BoxOptionV2 = ({}: Props) => {
  const { modelCategories } = useChainStore();

  console.log(
    '🚀 -> file: index.tsx:21 -> BoxOptionV2 -> modelCategories ::',
    modelCategories,
  );

  return (
    <div className={styles.container__body}>
      {modelCategories.map((category) => {
        return (
          <div className={styles.container} key={category.key}>
            <div className={styles.container__header}>{category.title}</div>

            <div className={styles.container__body__item}>
              <div className={styles.container__body__item__inner}>
                {category.options.map((option) => {
                  return (
                    <Draggable
                      key={option.key}
                      id={option.key}
                      value={{
                        title: option.title,
                        icon: option.icon,
                        background: category.color,
                      }}
                    >
                      <Lego
                        title={option.title}
                        icon={option.icon}
                        key={option.key}
                        background={category.color}
                        first={false}
                        last={false}
                        titleInLeft={true}
                        titleInRight={false}
                      />
                    </Draggable>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(BoxOptionV2);
