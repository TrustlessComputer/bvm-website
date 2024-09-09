import { DappNode } from '@/types/node';
import { MarkerType } from '@xyflow/react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import { FieldKeyPrefix } from '../contants';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  Field,
} from '../signals/useDragSignal';
import useDraggedId2DStore from '../stores/useDraggedId2DStore';
import useDraggingStore from '../stores/useDraggingStore';
import useFlowStore, { AppState } from '../stores/useFlowStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { dappKeyToChainKey } from '../utils';
import useDapps from './useDapps';
import { IModelOption } from '@/types/customize-model';

const useSetDefaultDapp = () => {
  const searchParams = useSearchParams();
  const { categories } = useModelCategoriesStore();
  const { dapps } = useDapps();
  const { setIsDragging } = useDraggingStore();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();

  const { draggedIds2D, setDraggedIds2D } = useDraggedId2DStore();

  const [loaded, setLoaded] = useState<boolean>(false);

  const updateBaseDapp = (dappIndex: number) => {
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

    const positionTo = {
      x: 600,
      y: 30,
    };

    const rootNode = 'blockchain';
    let suffix = thisDapp.title;

    const getHandleNodeBlockChain = nodes.find((item) => item.id === rootNode);
    const isHandleExists = edges.some(
      (handle) => handle.sourceHandle === `${rootNode}-s-${suffix}`,
    );
    let nodesData = nodes;
    console.log('nodes frist', nodesData);

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
      !!thisDapp.baseModuleFields?.length &&
      thisDapp.baseBlock.fields.length === 0
    ) {
      ids.push({
        name: `right-${FieldKeyPrefix.BASE_MODULE}-${thisDapp.baseModuleFields[0].key}`,
        value: thisDapp.baseModuleFields[0].fields[0].value,
        parentNames: [],
        children: [],
      });
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
        baseIndex: 0,
        categoryOption: categoryOption as IModelOption,
        ids,
        targetHandles: [`${newNodeId}-t-${rootNode}`],
        sourceHandles: [],
      },
    };

    draggedDappIndexesSignal.value = [dappIndex];
    draggedIds2DSignal.value = [[]];
    setDraggedIds2D([]);
    console.log('[useSetDefaultDapp] case 1');

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
      },
    ]);
    needReactFlowRenderSignal.value = true;
    console.log('[...nodesData, newNode]', [...nodesData, newNode]);
    console.log('edge', [
      ...edges,
      {
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
      },
    ]);
  };

  React.useEffect(() => {
    if (nodes.length === 0) return;
    if (loaded) return;

    if (!categories || categories.length === 0 || dapps.length <= 2) return;

    const dappKey = searchParams.get('dapp');
    if (!dappKey) return;

    const dappIndex = dapps.findIndex((dapp) => dapp.key === dappKey);
    if (dappIndex === -1) return;

    setLoaded(true);
    updateBaseDapp(dappIndex);
  }, [categories, dapps, loaded, nodes.length]);
};

export default useSetDefaultDapp;
