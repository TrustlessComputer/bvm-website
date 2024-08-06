import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import s from './styles.module.scss';
import Image from 'next/image';
import { useReactFlow, useStoreApi } from '@xyflow/react';
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
    transform: [transformX, transformY, zoomLevel],
  } = store.getState();
  const { screenToFlowPosition } = useReactFlow();

  const [draggedIds2D, setDraggedIds2D] = React.useState<
    typeof draggedIds2DSignal.value
  >([]);
  const [dragState, setDragState] = React.useState<{
    oneD: [number];
    twoD: [number, number];
    new: boolean;
    remove: boolean;
  }>({
    oneD: [-1],
    twoD: [-1, -1],
    new: false,
    remove: false,
  });

  const { dapps } = useDapps();

  useSignalEffect(() => {
    if (draggedIds2DSignal.value.length === draggedIds2D.length) {
      for (let i = 0; i < draggedIds2DSignal.value.length; i++) {
        if (!isTwoObjectEqual(draggedIds2DSignal.value[i], draggedIds2D[i])) {
          setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
          setDragState({
            oneD: [i],
            twoD: [-1, -1],
            new: false,
            remove: false,
          });
          break;
        }

        // for (let j = 0; j < draggedIds2DSignal.value[i].length; j++) {
        //   if (
        //     !isTwoObjectEqual(
        //       draggedIds2DSignal.value[i][j],
        //       draggedIds2D[i][j],
        //     )
        //   ) {
        //     setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
        //     setDragState({
        //       oneD: [-1],
        //       twoD: [i, j],
        //       new: false,
        //       remove: false,
        //     });
        //     break;
        //   }
        // }
      }
    } else if (draggedIds2DSignal.value.length > draggedIds2D.length) {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
      setDragState({
        oneD: [-1],
        twoD: [-1, -1],
        new: true,
        remove: false,
      });
    }
  });

  useEffect(() => {
    if (dragState.new) {
      handleAddBox();
    } else if (!dragState.oneD.every((v) => v === -1)) {
      const position = screenToFlowPosition({
        x: 0,
        y: 0,
      });
      props.nodes[dragState.oneD[0] + 1] = {
        ...props.nodes[dragState.oneD[0] + 1],
        data: {
          ...props.nodes[dragState.oneD[0] + 1].data,
          position,
          ids: draggedIds2D[dragState.oneD[0]],
        },
      };

      props.onNodesChange(props.nodes);
    } else if (!dragState.twoD.every((v) => v === -1)) {
      // handleAddBox();
    }
  }, [dragState]);

  function handleAddBox() {
    const dappIndex = draggedDappIndexesSignal.value[draggedIds2D.length - 1];
    const thisDapp = dapps[dappIndex];
    const zoomMultiplier = 1 / zoomLevel;
    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;
    // const nodeWidthOffset = NODE_WIDTH / 2;
    // const nodeHeightOffset = NODE_HEIGHT / 2;
    const position = screenToFlowPosition({
      x: centerX,
      y: centerY,
    });
    props.setNodes((prev) => [
      ...prev,
      {
        id: `${Math.random()}`,
        type: 'customBox',
        dragHandle: '.drag-handle-area',
        data: {
          label: thisDapp.title,
          status: 'Missing',
          isChain: false,
          dapp: thisDapp,
          ids: draggedIds2D[draggedIds2D.length - 1],
          baseIndex: draggedIds2D.length - 1,
        },
        //TODO: center position
        // position: {
        //   x: 0,
        //   y: 0,
        // },
        position,
      },
    ]);
  }

  return <></>;
}
