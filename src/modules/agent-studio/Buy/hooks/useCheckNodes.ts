import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import useFlowStore from '@/modules/agent-studio/Buy/stores/useFlowStore';
import { useAAModule } from '@/modules/agent-studio/detail_v4/hook/useAAModule';
import { DappModel, IModelOption } from '@/types/customize-model';
import { DappNode } from '@/types/node';
import handleStatusEdges from '@utils/helpers';
import { MarkerType } from '@xyflow/react';
import { useEffect } from 'react';
import { removeItemAtIndex } from '../../dapp/utils';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import {
  createAgentGeneralIdeaAsBrainstorm,
  createAgentNftEtherAsBrainstorm,
  createAgentNftOrdinalBTCAsBrainstorm,
  createAgentTokensPumpAsBrainstorm,
} from '../mockup_3';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { cloneDeep } from '../utils';
import useFormChain from './useFormChain';
import useNodeHelper from './useNodeHelper';

export default function useCheckNodes() {
  const field = useOrderFormStoreV3((state) => state.field);

  const nodes = useFlowStore((state) => state.nodes);
  const setNodes = useFlowStore((state) => state.setNodes);
  const edges = useFlowStore((state) => state.edges);
  const setEdges = useFlowStore((state) => state.setEdges);
  const {
    getCreateAgentGeneralIdeaNodeId,
    getCreateAgentOrdinalsBitcoinNodeId,
    getCreateAgentTokensPumpNodeId,
    getCreateAgentNftEtherNodeId,
  } = useNodeHelper();

  const { checkOptionInFieldDragged, getDynamicForm } = useFormChain();
  const { lineAAStatus } = useAAModule();
  const dapps = useDappsStore((state) => state.dapps);

  const getNodeById = (id: string, dapp: DappModel) => {
    const rootNode = 'blockchain';
    const thisDapp = dapp;
    const newNodeId = id;
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
        targetHandles: [],
        sourceHandles: [`${id}-s-${rootNode}`],
      },
    };

    const getHandleNodeBlockChain = nodes.find((item) => item.id === rootNode);
    getHandleNodeBlockChain?.data?.sourceHandles?.push(`${rootNode}-s-${id}`);

    const newEdge = {
      id: `${Math.random()}`,
      source: rootNode,
      sourceHandle: `${rootNode}-s-${id}`,
      target: id,
      targetHandle: `${id}-t-${rootNode}`,
      type: 'customEdge',
      selectable: false,
      selected: false,
      focusable: false,
      label: handleStatusEdges('', lineAAStatus, id).icon,
      animated: handleStatusEdges('', lineAAStatus, id).animate,
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

    return { newNode, newEdge };
  };

  const check = () => {
    const newNodes = [...nodes];
    const newEdges = [...edges];
    const newDraggedDappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    const newDraggedIds2D = cloneDeep(draggedIds2DSignal.value);
    let somethingChanged = false;

    console.log('[useCheckNodes] Case check', {
      dynamicForm: getDynamicForm(),
    });

    const createAgentGeneralIdeaNodeIndex = nodes.findIndex(
      (node) => node.id === getCreateAgentGeneralIdeaNodeId(),
    );
    const createAgentGeneralIdeaDappIndex = dapps.findIndex(
      (dapp) => dapp.key === getCreateAgentGeneralIdeaNodeId(),
    );
    const createAgentGeneralIdeaDappIndexInSignal =
      draggedDappIndexesSignal.value.findIndex(
        (i) => i === createAgentGeneralIdeaDappIndex,
      );
    const isCreateAgentGeneralIdeaInForm = checkOptionInFieldDragged(
      getCreateAgentGeneralIdeaNodeId(),
    );
    const isCreateAgentGeneralIdeaInUI = !!nodes.find(
      (node) => node.id === getCreateAgentGeneralIdeaNodeId(),
    );
    const isCreateAgentGeneralIdeaInSignal =
      draggedDappIndexesSignal.value.includes(createAgentGeneralIdeaDappIndex);

    const createAgentOrdinalsBitcoinNodeIndex = nodes.findIndex(
      (node) => node.id === getCreateAgentOrdinalsBitcoinNodeId(),
    );
    const createAgentOrdinalsBitcoinDappIndex = dapps.findIndex(
      (dapp) => dapp.key === getCreateAgentOrdinalsBitcoinNodeId(),
    );
    const createAgentOrdinalsBitcoinDappIndexInSignal =
      draggedDappIndexesSignal.value.findIndex(
        (i) => i === createAgentOrdinalsBitcoinDappIndex,
      );
    const isCreateAgentOrdinalsBitcoinInForm = checkOptionInFieldDragged(
      getCreateAgentOrdinalsBitcoinNodeId(),
    );
    const isCreateAgentOrdinalsBitcoinInUI = !!nodes.find(
      (node) => node.id === getCreateAgentOrdinalsBitcoinNodeId(),
    );
    const isCreateAgentOrdinalsBitcoinInSignal =
      draggedDappIndexesSignal.value.includes(
        createAgentOrdinalsBitcoinDappIndex,
      );

    const createAgentTokensPumpNodeIndex = nodes.findIndex(
      (node) => node.id === getCreateAgentTokensPumpNodeId(),
    );
    const createAgentTokensPumpDappIndex = dapps.findIndex(
      (dapp) => dapp.key === getCreateAgentTokensPumpNodeId(),
    );
    const createAgentTokensPumpDappIndexInSignal =
      draggedDappIndexesSignal.value.findIndex(
        (i) => i === createAgentTokensPumpDappIndex,
      );
    const isCreateAgentTokensPumpInForm = checkOptionInFieldDragged(
      getCreateAgentTokensPumpNodeId(),
    );
    const isCreateAgentTokensPumpInUI = !!nodes.find(
      (node) => node.id === getCreateAgentTokensPumpNodeId(),
    );
    const isCreateAgentTokensPumpInSignal =
      draggedDappIndexesSignal.value.includes(createAgentTokensPumpDappIndex);

    const createAgentNftEtherNodeIndex = nodes.findIndex(
      (node) => node.id === getCreateAgentNftEtherNodeId(),
    );
    const createAgentNftEtherDappIndex = dapps.findIndex(
      (dapp) => dapp.key === getCreateAgentNftEtherNodeId(),
    );
    const createAgentNftEtherDappIndexInSignal =
      draggedDappIndexesSignal.value.findIndex(
        (i) => i === createAgentNftEtherDappIndex,
      );
    const isCreateAgentNftEtherInForm = checkOptionInFieldDragged(
      getCreateAgentNftEtherNodeId(),
    );
    const isCreateAgentNftEtherInUI = !!nodes.find(
      (node) => node.id === getCreateAgentNftEtherNodeId(),
    );
    const isCreateAgentNftEtherInSignal =
      draggedDappIndexesSignal.value.includes(createAgentNftEtherDappIndex);

    if (!isCreateAgentGeneralIdeaInForm) {
      if (isCreateAgentGeneralIdeaInUI) {
        console.log('[useCheckNodes] Case remove create_agent from UI');
        nodes.splice(createAgentGeneralIdeaNodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, createAgentGeneralIdeaNodeIndex));
      }

      if (isCreateAgentGeneralIdeaInSignal) {
        console.log('[useCheckNodes] Case remove create_agent from signal');
        removeItemAtIndex(
          draggedDappIndexesSignal.value,
          createAgentGeneralIdeaDappIndexInSignal,
        );
        removeItemAtIndex(
          draggedIds2DSignal.value,
          createAgentGeneralIdeaDappIndexInSignal,
        );
      }
    } else {
      if (
        isCreateAgentTokensPumpInSignal ||
        isCreateAgentOrdinalsBitcoinInSignal ||
        isCreateAgentNftEtherInSignal
      )
        return;

      // if (!isCreateAgentGeneralIdeaInUI) {
      //   console.log('[useCheckNodes] Case add create_agent to UI');
      //   const { newNode, newEdge } = getNodeById(
      //     getCreateAgentGeneralIdeaNodeId(),
      //     createAgentGeneralIdeaAsBrainstorm,
      //   );

      //   needReactFlowRenderSignal.value = true;
      //   newNodes.push(newNode);
      //   newEdges.push(newEdge);
      //   somethingChanged = true;
      // }

      if (!isCreateAgentGeneralIdeaInSignal) {
        console.log('[useCheckNodes] Case add create_agent to signal');
        newDraggedDappIndexes.push(createAgentGeneralIdeaDappIndex);
        newDraggedIds2D.push([]);
        somethingChanged = true;
      }
    }

    if (!isCreateAgentOrdinalsBitcoinInForm) {
      if (isCreateAgentOrdinalsBitcoinInUI) {
        console.log('[useCheckNodes] Case remove ordinals_bitcoin from UI');
        nodes.splice(createAgentOrdinalsBitcoinNodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, createAgentOrdinalsBitcoinNodeIndex));
      }

      if (isCreateAgentOrdinalsBitcoinInSignal) {
        console.log('[useCheckNodes] Case remove ordinals_bitcoin from signal');
        removeItemAtIndex(
          draggedDappIndexesSignal.value,
          createAgentOrdinalsBitcoinDappIndexInSignal,
        );
        removeItemAtIndex(
          draggedIds2DSignal.value,
          createAgentOrdinalsBitcoinDappIndexInSignal,
        );
      }
    } else {
      if (
        isCreateAgentTokensPumpInSignal ||
        isCreateAgentGeneralIdeaInSignal ||
        isCreateAgentNftEtherInSignal
      )
        return;

      // if (!isCreateAgentOrdinalsBitcoinInUI) {
      //   console.log('[useCheckNodes] Case add ordinals_bitcoin to UI');
      //   const { newNode, newEdge } = getNodeById(
      //     getCreateAgentOrdinalsBitcoinNodeId(),
      //     createAgentNftOrdinalBTCAsBrainstorm,
      //   );

      //   needReactFlowRenderSignal.value = true;
      //   newNodes.push(newNode);
      //   newEdges.push(newEdge);
      //   somethingChanged = true;
      // }

      if (!isCreateAgentOrdinalsBitcoinInSignal) {
        console.log('[useCheckNodes] Case add ordinals_bitcoin to signal');
        newDraggedDappIndexes.push(createAgentOrdinalsBitcoinDappIndex);
        newDraggedIds2D.push([]);
        somethingChanged = true;
      }
    }

    if (!isCreateAgentTokensPumpInForm) {
      if (isCreateAgentTokensPumpInUI) {
        console.log('[useCheckNodes] Case remove tokens_pump from UI');
        nodes.splice(createAgentTokensPumpNodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, createAgentTokensPumpNodeIndex));
      }

      if (isCreateAgentTokensPumpInSignal) {
        console.log('[useCheckNodes] Case remove tokens_pump from signal');
        removeItemAtIndex(
          draggedDappIndexesSignal.value,
          createAgentTokensPumpDappIndexInSignal,
        );
        removeItemAtIndex(
          draggedIds2DSignal.value,
          createAgentTokensPumpDappIndexInSignal,
        );
      }
    } else {
      if (
        isCreateAgentGeneralIdeaInSignal ||
        isCreateAgentOrdinalsBitcoinInSignal ||
        isCreateAgentNftEtherInSignal
      )
        return;

      // if (!isCreateAgentTokensPumpInUI) {
      //   console.log('[useCheckNodes] Case add tokens_pump to UI');
      //   const { newNode, newEdge } = getNodeById(
      //     getCreateAgentTokensPumpNodeId(),
      //     createAgentTokensPumpAsBrainstorm,
      //   );

      //   needReactFlowRenderSignal.value = true;
      //   newNodes.push(newNode);
      //   newEdges.push(newEdge);
      //   somethingChanged = true;
      // }

      if (!isCreateAgentTokensPumpInSignal) {
        console.log('[useCheckNodes] Case add tokens_pump to signal');
        newDraggedDappIndexes.push(createAgentTokensPumpDappIndex);
        newDraggedIds2D.push([]);
        somethingChanged = true;
      }
    }

    if (!isCreateAgentNftEtherInForm) {
      if (isCreateAgentNftEtherInUI) {
        console.log('[useCheckNodes] Case remove nft_ether from UI');
        nodes.splice(createAgentNftEtherNodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, createAgentNftEtherNodeIndex));
      }

      if (isCreateAgentNftEtherInSignal) {
        console.log('[useCheckNodes] Case remove nft_ether from signal');
        removeItemAtIndex(
          draggedDappIndexesSignal.value,
          createAgentNftEtherDappIndexInSignal,
        );
        removeItemAtIndex(
          draggedIds2DSignal.value,
          createAgentNftEtherDappIndexInSignal,
        );
      }
    } else {
      if (
        isCreateAgentGeneralIdeaInSignal ||
        isCreateAgentOrdinalsBitcoinInSignal ||
        isCreateAgentTokensPumpInSignal
      )
        return;

      // if (!isCreateAgentNftEtherInUI) {
      //   console.log('[useCheckNodes] Case add nft_ether to UI');
      //   const { newNode, newEdge } = getNodeById(
      //     getCreateAgentNftEtherNodeId(),
      //     createAgentNftEtherAsBrainstorm,
      //   );

      //   needReactFlowRenderSignal.value = true;
      //   newNodes.push(newNode);
      //   newEdges.push(newEdge);
      //   somethingChanged = true;
      // }

      if (!isCreateAgentNftEtherInSignal) {
        console.log('[useCheckNodes] Case add nft_ether to signal');
        newDraggedDappIndexes.push(createAgentNftEtherDappIndex);
        newDraggedIds2D.push([]);
        somethingChanged = true;
      }
    }

    if (somethingChanged) {
      needReactFlowRenderSignal.value = true;
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
