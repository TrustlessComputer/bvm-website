import React from 'react';
import cn from 'classnames';

import Draggable from '../Draggable';
import Lego from '../Lego';
import Label from '../Label';
import { FieldKeyPrefix } from '../../contants';
import useDappsStore from '../../stores/useDappStore';

import styles from './styles.module.scss';

type Props = {
  fieldKey: DappModel['key'];
};

const BoxOption = ({ fieldKey }: Props) => {
  const { dapps } = useDappsStore();

  const thisDapp = React.useMemo(() => {
    return dapps.find((item) => item.key === fieldKey);
  }, [dapps, fieldKey]);

  const mainColor = React.useMemo(
    () => thisDapp?.color || '#F76649',
    [thisDapp],
  );

  if (!thisDapp) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>Base</div>

      <div className={styles.container__body}>
        <div className={styles.container__body__item}>
          <Draggable id={FieldKeyPrefix.BASE}>
            <Lego
              background={mainColor}
              first={false}
              last={false}
              titleInLeft={false}
              titleInRight={false}
            >
              <Label title={thisDapp.baseBlock.title} />
            </Lego>
          </Draggable>
        </div>

        <div className={styles.container__body__item}>
          <h4>Block fields</h4>

          {thisDapp.blockFields.map((item) => (
            <Draggable id={'block-' + item.key} key={'block-' + item.key}>
              <Lego
                background={mainColor}
                first={false}
                last={false}
                titleInLeft={false}
                titleInRight={false}
              >
                <Label title={item.title} />
              </Lego>
            </Draggable>
          ))}
        </div>

        <div className={styles.container__body__item}>
          <h4>Single fields</h4>

          <div className={styles.container__body__item__inner}>
            {thisDapp.singleFields.map((item) => (
              <Draggable id={'single-' + item.key} key={'single-' + item.key}>
                <Lego
                  background={mainColor}
                  first={false}
                  last={false}
                  titleInLeft={false}
                  titleInRight={false}
                >
                  <Label title={item.title} />
                </Lego>
              </Draggable>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BoxOption);
