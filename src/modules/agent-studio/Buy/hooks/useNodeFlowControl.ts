import useDapps from '@/modules/agent-studio/Buy/hooks/useDapps';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  restoreLocal,
} from '@/modules/agent-studio/Buy/signals/useDragSignal';
import {
  cloneDeep,
  dappKeyToChainKey,
  isTwoObjectEqual,
} from '@/modules/agent-studio/Buy/utils';
import { useSignalEffect } from '@preact/signals-react';
import { MarkerType, useStoreApi } from '@xyflow/react';
import React, { useEffect } from 'react';
import useFlowStore, { AppState } from '../stores/useFlowStore';

import { mouseDroppedPositionSignal } from '@/modules/agent-studio/Buy/signals/useMouseDroppedPosition';
import useDraggingStore from '@/modules/agent-studio/Buy/stores/useDraggingStore';
import { needReactFlowRenderSignal } from '@/modules/agent-studio/Buy/studio/ReactFlowRender';
import { useAAModule } from '@/modules/agent-studio/detail_v4/hook/useAAModule';
import { useBridgesModule } from '@/modules/agent-studio/detail_v4/hook/useBridgesModule';
import { useGameModule } from '@/modules/agent-studio/detail_v4/hook/useGameModule';
import { IModelOption } from '@/types/customize-model';
import { DappNode } from '@/types/node';
import handleStatusEdges from '@utils/helpers';
import { useChainProvider } from '../../detail_v4/provider/ChainProvider.hook';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import {
  agentInfoAsBrainstorm,
  missionAsBrainstorm,
  gamingAppsAsADapp,
} from '../mockup_3';
import useDappsStore, { useTemplateFormStore } from '../stores/useDappStore';
import useDraggedId2DStore from '../stores/useDraggedId2DStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';

