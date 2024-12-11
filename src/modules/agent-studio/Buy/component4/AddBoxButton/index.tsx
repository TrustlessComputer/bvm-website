import useDapps from '@/modules/agent-studio/Buy/hooks/useDapps';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '@/modules/agent-studio/Buy/signals/useDragSignal';
import { cloneDeep, isTwoObjectEqual } from '@/modules/agent-studio/Buy/utils';
import { useSignalEffect } from '@preact/signals-react';
import { useReactFlow } from '@xyflow/react';
import React, { useEffect } from 'react';
import useFlowStore from '../../stores/useFlowStore';

export default function AddBoxButton({ ...props }): React.JSX.Element {
  const { nodes, setNodes, onNodesChange } = useFlowStore();
  const { screenToFlowPosition } = useReactFlow();
  // console.log('nodes', nodes);
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
    const positionTo = {
      x: lastNode.position.x - (lastNode.measured?.width || 0),
      y: lastNode.position.y - (lastNode.measured?.height || 0),
    };

    // setNodes([
    //   ...nodes,
    //   {
    //     id: `${nodes.length}`,
    //     type: 'customBox',
    //     dragHandle: '.drag-handle-area',
    //     data: {
    //       label: thisDapp.title,
    //       status: StatusBox.MISSING,
    //       isChain: false,
    //       dapp: thisDapp,
    //       ids: draggedIds2D[draggedIds2D.length - 1],
    //       baseIndex: draggedIds2D.length - 1,
    //     },
    //     origin: [0.0, 0.0],
    //     position: {
    //       x: 0,
    //       y: 0,
    //     },
    //   },
    // ]);
    resetDragState();
  };

  return <></>;
}
