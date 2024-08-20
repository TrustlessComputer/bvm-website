import Droppable from '@/modules/blockchains/dapp/components/Droppable';
import React, { useState } from 'react';
import s from './styles.module.scss';
import { useSignalEffect } from '@preact/signals-react';
import { blockDraggingSignal } from '@/modules/blockchains/Buy/signals/useDragSignal';


const DroppableMask = () => {
  const [isShow, setIsShow] = useState(false);
  useSignalEffect(() => {
    blockDraggingSignal.subscribe((value) => {
      setIsShow(value.id !== '');
    });
  });
  return (
    <Droppable id="output" className={`${s.wrapperMask} ${isShow && s.show}`} />
  );
};

export default React.memo(DroppableMask);
