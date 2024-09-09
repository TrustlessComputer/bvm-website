import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useFlowStore, {
  AppState,
} from '@/modules/blockchains/Buy/stores/useFlowStore';
import { useBridgesModule } from '@/modules/blockchains/detail_v4/hook/useBridgesModule';
import { DappNode } from '@/types/node';
import { MarkerType, useStoreApi } from '@xyflow/react';
import handleStatusEdges from '@utils/helpers';
import { useEffect } from 'react';
import { removeItemAtIndex } from '../../dapp/utils';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import {
  accountAbstractionAsADapp,
  bridgesAsADapp,
  gamingAppsAsADapp,
} from '../mockup_3';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { cloneDeep } from '../utils';
import { IModelOption } from '@/types/customize-model';
import { mouseDroppedPositionSignal } from '@/modules/blockchains/Buy/signals/useMouseDroppedPosition';
import useFormChain from './useFormChain';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';

export default function useCheckNodes() {
  const { field } = useOrderFormStoreV3();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const { getCurrentFieldFromChain } = useFormChain();
  const { lineBridgeStatus } = useBridgesModule();
  const { lineAAStatus } = useAAModule();
  const { dapps } = useDappsStore();
  const store = useStoreApi();
  const {
    transform: [transformX, transformY, zoomLevel],
  } = store.getState();

  const check = () => {
    const newNodes = [...nodes];
    const newEdges = [...edges];
    const newDraggedDappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    const newDraggedIds2D = cloneDeep(draggedIds2DSignal.value);
    let somethingChanged = false;
    const transformedX =
      (mouseDroppedPositionSignal.value.x - transformX) / zoomLevel;
    const transformedY =
      (mouseDroppedPositionSignal.value.y - transformY) / zoomLevel;
    const positionTo = {
      x: transformedX,
      y: transformedY,
    };

    if (!getCurrentFieldFromChain('wallet')) {
      const nodeIndex = nodes.findIndex(
        (node) => node.id == 'account_abstraction',
      );
      const dappIndex = dapps.findIndex(
        (dapp) => dapp.key === 'account_abstraction',
      );
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex != -1) {
        console.log('[useCheckNodes] case 1');
        nodes.splice(nodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, nodeIndex));
      }

      if (dappIndexInSignal !== -1) {
        removeItemAtIndex(draggedDappIndexesSignal.value, dappIndexInSignal);
        removeItemAtIndex(draggedIds2DSignal.value, dappIndexInSignal);
      }
    } else {
      const nodeIndex = nodes.findIndex(
        (node) => node.id == 'account_abstraction',
      );
      const dappIndex = dapps.findIndex(
        (dapp) => dapp.key === 'account_abstraction',
      );
      const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
        (i) => i === dappIndex,
      );

      if (nodeIndex === -1) {
        const rootNode = 'blockchain';
        const thisDapp = accountAbstractionAsADapp;
        let nodesData = nodes;
        const newNodeId = 'account_abstraction';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: { x: 0, y: 0 },
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: 0,
            categoryOption: {} as IModelOption,
            ids: [],
            targetHandles: [`account_abstraction-t-${rootNode}`],
            sourceHandles: [],
          },
        };

        const getHandleNodeBlockChain = nodes.find(
          (item) => item.id === rootNode,
        );
        getHandleNodeBlockChain?.data?.sourceHandles?.push(
          `${rootNode}-s-account_abstraction`,
        );

        nodesData = nodes.map((item) =>
          item.id === rootNode ? getHandleNodeBlockChain : item,
        ) as AppState['nodes'];

        const newEdge = {
          id: `${Math.random()}`,
          source: rootNode,
          sourceHandle: `${rootNode}-s-account_abstraction`,
          target: `account_abstraction`,
          targetHandle: `account_abstraction-t-${rootNode}`,
          type: 'customEdge',
          selectable: false,
          selected: false,
          focusable: false,
          label: handleStatusEdges('', lineAAStatus, 'account_abstraction')
            .icon,
          animated: handleStatusEdges(
            '',
            lineAAStatus,
            'account_abstraction',
          ).animate,
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
        console.log('[useCheckNodes] case 2');
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
        const thisDapp = bridgesAsADapp;
        let nodesData = nodes;
        const newNodeId = 'bridge_apps';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: positionTo,
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: 0,
            categoryOption: {} as IModelOption,
            ids: [],
            targetHandles: [`bridge_apps-t-${rootNode}`],
            sourceHandles: [],
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
            width: 25,
            height: 25,
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
          position: positionTo,
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: 0,
            categoryOption: {} as IModelOption,
            ids: [],
            targetHandles: [`gaming_apps-t-${rootNode}`],
            sourceHandles: [],
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
          label: handleStatusEdges('', lineBridgeStatus, 'gaming_apps').icon,
          animated: handleStatusEdges('', lineBridgeStatus, 'gaming_apps')
            .animate,
          selectable: false,
          selected: false,
          focusable: false,
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
