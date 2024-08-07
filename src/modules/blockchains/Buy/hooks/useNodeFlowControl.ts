import { useNodes, useNodesState, useReactFlow, useStoreApi } from '@xyflow/react';
import React, { useEffect } from 'react';
import { draggedDappIndexesSignal, draggedIds2DSignal } from '@/modules/blockchains/Buy/signals/useDragSignal';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import { useSignalEffect } from '@preact/signals-react';
import { cloneDeep, isTwoObjectEqual } from '@/modules/blockchains/Buy/utils';

export default function useNodeFlowControl() {

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);


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
      nodes[dragState.oneD[0] + 1] = {
        ...nodes[dragState.oneD[0] + 1],
        data: {
          ...nodes[dragState.oneD[0] + 1].data,
          position,
          ids: draggedIds2D[dragState.oneD[0]],
        },
      };

      onNodesChange(nodes);
    } else if (!dragState.twoD.every((v) => v === -1)) {
      // handleAddBox();
    }
  }, [dragState]);

  const handleAddBox = () => {
    const dappIndex = draggedDappIndexesSignal.value[draggedIds2D.length - 1];
    const thisDapp = dapps[dappIndex];

    const lastNode = nodes[nodes.length - 1];
    const positionTo = {
      x: lastNode.position.x - (lastNode.measured?.width || 0),
      y: lastNode.position.y - (lastNode.measured?.height || 0),
    };

    setNodes((prev) => [
      ...prev,
      {
        id: `${nodes.length}`,
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
        origin: [0.0, 0.0],
        position: positionTo,
      },
    ]);
  };

  return {
    handleAddBox,
  };
}
