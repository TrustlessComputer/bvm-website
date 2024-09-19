import React from 'react';

import AddressInput from '@/modules/blockchains/detail_v3/account-abstraction_v2/components/AddressInput';
// import SelectTokenView from '@/modules/blockchains/detail_v3/account-abstraction_v2/components/SelectTokenView';
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

import { useAccountAbstractionStore } from '@/modules/blockchains/detail_v3/account-abstraction_v2/store/hook';
import { useDAServicesHelper } from '@/modules/blockchains/detail_v4/hook/useDAServicesHelper';
import { Button as ButtonChakra, Flex } from '@chakra-ui/react';
import useNodeAction from '../../hooks/useNodeAction';
import AACustomNotification from './AACustomNotification';
import styles from './styles.module.scss';

const AANode = ({ data, id }: NodeProps<DappNodeProps>) => {
  const { dapp } = data;

  const {
    isAAModuleLoading,
    aaStatusData,
    isCanNotEdit,
    isDone,
    aaInstalledData,
    getAATypeIconUrl,
  } = useAAModule();

  const paymasterAddress = aaInstalledData?.aaPaymasterContract || '';

  const { handleOnClickCreateToken } = useNodeAction();
  const { getAAStatus, isUpdateFlow, isCreateChainFlow } = useChainProvider();
  const { resetAAStore, tokenContractAddress } = useAccountAbstractionStore();
  const { isEmptyIssueTokenList } = useDAServicesHelper();

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

  const renderNotification = () => {
    if (isCreateChainFlow) {
      return {
        label: 'IMPORTANT',
        message:
          'This module needs to be configured and completed later after the chain is deployed and the payment is confirmed',
      };
    } else if (isEmptyIssueTokenList) {
      return {
        label: 'IMPORTANT',
        message:
          'Data is not available at the moment. Please create Token first',
      };
    } else {
      return undefined;
    }
  };

  const renderDefaultContentBox = () => {
    return (
      <>
        <Draggable
          disabled={isUpdateFlow}
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

              {/* {isDone && (
                <Lego
                  first={false}
                  last={false}
                  titleInLeft
                  titleInRight={false}
                  background={adjustBrightness(dapp.color, -10)}
                  {...dapp.baseBlock.fields[2]}
                >
                  <AddressPaymasterInput />
                </Lego>
              )} */}
            </LegoParent>
          </Droppable>
        </Draggable>

        {isUpdateFlow && !isCanNotEdit && (
          <div className={styles.resetButtonWrapper}>
            <Button
              className={styles.resetButton}
              onClick={() => {
                resetAAStore();
              }}
            >
              RESET{' '}
              <Image src="/icons/undo.svg" alt="undo" width={20} height={20} />
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderContentBox = () => {
    if (isCreateChainFlow) {
      return renderDefaultContentBox();
      // return undefined;
    } else if (isEmptyIssueTokenList) {
      return (
        <Flex justify={'center'} align={'center'}>
          <ButtonChakra
            color={'#4185EC'}
            fontSize={'14px'}
            alignSelf={'center'}
            px="12px"
            py={'4px'}
            bgColor={'#EEF5FF'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.7,
            }}
            onClick={() => {
              handleOnClickCreateToken();
            }}
          >
            Create Token
          </ButtonChakra>
        </Flex>
      );
    } else {
      return renderDefaultContentBox();
    }
  };

  if (typeof dappIndex === 'undefined') {
    return null;
  }

  return (
    <Node
      {...data}
      notification={renderNotification()}
      customNotification={isDone && <AACustomNotification />}
      overlay={
        isAAModuleLoading
          ? {
              type: 'loading',
              iconUrl: '/coffee.gif',
              message: 'Please wait a minute',
            }
          : undefined
      }
      key={JSON.stringify(data)}
      borderColor={aaStatusData?.borderColorStr}
      id={id}
      heading={{
        title: data.title,
        status: {
          message: aaStatusData?.statusStr,
          color: aaStatusData?.statusColorStr,
          icon: getAATypeIconUrl(),
        },
        borderColor: aaStatusData?.borderColorStr,
        backgroundColor: aaStatusData?.bgColorStr,
      }}
      content={{
        children: renderContentBox(),
      }}
    />
  );
};

export default AANode;
