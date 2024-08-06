import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import s from './styles.module.scss';
import Image from 'next/image';
import {  useReactFlow, useStoreApi } from '@xyflow/react';
import { useSignalEffect } from '@preact/signals-react';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  templateIds2DSignal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import { cloneDeep, isTwoObjectEqual } from '@/modules/blockchains/Buy/utils';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';

const OVERLAP_OFFSET = -200;
const NODE_WIDTH = 16;
const NODE_HEIGHT = 15;

export default function AddBoxButton({ ...props }): React.JSX.Element {
  const store = useStoreApi();
  const {
    height,
    width,
    transform: [transformX, transformY, zoomLevel]
  } = store.getState();
  const [draggedIds2D, setDraggedIds2D] = React.useState<
    typeof draggedIds2DSignal.value
  >([]);
  const {
    dapps,
    getInputWithLego,
    blockFieldMapping,
    baseModuleFieldMapping,
    getInputWithoutLego,
    moduleFieldMapping,
    singleFieldMapping,
  } = useDapps();
  useSignalEffect(() => {
    if (draggedIds2DSignal.value.length === draggedIds2D.length) {
      // for (let i = 0; i < draggedIds2DSignal.value.length; i++) {
      //   if (!isTwoObjectEqual(draggedIds2DSignal.value[i], draggedIds2D[i])) {
      //     setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
      //     break;
      //   }
      //
      //   for (let j = 0; j < draggedIds2DSignal.value[i].length; j++) {
      //     if (
      //       !isTwoObjectEqual(
      //         draggedIds2DSignal.value[i][j],
      //         draggedIds2D[i][j],
      //       )
      //     ) {
      //       setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
      //       break;
      //     }
      //   }
      // }
    } else {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
    }
  });

  useEffect(() => {
    if (draggedIds2D.length > 0) {
      handleAddBox();
    }
  }, [draggedIds2D]);

  function handleAddBox() {
    const dappIndex = draggedDappIndexesSignal.value[draggedIds2D.length-1];
    const thisDapp = dapps[dappIndex];
    const zoomMultiplier = 1 / zoomLevel;
    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;
    const nodeWidthOffset = NODE_WIDTH / 2;
    const nodeHeightOffset = NODE_HEIGHT / 2;
    props.setNodes((prev) => [...prev, {
      id: `${Math.random()}`,
      type: 'customBox',
      dragHandle: '.drag-handle-area',
      data: {
        label: thisDapp.title,
        status: 'Missing',
        isChain: false,
        dapp: thisDapp,
        ids: draggedIds2D[draggedIds2D.length-1],
        baseIndex: draggedIds2D.length-1,
      },
      position: { x: centerX - nodeWidthOffset, y: centerY - nodeHeightOffset },
    }]);

    // addNodes({
    //   id: `${Math.random()}`,
    //   type: 'customBox',
    //   dragHandle: '.drag-handle-area',
    //   data: {
    //     label: 'Blockchain',
    //     status: 'Missing',
    //     isChain: true,
    //   },
    //   position: { x: centerX - nodeWidthOffset + props.currentOverlapOffset, y: centerY - nodeHeightOffset + props.currentOverlapOffset },
    // })
  }

  return (
    <Button
      // isLoading={isLoading}
      className={s.button}
      type={'submit'}
      onClick={() => handleAddBox()}
    >
      Add box
    </Button>
  );
}
