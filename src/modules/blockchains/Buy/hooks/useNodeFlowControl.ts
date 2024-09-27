import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  restoreLocal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import { cloneDeep, isTwoObjectEqual } from '@/modules/blockchains/Buy/utils';
import { useSignalEffect } from '@preact/signals-react';
import { useStoreApi } from '@xyflow/react';
import React, { useEffect } from 'react';
import useFlowStore from '../stores/useFlowStore';
import { mouseDroppedPositionSignal } from '@/modules/blockchains/Buy/signals/useMouseDroppedPosition';
import useDraggingStore from '@/modules/blockchains/Buy/stores/useDraggingStore';
import { useTemplateFormStore } from '../stores/useDappStore';
import useDraggedId2DStore from '../stores/useDraggedId2DStore';
import useNodeHelper from './useNodeHelper';
import useStudioHelper from './useStudioHelper';

export default function useNodeFlowControl() {
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const { isDragging, setIsDragging } = useDraggingStore();
  const store = useStoreApi();
  const {
    transform: [transformX, transformY, zoomLevel],
  } = store.getState();
  const { templateDapps } = useTemplateFormStore();
  const { draggedIds2D, setDraggedIds2D } = useDraggedId2DStore();
  const { getNodeBasedOnDappIndex, pushEdgeToChainNode } = useStudioHelper();

  const [dragState, setDragState] = React.useState({
    new: false,
    update: false,
    updateAtIndex: -1,
  });

  const resetDragState = () => {
    setDragState({
      new: false,
      update: false,
      updateAtIndex: -1,
    });
  };

  const getTransformedPosition = () => {
    return {
      x: (mouseDroppedPositionSignal.value.x - transformX) / zoomLevel,
      y: (mouseDroppedPositionSignal.value.y - transformY) / zoomLevel,
    };
  };

  const handleAddBox = () => {
    let newNodes = cloneDeep(nodes);
    let newEdges = cloneDeep(edges);
    const dappIndex = draggedDappIndexesSignal.value[draggedIds2D.length - 1];

    const { node, edge, suffix } = getNodeBasedOnDappIndex(
      dappIndex,
      getTransformedPosition(),
    );

    if (!node || !edge) return;

    newNodes = pushEdgeToChainNode(newNodes, suffix);

    setNodes([...newNodes, node]);
    setEdges([...newEdges, edge]);
    resetDragState();
    setIsDragging(false);
  };

  const handleUpdateBox = () => {
    const totalTemplateDapps = (templateDapps || []).length;
    const index = dragState.updateAtIndex + 1 + totalTemplateDapps;
    const newNodes = cloneDeep(nodes);

    newNodes[index] = {
      ...newNodes[index],
      data: {
        ...newNodes[index].data,
        ids: draggedIds2D[dragState.updateAtIndex],
      },
    } as any;

    setNodes(newNodes);
    resetDragState();
  };

  const updateStateIfDifferentChildren = () => {
    for (let i = 0; i < draggedIds2DSignal.value.length; i++) {
      if (!isTwoObjectEqual(draggedIds2DSignal.value[i], draggedIds2D[i])) {
        setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
        setDragState({
          updateAtIndex: i,
          update: true,
          new: false,
        });
        break;
      }
    }
  };

  // Run first to set the state if something changed
  useSignalEffect(() => {
    if (!restoreLocal.value) return;

    if (draggedIds2DSignal.value.length === draggedIds2D.length) {
      updateStateIfDifferentChildren();
    } else if (
      draggedIds2DSignal.value.length > draggedIds2D.length &&
      isDragging
    ) {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
      setDragState({
        new: true,
        update: false,
        updateAtIndex: -1,
      });
    } else {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
    }
  });

  // Run second to actually add/update the node
  useEffect(() => {
    if (dragState.new) {
      handleAddBox();
    } else if (dragState.update) {
      handleUpdateBox();
    }
  }, [dragState]);
}
