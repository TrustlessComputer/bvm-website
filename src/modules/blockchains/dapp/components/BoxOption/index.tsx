import React from 'react';
import { useSignalEffect } from '@preact/signals-react';

import Draggable from '../Draggable';
import Lego from '../Lego';
import { FieldKeyPrefix } from '../../contants';
import useDappsStore from '../../stores/useDappStore';
import { draggedIds2DSignal } from '../../signals/useDragSignal';

import styles from './styles.module.scss';
import InfoTooltip from '@components/Form/InfoTooltip';

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
      <div className={styles.container__body}>
        {
          thisDapp?.sections?.map((section) => {
            return (
              <>
                {section?.title &&
                  <div className={styles.container__header}>
                  {section?.title} {section?.required && <sup>*</sup>}
                    {section.tooltip && (
                      <InfoTooltip
                        iconSize="sm"
                        placement="top-start"
                        label={section.tooltip}
                      />
                    )}
                  </div>
                }
                {
                  section.key === thisDapp.baseBlock.section && (
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
                  )
                }
                <div className={styles.container__body__item}>
                  {thisDapp?.blockFields?.filter(f => f.section === section.key)?.map((item) => (
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
                <div className={styles.container__body__item}>
                  {
                    <div className={styles.container__body__item__inner}>
                      {thisDapp?.singleFields?.filter(f => f.section === section.key)?.map((item) => (
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
                  }
                </div>
              </>
            )
          })
        }
      </div>
    </div>
  );
};

export default React.memo(BoxOption);
