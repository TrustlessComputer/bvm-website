import React from 'react';
import cn from 'classnames';
import { useSignalEffect } from '@preact/signals-react';

import Draggable from '../Draggable';
import Lego from '../Lego';
import Label from '../Label';
import { FieldKeyPrefix } from '../../contants';
import useDappsStore from '../../stores/useDappStore';
import {
  draggedIds2DSignal,
  draggedIdsSignal,
} from '../../signals/useDragSignal';

import styles from './styles.module.scss';

type Props = {
  fieldKey: DappModel['key'];
};

const BoxOption = ({ fieldKey }: Props) => {
  const { dapps } = useDappsStore();
  const [disableBaseBlock, setDisableBaseBlock] = React.useState(false);

  const thisDapp = React.useMemo(() => {
    return dapps.find((item) => item.key === fieldKey);
  }, [dapps, fieldKey]);

  const mainColor = React.useMemo(
    () => thisDapp?.color || '#F76649',
    [thisDapp],
  );

  useSignalEffect(() => {
    if (!thisDapp) return;

    const draggedIds2D = draggedIds2DSignal.value;
    const canPlaceMoreBase =
      Number(thisDapp.baseBlock.placableAmount) > draggedIds2D.length ||
      thisDapp.baseBlock.placableAmount === -1;

    setDisableBaseBlock(!canPlaceMoreBase);
  });

  if (!thisDapp) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>Base</div>

      <div className={styles.container__body}>
        <div className={styles.container__body__item}>
          <Draggable
            id={`left-${FieldKeyPrefix.BASE}`}
            disabled={disableBaseBlock}
          >
            <Lego
              {...thisDapp.baseBlock}
              background={mainColor}
              first={false}
              last={false}
              titleInLeft={true}
              titleInRight={false}
              disabled={disableBaseBlock}
            />
          </Draggable>
        </div>

        {thisDapp.blockFields && (
          <div className={styles.container__body__item}>
            <h4>Block fields</h4>

            {thisDapp?.blockFields?.map((item) => (
              <Draggable
                id={`left-${FieldKeyPrefix.BLOCK}-${item.key}`}
                key={`left-${FieldKeyPrefix.BLOCK}-${item.key}`}
              >
                <Lego
                  {...item}
                  background={mainColor}
                  first={false}
                  last={false}
                  titleInLeft={true}
                  titleInRight={false}
                />
              </Draggable>
            ))}
          </div>
        )}

        {thisDapp.singleFields && (
          <div className={styles.container__body__item}>
            <h4>Single fields</h4>

            <div className={styles.container__body__item__inner}>
              {thisDapp.singleFields.map((item) => (
                <Draggable
                  id={`left-${FieldKeyPrefix.SINGLE}-${item.key}`}
                  key={`left-${FieldKeyPrefix.SINGLE}-${item.key}`}
                >
                  <Lego
                    {...item}
                    background={mainColor}
                    first={false}
                    last={false}
                    titleInLeft={true}
                    titleInRight={false}
                  />
                </Draggable>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(BoxOption);
