import React from 'react';

import AddressInput from '@/modules/blockchains/detail_v3/account-abstraction_v2/components/AddressInput';
import FeeRateInput from '@/modules/blockchains/detail_v3/account-abstraction_v2/components/FeeRateInput';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { DappNode as DappNodeProps } from '@/types/node';
import { useSignalEffect } from '@preact/signals-react';
import { NodeProps } from '@xyflow/react';
import { FieldKeyPrefix } from '../../contants';
import { draggedDappIndexesSignal } from '../../signals/useDragSignal';
import { adjustBrightness } from '../../utils';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import Lego from '../Lego';
import LegoParent from '../LegoParent';
// import Node from '../Node/Node';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import Image from 'next/image';
import Button from '../Button';
import Node from '../Node_v2/Node';

import styles from './styles.module.scss';
import { useAccountAbstractionStore } from '@/modules/blockchains/detail_v3/account-abstraction_v2/store/hook';

const AANode = ({ data }: NodeProps<DappNodeProps>) => {
  const { dapp } = data;

  const { isAAModuleLoading, aaStatusData } = useAAModule();
  const { getAAStatus, isUpdateFlow } = useChainProvider();
  const { resetAAStore } = useAccountAbstractionStore();

  const [draggedDappIndexes, setDraggedDappIndexes] = React.useState<number[]>(
    [],
  );

  const dappIndex = React.useMemo(
    () => draggedDappIndexes[data.baseIndex],
    [data.baseIndex, draggedDappIndexes],
  );

  useSignalEffect(() => {
    setDraggedDappIndexes(draggedDappIndexesSignal.value);
  });

  if (typeof dappIndex === 'undefined') {
    return null;
  }

  // console.log('AAModule data: -- ', aaStatusData);

  return (
    <Node
      {...data}
      notification={
        !isUpdateFlow
          ? {
              label: 'IMPORTANT',
              message:
                'This module needs to be configured and completed later after the chain is deployed and the payment is confirmed',
            }
          : undefined
      }
      overlay={
        isAAModuleLoading
          ? {
              type: 'loading',
              message: 'Please wait a minute',
            }
          : undefined
      }
      key={JSON.stringify(data)}
      borderColor={aaStatusData?.borderColorStr}
      heading={{
        title: data.title,
        status: {
          message: aaStatusData?.statusStr,
          color: aaStatusData?.borderColorStr,
        },
        borderColor: aaStatusData?.borderColorStr,
        backgroundColor: aaStatusData?.bgColorStr,
      }}
      // notification={{
      // }}
      content={{
        children: (
          <>
            <Draggable
              id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
              value={{
                dappIndex,
                title: dapp.baseBlock.title,
                icon: dapp.baseBlock.icon,
                fieldKey: dapp.baseBlock.key,
                background: dapp.color_border || dapp.color,
              }}
            >
              <Droppable
                id={`right-${FieldKeyPrefix.BASE}-${data.baseIndex}`}
                style={{
                  width: 'max-content',
                  height: 'max-content',
                }}
              >
                <LegoParent {...dapp} background={dapp.color} dapp={dapp}>
                  <Lego
                    first={false}
                    last={false}
                    titleInLeft
                    titleInRight={false}
                    zIndex={1}
                    background={adjustBrightness(dapp.color, -10)}
                    {...dapp.baseBlock.fields[0]}
                  >
                    <AddressInput option={dapp.baseBlock.fields[0]} />
                  </Lego>
                  <Lego
                    first={false}
                    last={false}
                    titleInLeft
                    titleInRight={false}
                    background={adjustBrightness(dapp.color, -10)}
                    {...dapp.baseBlock.fields[1]}
                  >
                    <FeeRateInput option={dapp.baseBlock.fields[1]} />
                  </Lego>
                </LegoParent>
              </Droppable>
            </Draggable>

            <div className={styles.resetButtonWrapper}>
              <Button
                className={styles.resetButton}
                onClick={() => {
                  resetAAStore();
                }}
              >
                RESET{' '}
                <Image
                  src="/icons/undo.svg"
                  alt="undo"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          </>
        ),
      }}
    />
  );
};

export default AANode;
