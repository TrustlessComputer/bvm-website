import React from 'react';
import { useSignalEffect } from '@preact/signals-react';
import Image from 'next/image';

import Droppable from '../Droppable';
import Draggable from '../Draggable';
import DateTimeInput from '../DateTimeInput';
import Lego from '../Lego';
import LegoParent from '../LegoParent';
import Input from '../Input';
import Dropdown from '../Dropdown';
import ExtendsInput from '../ExtendsInput';
import Button from '../Button';
import Label from '../Label';
import { FieldKeyPrefix } from '../../contants';
import { FieldOption } from '../../types';
import {
  adjustBrightness,
  cloneDeep,
  DragUtil,
  isTwoObjectEqual,
} from '../../utils';
import {
  subScribeDropEnd,
  useTemplateFormStore,
} from '../../stores/useDappStore';
import {
  draggedIds2DSignal,
  templateIds2DSignal,
} from '../../signals/useDragSignal';
import { formDappSignal } from '../../signals/useFormDappsSignal';
import { useThisDapp } from '../../hooks/useThisDapp';

import BottomButton from '@/modules/blockchains/dapp/components/BottomButton';
import { DappModel, FieldModel } from '@/types/customize-model';

import styles from './styles.module.scss';
import DraggedItems from './DraggedItems';
import FlowMapping from '@/modules/blockchains/dapp/components/RightDroppable_v2/components/FlowMapping';
import FetchedItems from './FetchedItems';

const RightDroppableV2 = () => {
  const {
    thisDapp,
    blockFieldMapping,
    baseModuleFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
  } = useThisDapp();
  // const chain = useChainInfor('6673a86fb7a831e3dd931465');

  const refContainer = React.useRef<HTMLDivElement>(null);
  const refWrap = React.useRef<HTMLDivElement>(null);

  const handleReset = () => {
    formDappSignal.value = [];
    draggedIds2DSignal.value = [];
  };

  const onActionClick = (params: { dapp: DappModel }) => {
    console.log(params.dapp?.action);
    alert('CLICK ME');
  };

  useSignalEffect(() => {
    const isHad = subScribeDropEnd.value;

    setTimeout(() => {
      if (!refWrap.current || !refContainer.current) return;
      if (
        isHad &&
        refWrap.current.scrollHeight > refContainer.current.scrollHeight
      ) {
        const ouputEl = refWrap.current?.querySelector<HTMLElement>('#output');
        if (ouputEl) ouputEl.style.alignItems = 'flex-start';
      }
    }, 150);
  });

  if (!thisDapp) return null;

  return (
    <div className={styles.wrapRight} ref={refContainer}>
      <div className={styles.wrapRight_inner} ref={refWrap}>
        <Droppable
          id="output"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              transform: 'translateX(35%)',
            }}
          >
            <DraggedItems />
            <FetchedItems />
          </div>
        </Droppable>
      </div>

      <Button
        element="button"
        type="button"
        onClick={() => handleReset()}
        className={styles.resetButton}
      >
        RESET <Image src="/icons/undo.svg" alt="undo" width={20} height={20} />
      </Button>
    </div>
  );

  // <div className={styles.wrapRight}>
  //   <div className={styles.wrapRight_inner}>
  //     <FlowMapping />
  //   </div>
  // </div>;
};

export default RightDroppableV2;
