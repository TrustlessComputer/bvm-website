import React from 'react';
import { IModelOption } from '@/types/customize-model';
import { DappNode } from '@/types/node';
import { MarkerType } from '@xyflow/react';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import { FieldKeyPrefix } from '../contants';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  Field,
} from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';
import useDraggedId2DStore from '../stores/useDraggedId2DStore';
import useFlowStore, { AppState } from '../stores/useFlowStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { dappKeyToChainKey } from '../utils';

const useNodeHelper = () => {
  const { categories } = useModelCategoriesStore();
  const { dapps } = useDappsStore();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const { setDraggedIds2D } = useDraggedId2DStore();

  const [newState, setNewState] = React.useState({
    nodes,
    edges,
  });

  const addDappToNode = (dappIndex: number, position = { x: 600, y: 30 }) => {
    const { x, y } = position;
    const thisDapp = dapps[dappIndex];

    if (!thisDapp) {
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
      return;
    }

    const rootNode = 'blockchain';
    let suffix = thisDapp.title;

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
    const ids: Field[] = [];

    if (
      (thisDapp.baseModuleFields?.length || 0) > 0 &&
      thisDapp.baseBlock.fields.length === 0
    ) {
      ids.push({
        name: `right-${FieldKeyPrefix.BASE_MODULE}-${
          thisDapp.baseModuleFields![0].key
        }`,
        value: thisDapp.baseModuleFields![0].fields[0].value,
        parentNames: [],
        children: [],
      });
    }

    console.log('[useNodeHelper] addDappToNode', {
      dappIndex,
      position,
      thisDapp,
      ids,
    });

    const newNode: DappNode = {
      id: newNodeId,
      type: dappKeyToNodeKey(thisDapp.key),
      dragHandle: '.drag-handle-area',
      position: {
        x,
        y,
      },
      data: {
        node: 'dapp',
        title: thisDapp.title,
        dapp: thisDapp,
        baseIndex: draggedIds2DSignal.value.length - 1,
        categoryOption: categoryOption as IModelOption,
        ids,
        targetHandles: [],
        sourceHandles: [`${newNodeId}-t-${rootNode}`],
      },
    };
    const newEdge = {
      id: `${Math.random()}`,
      source: rootNode,
      sourceHandle: `${rootNode}-s-${suffix}`,
      target: `${newNodeId}`,
      targetHandle: `${newNodeId}-t-${rootNode}`,
      type: 'customEdge',
      label: '',
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
      animated: true,
      style: {
        stroke: '#AAAAAA',
        strokeWidth: 2,
      },
    };

    draggedDappIndexesSignal.value = [
      ...draggedDappIndexesSignal.value,
      dappIndex,
    ];
    draggedIds2DSignal.value = [...draggedIds2DSignal.value, ids];

    setDraggedIds2D([...draggedIds2DSignal.value]);
    setNodes([...newState.nodes, newNode]);
    setEdges([...newState.edges, newEdge]);
    setNewState({
      nodes: [...newState.nodes, newNode],
      edges: [...newState.edges, newEdge],
    });

    console.log('[SocketProvider] addDappToNode', {
      nodes: [...newState.nodes, newNode],
      edges: [...newState.edges, newEdge],
    });

    needReactFlowRenderSignal.value = true;
  };

  return { addDappToNode };
};

export default useNodeHelper;
