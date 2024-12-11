import { mouseDroppedPositionSignal } from '@/modules/agent-studio/Buy/signals/useMouseDroppedPosition';
import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import useFlowStore, {
  AppState,
} from '@/modules/agent-studio/Buy/stores/useFlowStore';
import { useAAModule } from '@/modules/agent-studio/detail_v4/hook/useAAModule';
import { useBridgesModule } from '@/modules/agent-studio/detail_v4/hook/useBridgesModule';
import { useGameModule } from '@/modules/agent-studio/detail_v4/hook/useGameModule';
import { IModelOption } from '@/types/customize-model';
import { DappNode } from '@/types/node';
import handleStatusEdges from '@utils/helpers';
import { MarkerType, useStoreApi } from '@xyflow/react';
import { useEffect } from 'react';
import { removeItemAtIndex } from '../../dapp/utils';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import {
  createAgentGeneralIdeaAsBrainstorm,
  missionAsBrainstorm,
  gamingAppsAsADapp,
} from '../mockup_3';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { cloneDeep } from '../utils';
import useFormChain from './useFormChain';

export default function useCheckNodes() {
  const field = useOrderFormStoreV3((state) => state.field);

  const nodes = useFlowStore((state) => state.nodes);
  const setNodes = useFlowStore((state) => state.setNodes);
  const edges = useFlowStore((state) => state.edges);
  const setEdges = useFlowStore((state) => state.setEdges);

  const { getCurrentFieldFromChain } = useFormChain();
  const { lineBridgeStatus } = useBridgesModule();
  const { lineAAStatus } = useAAModule();
  const { statusMapper } = useGameModule();
  const { dapps } = useDappsStore();
  const store = useStoreApi();

  const check = () => {
    const newNodes = [...nodes];
    const newEdges = [...edges];
    const newDraggedDappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    const newDraggedIds2D = cloneDeep(draggedIds2DSignal.value);
    let somethingChanged = false;
    // const transformedX =
    //   (mouseDroppedPositionSignal.value.x - transformX) / zoomLevel;
    // const transformedY =
    //   (mouseDroppedPositionSignal.value.y - transformY) / zoomLevel;
    // const positionTo = {
    //   x: transformedX,
    //   y: transformedY,
    // };

    if (!getCurrentFieldFromChain('create_agent')) {
      const nodeIndex = nodes.findIndex((node) => node.id == 'general_idea');
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'general_idea');
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex != -1) {
        nodes.splice(nodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, nodeIndex));
      }

      if (dappIndexInSignal !== -1) {
        removeItemAtIndex(draggedDappIndexesSignal.value, dappIndexInSignal);
        removeItemAtIndex(draggedIds2DSignal.value, dappIndexInSignal);
      }
    } else {
      const nodeIndex = nodes.findIndex((node) => node.id == 'general_idea');
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'general_idea');
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex === -1) {
        const rootNode = 'blockchain';
        const thisDapp = createAgentGeneralIdeaAsBrainstorm;
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
            baseIndex: 0,
            categoryOption: {} as IModelOption,
            ids: [],
            // targetHandles: [`general_idea-t-${rootNode}`],
            targetHandles: [],
            sourceHandles: [`general_idea-t-${rootNode}`],
            // sourceHandles: [],
          },
        };

        const getHandleNodeBlockChain = nodes.find(
          (item) => item.id === rootNode,
        );
        getHandleNodeBlockChain?.data?.sourceHandles?.push(
          `${rootNode}-s-general_idea`,
        );

        nodesData = nodes.map((item) =>
          item.id === rootNode ? getHandleNodeBlockChain : item,
        ) as AppState['nodes'];

        const newEdge = {
          id: `${Math.random()}`,
          source: rootNode,
          sourceHandle: `${rootNode}-s-general_idea`,
          target: `general_idea`,
          targetHandle: `general_idea-t-${rootNode}`,
          type: 'customEdge',
          selectable: false,
          selected: false,
          focusable: false,
          label: handleStatusEdges('', lineAAStatus, 'general_idea').icon,
          animated: handleStatusEdges('', lineAAStatus, 'general_idea').animate,
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
        };

        needReactFlowRenderSignal.value = true;
        newNodes.push(newNode);
        newEdges.push(newEdge);
        somethingChanged = true;
      }

      if (dappIndexInSignal === -1) {
        newDraggedDappIndexes.push(dappIndex);
        newDraggedIds2D.push([]);
        somethingChanged = true;
      }
    }

    if (!getCurrentFieldFromChain('bridge_apps')) {
      const nodeIndex = nodes.findIndex((node) => node.id == 'bridge_apps');
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'bridge_apps');
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex != -1) {
        nodes.splice(nodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, nodeIndex));
      }

      if (dappIndexInSignal !== -1) {
        removeItemAtIndex(draggedDappIndexesSignal.value, dappIndexInSignal);
        removeItemAtIndex(draggedIds2DSignal.value, dappIndexInSignal);
      }
    } else {
      const nodeIndex = nodes.findIndex((node) => node.id == 'bridge_apps');
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'bridge_apps');
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex === -1) {
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

        const getHandleNodeBlockChain = nodes.find(
          (item) => item.id === rootNode,
        );
        getHandleNodeBlockChain?.data?.sourceHandles?.push(
          `${rootNode}-s-bridge_apps`,
        );

        nodesData = nodes.map((item) =>
          item.id === rootNode ? getHandleNodeBlockChain : item,
        ) as AppState['nodes'];

        const newEdge = {
          id: `${Math.random()}`,
          source: rootNode,
          sourceHandle: `${rootNode}-s-bridge_apps`,
          target: `bridge_apps`,
          targetHandle: `bridge_apps-t-${rootNode}`,
          type: 'customEdge',
          label: handleStatusEdges('', lineBridgeStatus, 'bridge_apps').icon,
          animated: handleStatusEdges('', lineBridgeStatus, 'bridge_apps')
            .animate,
          selectable: false,
          selected: false,
          focusable: false,
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
        };

        needReactFlowRenderSignal.value = true;
        newNodes.push(newNode);
        newEdges.push(newEdge);
        somethingChanged = true;
      }

      if (dappIndexInSignal === -1) {
        newDraggedDappIndexes.push(dappIndex);
        newDraggedIds2D.push([]);
        somethingChanged = true;
      }
    }

    if (!getCurrentFieldFromChain('gaming_apps')) {
      const nodeIndex = nodes.findIndex((node) => node.id == 'gaming_apps');
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'gaming_apps');
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex != -1) {
        console.log('[useCheckNodes] case 3');

        nodes.splice(nodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, nodeIndex));
      }

      if (dappIndexInSignal !== -1) {
        removeItemAtIndex(draggedDappIndexesSignal.value, dappIndexInSignal);
        removeItemAtIndex(draggedIds2DSignal.value, dappIndexInSignal);
      }
    } else {
      const nodeIndex = nodes.findIndex((node) => node.id == 'gaming_apps');
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'gaming_apps');
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex === -1) {
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

        const getHandleNodeBlockChain = nodes.find(
          (item) => item.id === rootNode,
        );
        getHandleNodeBlockChain?.data?.sourceHandles?.push(
          `${rootNode}-s-gaming_apps`,
        );

        nodesData = nodes.map((item) =>
          item.id === rootNode ? getHandleNodeBlockChain : item,
        ) as AppState['nodes'];

        const newEdge = {
          id: `${Math.random()}`,
          source: rootNode,
          sourceHandle: `${rootNode}-s-gaming_apps`,
          target: `gaming_apps`,
          targetHandle: `gaming_apps-t-${rootNode}`,
          type: 'customEdge',
          label: handleStatusEdges('', statusMapper.statusStr, 'gaming_apps')
            .icon,
          animated: handleStatusEdges('', statusMapper.statusStr, 'gaming_apps')
            .animate,
          selectable: false,
          selected: false,
          focusable: false,
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
        };

        needReactFlowRenderSignal.value = true;
        newNodes.push(newNode);
        newEdges.push(newEdge);
        somethingChanged = true;
      }

      if (dappIndexInSignal === -1) {
        newDraggedDappIndexes.push(dappIndex);
        newDraggedIds2D.push([]);
        somethingChanged = true;
      }
    }

    console.log('[useCheckNodes] useEffect[field]', {
      newNodes,
      newEdges,
      field,
      newDraggedDappIndexes,
      newDraggedIds2D,
      somethingChanged,
    });

    if (somethingChanged) {
      needReactFlowRenderSignal.value = true;
      draggedDappIndexesSignal.value = newDraggedDappIndexes;
      draggedIds2DSignal.value = newDraggedIds2D;
      console.log('[useCheckNodes] case 4');
      setNodes(newNodes);
      setEdges(newEdges);
    }
    needReactFlowRenderSignal.value = true;
  };

  useEffect(() => {
    check();
  }, [field]);
}
