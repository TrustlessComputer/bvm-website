import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useFlowStore, {
  AppState,
} from '@/modules/blockchains/Buy/stores/useFlowStore';
import { useEffect } from 'react';
import { removeItemAtIndex } from '../../dapp/utils';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  Field,
} from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { cloneDeep } from '../utils';
import useFormChain from './useFormChain';
import useStudioHelper from './useStudioHelper';

export default function useCheckNodes() {
  const { field } = useOrderFormStoreV3();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const { getCurrentFieldFromChain } = useFormChain();
  const {
    getAccountAbstractionNodeId,
    getBridgeAppsNodeId,
    getGamingAppsNodeId,
    getBridgeAppsNode,
    getGamingAppsNode,
    getAccountAbstractionNode,
    getNodeAndDappIndex,
    pushEdgeToChainNode,
  } = useStudioHelper();

  const checkAndRemove = (
    id: string,
    newNodes: AppState['nodes'],
    newDraggedDappIndexes: number[],
    newDraggedIds2D: Field[][],
  ) => {
    let somethingChanged = false;
    const { nodeIndex, dappIndexInSignal } = getNodeAndDappIndex(id);
    let nodes = cloneDeep(newNodes);
    let draggedDappIndexes = cloneDeep(newDraggedDappIndexes);
    let draggedIds2D = cloneDeep(newDraggedIds2D);

    if (nodeIndex !== -1) {
      nodes = removeItemAtIndex(nodes, nodeIndex);
      somethingChanged = true;
    }

    if (dappIndexInSignal !== -1) {
      draggedDappIndexes = removeItemAtIndex(
        draggedDappIndexes,
        dappIndexInSignal,
      );
      draggedIds2D = removeItemAtIndex(draggedIds2D, dappIndexInSignal);
      somethingChanged = true;
    }

    return {
      nodes,
      draggedDappIndexes,
      draggedIds2D,
      somethingChanged,
    };
  };

  const checkAndAdd = (
    id: string,
    newNodes: AppState['nodes'],
    newEdges: AppState['edges'],
    newDraggedDappIndexes: number[],
    newDraggedIds2D: Field[][],
  ) => {
    let somethingChanged = false;
    const { nodeIndex, dappIndex, dappIndexInSignal } = getNodeAndDappIndex(id);
    let nodes = cloneDeep(newNodes);
    let edges = cloneDeep(newEdges);
    let draggedDappIndexes = cloneDeep(newDraggedDappIndexes);
    let draggedIds2D = cloneDeep(newDraggedIds2D);

    if (nodeIndex === -1) {
      nodes = pushEdgeToChainNode(nodes, id);

      switch (id) {
        case getAccountAbstractionNodeId():
          const { node: accountAbstractionNode, edge: accountAbstractionEdge } =
            getAccountAbstractionNode({
              x: 950,
              y: 30,
            });
          nodes.push(accountAbstractionNode);
          edges.push(accountAbstractionEdge);
          break;

        case getBridgeAppsNodeId():
          const { node: bridgeAppsNode, edge: bridgeAppsEdge } =
            getBridgeAppsNode({
              x: 600,
              y: 30,
            });
          nodes.push(bridgeAppsNode);
          edges.push(bridgeAppsEdge);
          break;

        case getGamingAppsNodeId():
          const { node: gamingAppsNode, edge: gamingAppsEdge } =
            getGamingAppsNode({
              x: 1500,
              y: 30,
            });
          nodes.push(gamingAppsNode);
          edges.push(gamingAppsEdge);
          break;
      }

      somethingChanged = true;
    }

    if (dappIndexInSignal === -1) {
      draggedDappIndexes.push(dappIndex);
      draggedIds2D.push([]);
      somethingChanged = true;
    }

    return {
      nodes,
      edges,
      draggedDappIndexes,
      draggedIds2D,
      somethingChanged,
    };
  };

  const check = () => {
    const keysNeedToCheck = [
      {
        chainKey: 'wallet',
        nodeId: getAccountAbstractionNodeId(),
      },
      {
        chainKey: 'bridge_apps',
        nodeId: getBridgeAppsNodeId(),
      },
      {
        chainKey: 'gaming_apps',
        nodeId: getGamingAppsNodeId(),
      },
    ];
    let newNodes = cloneDeep(nodes);
    let newEdges = cloneDeep(edges);
    let newDraggedDappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    let newDraggedIds2D = cloneDeep(draggedIds2DSignal.value);
    let somethingChanged = false;

    keysNeedToCheck.forEach(({ chainKey, nodeId }) => {
      if (!getCurrentFieldFromChain(chainKey)) {
        const {
          nodes,
          draggedDappIndexes,
          draggedIds2D,
          somethingChanged: changed,
        } = checkAndRemove(
          nodeId,
          newNodes,
          newDraggedDappIndexes,
          newDraggedIds2D,
        );

        newNodes = nodes;
        newDraggedDappIndexes = draggedDappIndexes;
        newDraggedIds2D = draggedIds2D;

        if (!somethingChanged) somethingChanged = changed;
      } else {
        const {
          nodes,
          edges,
          draggedDappIndexes,
          draggedIds2D,
          somethingChanged: changed,
        } = checkAndAdd(
          nodeId,
          newNodes,
          newEdges,
          newDraggedDappIndexes,
          newDraggedIds2D,
        );

        newNodes = nodes;
        newEdges = edges;
        newDraggedDappIndexes = draggedDappIndexes;
        newDraggedIds2D = draggedIds2D;

        if (!somethingChanged) somethingChanged = changed;
      }
    });

    if (somethingChanged) {
      draggedDappIndexesSignal.value = newDraggedDappIndexes;
      draggedIds2DSignal.value = newDraggedIds2D;
      setNodes(newNodes);
      setEdges(newEdges);
    }

    needReactFlowRenderSignal.value = true;
  };

  useEffect(() => {
    check();
  }, [field]);
}
