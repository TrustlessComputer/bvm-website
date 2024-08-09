import {
  useNodes,
  useNodesState,
  useReactFlow,
  useStoreApi,
} from '@xyflow/react';
import React, { useCallback, useEffect } from 'react';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import { useSignalEffect } from '@preact/signals-react';
import { cloneDeep, isTwoObjectEqual } from '@/modules/blockchains/Buy/utils';
import useFlowStore from '../stores/useFlowStore';

import { mouseDroppedPositionSignal } from '@/modules/blockchains/Buy/signals/useMouseDroppedPosition';
let currentOverlapOffset = 0;
const NODE_WIDTH = 116;
const NODE_HEIGHT = 28;
export default function useNodeFlowControl() {
  const { nodes, setNodes, onNodesChange } = useFlowStore();
  const store = useStoreApi();
  const reactFlowInstance = useReactFlow();
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

  const resetDragState = () => {
    setDragState({
      oneD: [-1],
      twoD: [-1, -1],
      new: false,
      remove: false,
    });
  };

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
    } else {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
    }
  });

  useEffect(() => {
    if (dragState.new) {
      handleAddBox();
    } else if (!dragState.oneD.every((v) => v === -1)) {
      nodes[dragState.oneD[0] + 1] = {
        ...nodes[dragState.oneD[0] + 1],
        data: {
          ...nodes[dragState.oneD[0] + 1].data,
          ids: draggedIds2D[dragState.oneD[0]],
        },
      };

      setNodes(nodes);
      resetDragState();
    } else if (!dragState.twoD.every((v) => v === -1)) {
      // handleAddBox();
    }
  }, [dragState]);

  const handleAddBox = () => {
    const dappIndex = draggedDappIndexesSignal.value[draggedIds2D.length - 1];
    const thisDapp = dapps[dappIndex];
    const lastNode = nodes[nodes.length - 1];
    // const positionTo = {
    //   x: lastNode.position.x - (lastNode.measured?.width || 0),
    //   y: lastNode.position.y - (lastNode.measured?.height || 0),
    // };
    const positionTo = {
      x: mouseDroppedPositionSignal.value.x,
      y: mouseDroppedPositionSignal.value.y,
    };
    // const zoomMultiplier = 1 / zoomLevel;
    // const centerX = -mouseDroppedPositionSignal.value.x * zoomMultiplier + (width * zoomMultiplier) / 2;
    // const centerY =
    //   -mouseDroppedPositionSignal.value.y * zoomMultiplier + (height * zoomMultiplier) / 2;

    // const position = {
    //   x: centerX ,
    //   y: centerY,
    // }

    setNodes([
      ...nodes,
      {
        id: `${nodes.length}`,
        type: 'customBox',
        dragHandle: '.drag-handle-area',
        data: {
          label: thisDapp.title,
          status: 'Drafting',
          isChain: false,
          dapp: thisDapp,
          ids: draggedIds2D[draggedIds2D.length - 1],
          baseIndex: draggedIds2D.length - 1,
        },
        // origin: [0.0, 0.0],
        position: positionTo,
      },
    ]);
    resetDragState();
  };

  return {
    handleAddBox,
  };
}