export default function useNodeFlowControl() {
  const dapps = useDappsStore((state) => state.dapps);

  const categories = useModelCategoriesStore((state) => state.categories);

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const setNodes = useFlowStore((state) => state.setNodes);
  const setEdges = useFlowStore((state) => state.setEdges);

  const isDragging = useDraggingStore((state) => state.isDragging);
  const setIsDragging = useDraggingStore((state) => state.setIsDragging);

  const templateDapps = useTemplateFormStore((state) => state.templateDapps);

  const draggedIds2D = useDraggedId2DStore((state) => state.draggedIds2D);
  const setDraggedIds2D = useDraggedId2DStore((state) => state.setDraggedIds2D);

  const store = useStoreApi();
  const { lineAAStatus } = useAAModule();
  const { lineBridgeStatus } = useBridgesModule();
  const { statusMapper } = useGameModule();
  const {
    transform: [transformX, transformY, zoomLevel],
  } = store.getState();
  const { isAAInstalled, isBridgeInstalled, isGamingAppsInstalled } =
    useChainProvider();

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
      } as any;

      setNodes(newNodes);
      resetDragState();
    } else if (!dragState.twoD.every((v) => v === -1)) {
      // handleAddBox();
    }
  };

  useSignalEffect(() => {
    const bridgeAppsIndex = dapps.findIndex(
      (dapp) => dapp.key === 'bridge_apps',
    );
    const gamingAppsIndex = dapps.findIndex(
      (dapp) => dapp.key === 'gaming_apps',
    );
    const accountAbstractionIndex = dapps.findIndex(
      (dapp) => dapp.key === 'general_idea',
    );
    console.log('[useNodeFlowControl]', { nodes });

    needReactFlowRenderSignal.value = true;

    if (!restoreLocal.value) return;

    needReactFlowRenderSignal.value = true;

    if (
      draggedDappIndexesSignal.value.includes(accountAbstractionIndex) &&
      isAAInstalled
    ) {
      if (!nodes.some((node) => node.id === 'general_idea')) {
        const rootNode = 'blockchain';
        const thisDapp = agentInfoAsBrainstorm;
        const category = categories?.find((category) =>
          category.options.some(
            (option) => option.key === dappKeyToChainKey(thisDapp.key),
          ),
        );
        const categoryOption = category?.options.find(
          (option) => option.key === dappKeyToChainKey(thisDapp.key),
        );
        let nodesData = nodes;
        const newNodeId = 'general_idea';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: { x: 950, y: 30 },
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: draggedIds2D.length - 1,
            categoryOption: categoryOption as IModelOption,
            ids: draggedIds2D[draggedIds2D.length - 1],
            // targetHandles: [`general_idea-t-${rootNode}`],
            targetHandles: [],
            sourceHandles: [`general_idea-t-${rootNode}`],
            // sourceHandles: [],
          },
        };
        setNodes([...nodesData, newNode]);
        setEdges([
          ...edges,
          {
            // id: `${edges.length + 1}`,
            id: `${Math.random()}`,
            source: rootNode,
            sourceHandle: `${rootNode}-s-general_idea`,
            // target: `${newNodeId}`,
            target: `general_idea`,
            targetHandle: `general_idea-t-${rootNode}`,
            type: 'customEdge',
            selectable: false,
            selected: false,
            focusable: false,
            label: handleStatusEdges('', lineAAStatus, 'general_idea').icon,
            animated: handleStatusEdges('', lineAAStatus, 'general_idea')
              .animate,
            markerEnd: {
              type: MarkerType.Arrow,
              width: 20,
              height: 20,
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

    if (
      draggedDappIndexesSignal.value.includes(bridgeAppsIndex) &&
      isBridgeInstalled
    ) {
      if (!nodes.some((node) => node.id === 'bridge_apps')) {
        const rootNode = 'blockchain';
        const thisDapp = missionAsBrainstorm;
        let nodesData = nodes;
        const newNodeId = 'bridge_apps';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: { x: 500, y: 30 },
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: 0,
            categoryOption: {} as IModelOption,
            ids: [],
            // targetHandles: [`bridge_apps-t-${rootNode}`],
            targetHandles: [],
            sourceHandles: [`bridge_apps-t-${rootNode}`],
            // sourceHandles: [],
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
            label: handleStatusEdges('', lineBridgeStatus, 'bridge_apps').icon,
            animated: handleStatusEdges('', lineBridgeStatus, 'bridge_apps')
              .animate,
            targetHandle: `bridge_apps-t-${rootNode}`,
            selectable: false,
            selected: false,
            focusable: false,
            type: 'customEdge',
            markerEnd: {
              type: MarkerType.Arrow,
              width: 20,
              height: 20,
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

    if (
      draggedDappIndexesSignal.value.includes(gamingAppsIndex) &&
      isGamingAppsInstalled
    ) {
      if (!nodes.some((node) => node.id === 'gaming_apps')) {
        const rootNode = 'blockchain';
        const thisDapp = gamingAppsAsADapp;
        let nodesData = nodes;
        const newNodeId = 'gaming_apps';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: { x: 1500, y: 30 },
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: 0,
            categoryOption: {} as IModelOption,
            ids: [],
            // targetHandles: [`gaming_apps-t-${rootNode}`],
            targetHandles: [],
            sourceHandles: [`gaming_apps-t-${rootNode}`],
            // sourceHandles: [],
          },
        };
        setNodes([...nodesData, newNode]);
        setEdges([
          ...edges,
          {
            // id: `${edges.length + 1}`,
            id: `${Math.random()}`,
            source: rootNode,
            sourceHandle: `${rootNode}-s-gaming_apps`,
            // target: `${newNodeId}`,
            target: `gaming_apps`,
            label: handleStatusEdges('', statusMapper.statusStr, 'gaming_apps')
              .icon,
            animated: handleStatusEdges(
              '',
              statusMapper.statusStr,
              'gaming_apps',
            ).animate,
            targetHandle: `gaming_apps-t-${rootNode}`,
            selectable: false,
            selected: false,
            focusable: false,
            type: 'customEdge',
            markerEnd: {
              type: MarkerType.Arrow,
              width: 20,
              height: 20,
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
    const statusDapp = thisDapp.label?.status || '';

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

    const rootNode = 'blockchain';
    let suffix = thisDapp.title;
    let statusMapping: any = '';
    let newNodeId = `${nodes.length + 1}`;
    let transformedX =
      (mouseDroppedPositionSignal.value.x - transformX) / zoomLevel;
    let transformedY =
      (mouseDroppedPositionSignal.value.y - transformY) / zoomLevel;

    switch (thisDapp.key) {
      case agentInfoAsBrainstorm.key:
        suffix = 'general_idea';
        newNodeId = 'general_idea';
        statusMapping = lineAAStatus;
        console.log(
          '[useNodeFlowControl] handleAddBox case agentInfoAsBrainstorm',
          lineAAStatus,
        );
        break;
      case missionAsBrainstorm.key:
        suffix = 'bridge_apps';
        newNodeId = 'bridge_apps';
        statusMapping = lineBridgeStatus;
        break;
      case gamingAppsAsADapp.key:
        suffix = 'gaming_apps';
        newNodeId = 'gaming_apps';
        statusMapping = 'draft';
        break;
      default:
        break;
    }

    const positionTo = {
      x: transformedX,
      y: transformedY,
    };

    const getHandleNodeBlockChain = nodes.find((item) => item.id === rootNode);
    const isHandleExists = edges.some(
      (handle) => handle.sourceHandle === `${rootNode}-s-${suffix}`,
    );
    let nodesData = nodes;
    const ignoreKeys = ['bridge_apps', 'gaming_apps'];
    if (!isHandleExists && !ignoreKeys.includes(suffix)) {
      getHandleNodeBlockChain?.data?.sourceHandles?.push(
        `${rootNode}-s-${suffix}`,
      );
      nodesData = nodes.map((item) =>
        item.id === rootNode ? getHandleNodeBlockChain : item,
      ) as AppState['nodes'];
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
        categoryOption: categoryOption as IModelOption,
        ids: draggedIds2D[draggedIds2D.length - 1],
        // targetHandles: [`${newNodeId}-t-${rootNode}`],
        targetHandles: [],
        sourceHandles: [`${newNodeId}-t-${rootNode}`],
        // sourceHandles: [],
      },
    };
    setNodes([...nodesData, newNode]);
    setEdges([
      ...edges,
      {
        id: `${Math.random()}`,
        source: rootNode,
        sourceHandle: `${rootNode}-s-${suffix}`,
        target: `${newNodeId}`,
        targetHandle: `${newNodeId}-t-${rootNode}`,
        type: 'customEdge',
        selectable: false,
        selected: false,
        focusable: false,
        label: handleStatusEdges(statusDapp, statusMapping, newNodeId).icon,
        animated: handleStatusEdges(statusDapp, statusMapping, newNodeId)
          .animate,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
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
