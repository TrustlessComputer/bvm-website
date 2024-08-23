import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import {
  cloneDeep,
  dappKeyToChainKey,
  isTwoObjectEqual,
} from '@/modules/blockchains/Buy/utils';
import { useSignalEffect } from '@preact/signals-react';
import { MarkerType, useStoreApi } from '@xyflow/react';
import React, { useEffect } from 'react';
import useFlowStore, { AppState } from '../stores/useFlowStore';

import { mouseDroppedPositionSignal } from '@/modules/blockchains/Buy/signals/useMouseDroppedPosition';
import useDraggingStore from '@/modules/blockchains/Buy/stores/useDraggingStore';
import { needReactFlowRenderSignal } from '@/modules/blockchains/Buy/studio/ReactFlowRender';
import { DappNode } from '@/types/node';
import { useChainProvider } from '../../detail_v4/provider/ChainProvider.hook';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import { accountAbstractionAsADapp, bridgesAsADapp } from '../mockup_3';
import { useTemplateFormStore } from '../stores/useDappStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import handleStatusEdges from '@utils/helpers';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';

export default function useNodeFlowControl() {
  const { dapps } = useDapps();
  const { categories } = useModelCategoriesStore();
  const { nodes, setNodes, setEdges, edges } = useFlowStore();
  const { isDragging, setIsDragging } = useDraggingStore();
  const store = useStoreApi();
  const  { lineAAStatus } = useAAModule()
  const {
    transform: [transformX, transformY, zoomLevel],
  } = store.getState();
  const { templateDapps } = useTemplateFormStore();
  const [draggedIds2D, setDraggedIds2D] = React.useState<
    typeof draggedIds2DSignal.value
  >([]);
  const { isAAInstalled, isBridgeInstalled } = useChainProvider();

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
      console.log('index', { index, nodes });

      const newNodes = cloneDeep(nodes);

      newNodes[index] = {
        ...newNodes[index],
        data: {
          ...newNodes[index].data,
          ids: draggedIds2D[dragState.oneD[0]],
        },
      } as any;

      setNodes(newNodes);
      resetDragState();
    } else if (!dragState.twoD.every((v) => v === -1)) {
      // handleAddBox();
    }
  };

  useSignalEffect(() => {
    console.log('[useNodeFlowControl] useSignalEffect', {
      new: draggedIds2DSignal.value,
      old: draggedIds2D,
      isDragging,
    });

    if (draggedDappIndexesSignal.value.includes(0) && isAAInstalled) {
      if (!nodes.some((node) => node.id === 'account-abstraction')) {
        const rootNode = 'blockchain';
        const thisDapp = accountAbstractionAsADapp;
        const category = categories?.find((category) =>
          category.options.some(
            (option) => option.key === dappKeyToChainKey(thisDapp.key),
          ),
        );
        const categoryOption = category?.options.find(
          (option) => option.key === dappKeyToChainKey(thisDapp.key),
        );
        let nodesData = nodes;
        const newNodeId = 'account-abstraction';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: { x: 0, y: 0 },
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: draggedIds2D.length - 1,
            categoryOption,
            ids: draggedIds2D[draggedIds2D.length - 1],
            targetHandles: [`account-abstraction-t-${rootNode}`],
            sourceHandles: [],
          },
        };

        setNodes([...nodesData, newNode]);
        setEdges([
          ...edges,
          {
            // id: `${edges.length + 1}`,
            id: `${Math.random()}`,
            source: rootNode,
            sourceHandle: `${rootNode}-s-account-abstraction`,
            // target: `${newNodeId}`,
            target: `account-abstraction`,
            targetHandle: `account-abstraction-t-${rootNode}`,
            type: 'customEdge',
            // label: handleStatusEdges('draft').icon.toString(),
            // animated: handleStatusEdges('draft').animate,
            markerEnd: {
              type: MarkerType.Arrow,
              width: 25,
              height: 25,
              strokeWidth: 1,
              color: '#AAAAAA',
            },
            style: {
              stroke: '#AAAAAA',
              strokeWidth: 2,
            },
          },
        ]);
        needReactFlowRenderSignal.value = true;
      }
    }

    if (draggedDappIndexesSignal.value.includes(1) && isBridgeInstalled) {
      if (!nodes.some((node) => node.id === 'bridge_apps')) {
        const rootNode = 'blockchain';
        const thisDapp = bridgesAsADapp;
        let nodesData = nodes;
        const newNodeId = 'bridge_apps';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: { x: 0, y: 0 },
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: -1,
            categoryOption: {},
            ids: [],
            targetHandles: [`bridge_apps-t-${rootNode}`],
            sourceHandles: [],
          },
        };

        setNodes([...nodesData, newNode]);
        setEdges([
          ...edges,
          {
            // id: `${edges.length + 1}`,
            id: `${Math.random()}`,
            source: rootNode,
            sourceHandle: `${rootNode}-s-bridge_apps`,
            // target: `${newNodeId}`,
            target: `bridge_apps`,
            targetHandle: `bridge_apps-t-${rootNode}`,
            type: 'customEdge',
            label: '',
            markerEnd: {
              type: MarkerType.Arrow,
              width: 25,
              height: 25,
              strokeWidth: 1,
              color: '#AAAAAA',
            },
            style: {
              stroke: '#AAAAAA',
              strokeWidth: 2,
            },
          },
        ]);
        needReactFlowRenderSignal.value = true;
      }
    }

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
    } else if (
      draggedIds2DSignal.value.length > draggedIds2D.length &&
      isDragging
    ) {
      setDraggedIds2D(cloneDeep(draggedIds2DSignal.value));
      setDragState({
        oneD: [-1],
        twoD: [-1, -1],
        new: true,
        remove: false,
      });
      setIsDragging(false);
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

    if (!thisDapp) {
      needReactFlowRenderSignal.value = true;
      resetDragState();
      return;
    }

    const category = categories?.find((category) =>
      category.options.some(
        (option) => option.key === dappKeyToChainKey(thisDapp.key),
      ),
    );
    const categoryOption = category?.options.find(
      (option) => option.key === dappKeyToChainKey(thisDapp.key),
    );

    if (!categoryOption && !thisDapp.isDefaultDapp) {
      needReactFlowRenderSignal.value = true;
      resetDragState();
      return;
    }

    const transformedX =
      (mouseDroppedPositionSignal.value.x - transformX) / zoomLevel;
    const transformedY =
      (mouseDroppedPositionSignal.value.y - transformY) / zoomLevel;
    const positionTo = {
      x: transformedX,
      y: transformedY,
    };

    const rootNode = 'blockchain';
    let suffix = thisDapp.title;

    switch (thisDapp.key) {
      case accountAbstractionAsADapp.key:
        suffix = 'account-abstraction';
        break;
      case bridgesAsADapp.key:
        suffix = 'bridge_apps';
        break;
      default:
        break;
    }

    const getHandleNodeBlockChain = nodes.find((item) => item.id === rootNode);
    const isHandleExists = edges.some(
      (handle) => handle.sourceHandle === `${rootNode}-s-${suffix}`,
    );
    let nodesData = nodes;

    if (!isHandleExists) {
      getHandleNodeBlockChain?.data?.sourceHandles?.push(
        `${rootNode}-s-${suffix}`,
      );
      nodesData = nodes.map((item) =>
        item.id === rootNode ? getHandleNodeBlockChain : item,
      ) as AppState['nodes'];
    }

    let newNodeId = `${nodes.length + 1}`;

    switch (thisDapp.key) {
      case accountAbstractionAsADapp.key:
        newNodeId = 'account-abstraction';
        break;
      case bridgesAsADapp.key:
        newNodeId = 'bridge_apps';
        break;
      default:
        newNodeId = `${nodes.length + 1}`;
        break;
    }

    if (nodes.some((node) => node.id === newNodeId)) {
      needReactFlowRenderSignal.value = true;
      resetDragState();
      return;
    }

    const newNode: DappNode = {
      id: newNodeId,
      type: dappKeyToNodeKey(thisDapp.key),
      dragHandle: '.drag-handle-area',
      position: positionTo,
      data: {
        node: 'dapp',
        title: thisDapp.title,
        dapp: thisDapp,
        baseIndex: draggedIds2D.length - 1,
        categoryOption,
        ids: draggedIds2D[draggedIds2D.length - 1],
        targetHandles: [`${newNodeId}-t-${rootNode}`],
        sourceHandles: [],
      },
    };

    setNodes([...nodesData, newNode]);
    setEdges([
      ...edges,
      {
        // id: `${edges.length + 1}`,
        id: `${Math.random()}`,
        source: rootNode,
        sourceHandle: `${rootNode}-s-${suffix}`,
        target: `${newNodeId}`,
        targetHandle: `${newNodeId}-t-${rootNode}`,
        type: 'customEdge',
        label: handleStatusEdges(lineAAStatus, newNodeId).icon,
        animated: handleStatusEdges(lineAAStatus, newNodeId).animate,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 25,
          height: 25,
          strokeWidth: 1,
          color: '#AAAAAA',
        },
        style: {
          stroke: '#AAAAAA',
          strokeWidth: 2,
        },
      },
    ]);
    needReactFlowRenderSignal.value = true;
    resetDragState();
  };

  return {
    handleAddBox,
  };
}
