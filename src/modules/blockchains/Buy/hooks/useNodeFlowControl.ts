import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import { draggedDappIndexesSignal, draggedIds2DSignal } from '@/modules/blockchains/Buy/signals/useDragSignal';
import { cloneDeep, dappKeyToChainKey, isTwoObjectEqual } from '@/modules/blockchains/Buy/utils';
import { useSignalEffect } from '@preact/signals-react';
import { MarkerType, useStoreApi } from '@xyflow/react';
import React, { useEffect } from 'react';
import useFlowStore from '../stores/useFlowStore';

import { mouseDroppedPositionSignal } from '@/modules/blockchains/Buy/signals/useMouseDroppedPosition';
import { useTemplateFormStore } from '../stores/useDappStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';

export default function useNodeFlowControl() {
  const { dapps } = useDapps();
  const { categories } = useModelCategoriesStore();
  const { nodes, setNodes, setEdges, edges } = useFlowStore();
  const store = useStoreApi();
  const {
    transform: [transformX, transformY, zoomLevel],
  } = store.getState();
  const { templateDapps } = useTemplateFormStore();
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

  const resetDragState = () => {
    setDragState({
      oneD: [-1],
      twoD: [-1, -1],
      new: false,
      remove: false,
    });
  };

  const handleNewDragState = () => {
    if (dragState.new) {
      handleAddBox();
    } else if (!dragState.oneD.every((v) => v === -1)) {
      const totalTemplateDapps = (templateDapps || []).length;
      const needSubtract = totalTemplateDapps > 0;
      const index = dragState.oneD[0] + 1 + totalTemplateDapps;
      const newNodes = cloneDeep(nodes);

      newNodes[index] = {
        ...newNodes[index],
        data: {
          ...newNodes[index].data,
          ids: draggedIds2D[dragState.oneD[0]],
        },
      };

      setNodes(newNodes);
      resetDragState();
    } else if (!dragState.twoD.every((v) => v === -1)) {
      // handleAddBox();
    }
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
    handleNewDragState();
  }, [dragState]);

  const handleAddBox = () => {
    const dappIndex = draggedDappIndexesSignal.value[draggedIds2D.length - 1];
    const thisDapp = dapps[dappIndex];
    const category = categories?.find((category) =>
      category.options.some(
        (option) => option.key === dappKeyToChainKey(thisDapp.key),
      ),
    );
    const categoryOption = category?.options.find(
      (option) => option.key === dappKeyToChainKey(thisDapp.key),
    );

    const transformedX =
      (mouseDroppedPositionSignal.value.x - transformX) / zoomLevel;
    const transformedY =
      (mouseDroppedPositionSignal.value.y - transformY) / zoomLevel;
    const positionTo = {
      x: transformedX,
      y: transformedY,
    };

    const rootNode = 'blockchain'

    const getHandleNodeBlockChain = nodes.find(item => item.id === rootNode);
    getHandleNodeBlockChain?.data?.sourceHandles?.push(`${rootNode}-s-${nodes.length}`);
    const newNodes: any[] = nodes?.map((item) =>  item.id === rootNode ? getHandleNodeBlockChain : item)

    setNodes([
      ...newNodes,
      {
        id: `${nodes.length}`,
        type: 'customBox',
        dragHandle: '.drag-handle-area',
        data: {
          label: thisDapp.title,
          status: 'Drafting',
          isChain: false,
          dapp: thisDapp,
          targetHandles: [`${nodes.length}-t-${rootNode}`],
          ids: draggedIds2D[draggedIds2D.length - 1],
          baseIndex: draggedIds2D.length - 1,
          categoryOption,
        },
        position: positionTo,
      },
    ]);

    setEdges([...edges, {
      id: `${edges.length + 1}`,
      source: rootNode,
      sourceHandle:  `${rootNode}-s-${nodes.length}`,
      target: `${nodes.length}`,
      targetHandle: `${nodes.length}-t-${rootNode}`,
      type: 'customEdge',
      label: 'Output 1',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }]);

    resetDragState();
  };

  return {
    handleAddBox,
  };
}
