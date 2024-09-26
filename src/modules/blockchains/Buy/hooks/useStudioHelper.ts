import React from 'react';
import {
  Edge,
  getNodesBounds,
  getViewportForBounds,
  MarkerType,
} from '@xyflow/react';
import { toPng } from 'html-to-image';
import { useParams } from 'next/navigation';

import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { IModelCategory, IModelOption } from '@/types/customize-model';

import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  Field,
  templateIds2DSignal,
} from '../signals/useDragSignal';
import {
  formDappSignal,
  formTemplateDappSignal,
} from '../signals/useFormDappsSignal';
import useDappsStore, { useTemplateFormStore } from '../stores/useDappStore';
import useFlowStore, { AppState } from '../stores/useFlowStore';
import useAvailableListTemplate from '../studio/useAvailableListTemplate';

import useTemplate from './useTemplate';
import { ChainNode, DappNode } from '@/types/node';
import {
  dappKeyToNodeKey,
  nodeKey,
} from '../component4/YourNodes/node.constants';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import {
  accountAbstractionAsADapp,
  bridgesAsADapp,
  gamingAppsAsADapp,
} from '../mockup_3';
import handleStatusEdges from '@/utils/helpers';
import { useAAModule } from '../../detail_v4/hook/useAAModule';
import { useBridgesModule } from '../../detail_v4/hook/useBridgesModule';
import { useGameModule } from '../../detail_v4/hook/useGameModule';
import { removeItemAtIndex } from '../../dapp/utils';
import { cloneDeep } from '../utils';

export default function useStudioHelper() {
  const params = useParams();

  const { dapps } = useDappsStore();
  const { templateDefault } = useAvailableListTemplate();
  const { setTemplate } = useTemplate();
  const { nodes, setNodes, setEdges } = useFlowStore();
  const { order, isAAInstalled } = useChainProvider();
  const { lineBridgeStatus } = useBridgesModule();
  const { lineAAStatus } = useAAModule();
  const { statusMapper } = useGameModule();

  const isUpdateFlow = React.useMemo(() => {
    return !!params?.id;
  }, [params?.id]);

  const getSourceHandleForSourceNode = ({
    source,
    target,
  }: {
    source: string;
    target: string;
  }) => `${target}-s-${source}`;

  const getSourceHandleForTargetNode = ({
    source,
    target,
  }: {
    source: string;
    target: string;
  }) => `${target}-t-${source}`;

  const getChainNodeId = () => 'blockchain';
  const getAccountAbstractionNodeId = () => 'account_abstraction';
  const getBridgeAppsNodeId = () => 'bridge_apps';
  const getGamingAppsNodeId = () => 'gaming_apps';

  const getBasicEdgeInfo = (source: string, target: string) => {
    return {
      id: `${Math.random()}`,
      source,
      sourceHandle: getSourceHandleForSourceNode({
        source,
        target,
      }),
      target,
      targetHandle: getSourceHandleForTargetNode({
        source,
        target,
      }),
      type: 'customEdge',
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
  };

  const getChainNode = (position: { x: number; y: number }): ChainNode => {
    return {
      id: getChainNodeId(),
      type: nodeKey.CHAIN_NODE,
      data: {
        node: 'chain',
        title: 'Blockchain',
        sourceHandles: isUpdateFlow
          ? [
              getSourceHandleForSourceNode({
                source: getChainNodeId(),
                target: getAccountAbstractionNodeId(),
              }),
              getSourceHandleForSourceNode({
                source: getChainNodeId(),
                target: getBridgeAppsNodeId(),
              }),
              getSourceHandleForSourceNode({
                source: getChainNodeId(),
                target: getGamingAppsNodeId(),
              }),
            ]
          : [],
        targetHandles: [],
      },
      dragHandle: '.drag-handle-area',
      position,
    };
  };

  const getAccountAbstractionNode = (position: {
    x: number;
    y: number;
  }): {
    node: DappNode;
    edge: Edge;
  } => {
    const dapp = accountAbstractionAsADapp;
    const node: DappNode = {
      id: getAccountAbstractionNodeId(),
      type: dappKeyToNodeKey(dapp.key),
      dragHandle: '.drag-handle-area',
      position,
      data: {
        node: 'dapp',
        title: dapp.title,
        dapp,
        baseIndex: 0,
        categoryOption: {} as IModelOption,
        ids: [],
        targetHandles: [],
        sourceHandles: [
          getSourceHandleForTargetNode({
            source: getChainNodeId(),
            target: getAccountAbstractionNodeId(),
          }),
        ],
      },
    };
    const newEdge = {
      ...getBasicEdgeInfo(getChainNodeId(), getAccountAbstractionNodeId()),
      label: handleStatusEdges('', lineAAStatus, getAccountAbstractionNodeId())
        .icon,
      animated: handleStatusEdges(
        '',
        lineAAStatus,
        getAccountAbstractionNodeId(),
      ).animate,
    };

    return {
      node,
      edge: newEdge,
    };
  };

  const getBridgeAppsNode = (position: {
    x: number;
    y: number;
  }): {
    node: DappNode;
    edge: Edge;
  } => {
    const dapp = bridgesAsADapp;

    const node: DappNode = {
      id: getBridgeAppsNodeId(),
      type: dappKeyToNodeKey(dapp.key),
      dragHandle: '.drag-handle-area',
      position,
      data: {
        node: 'dapp',
        title: dapp.title,
        dapp,
        baseIndex: 0,
        categoryOption: {} as IModelOption,
        ids: [],
        targetHandles: [],
        sourceHandles: [
          getSourceHandleForTargetNode({
            source: getChainNodeId(),
            target: getBridgeAppsNodeId(),
          }),
        ],
      },
    };
    const newEdge = {
      ...getBasicEdgeInfo(getChainNodeId(), getBridgeAppsNodeId()),
      label: handleStatusEdges('', lineBridgeStatus, getBridgeAppsNodeId())
        .icon,
      animated: handleStatusEdges('', lineBridgeStatus, getBridgeAppsNodeId())
        .animate,
    };

    return {
      node,
      edge: newEdge,
    };
  };

  const getGamingAppsNode = (position: {
    x: number;
    y: number;
  }): {
    node: DappNode;
    edge: Edge;
  } => {
    const dapp = gamingAppsAsADapp;

    const node: DappNode = {
      id: getGamingAppsNodeId(),
      type: dappKeyToNodeKey(dapp.key),
      dragHandle: '.drag-handle-area',
      position,
      data: {
        node: 'dapp',
        title: dapp.title,
        dapp,
        baseIndex: 0,
        categoryOption: {} as IModelOption,
        ids: [],
        targetHandles: [],
        sourceHandles: [
          getSourceHandleForTargetNode({
            source: getChainNodeId(),
            target: getGamingAppsNodeId(),
          }),
        ],
      },
    };

    const newEdge = {
      ...getBasicEdgeInfo(getChainNodeId(), getGamingAppsNodeId()),
      label: handleStatusEdges(
        '',
        statusMapper.statusStr,
        getGamingAppsNodeId(),
      ).icon,
      animated: handleStatusEdges(
        '',
        statusMapper.statusStr,
        getGamingAppsNodeId(),
      ).animate,
    };

    return {
      node,
      edge: newEdge,
    };
  };

  const pushEdgeToChainNode = (nodes: AppState['nodes'], target: string) => {
    const blockchainNode = nodes.find((item) => item.id === getChainNodeId());
    blockchainNode?.data?.sourceHandles?.push(
      `${getChainNodeId()}-s-${target}`,
    );

    return nodes.map((item) =>
      item.id === getChainNodeId() ? blockchainNode : item,
    ) as AppState['nodes'];
  };

  const getNodeAndDappIndex = (id: string) => {
    const nodeIndex = nodes.findIndex((node) => node.id == id);
    const dappIndex = dapps.findIndex((dapp) => dapp.key === id);
    const dappIndexInSignal = draggedDappIndexesSignal.value.findIndex(
      (i) => i === dappIndex,
    );

    return { nodeIndex, dappIndex, dappIndexInSignal };
  };

  const cloneHandler = async (template: IModelCategory[]) => {
    resetEdit();
    setTemplate(template);
  };

  const resetEdit = async () => {
    setNodes([getChainNode({ x: 30, y: 30 })]);

    draggedIds2DSignal.value = [];
    formDappSignal.value = {};

    if (isAAInstalled) {
      draggedDappIndexesSignal.value = [0];
    } else {
      draggedDappIndexesSignal.value = [];
    }

    if (order) {
      setTemplate(order.selectedOptions || []);
    } else {
      setTemplate(templateDefault);
    }
  };

  const clearFlow = () => {
    setNodes([getChainNode({ x: 30, y: 30 })]);
    setEdges([]);

    draggedIds2DSignal.value = [];
    draggedDappIndexesSignal.value = [];
    formDappSignal.value = {};

    needReactFlowRenderSignal.value = true;
  };

  const capture = async (signal: AbortSignal) => {
    const viewportDom = document.querySelector('#viewport');

    if (!viewportDom) return '';
    const imageWidth = viewportDom.clientWidth;
    const imageHeight = viewportDom.clientHeight;

    const nodesBounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0,
    );

    const abortPromise = new Promise((_, reject) => {
      signal.addEventListener('abort', () => {
        reject();
      });
    });

    try {
      const result = await Promise.race([
        toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
          backgroundColor: '#fff',
          width: imageWidth,
          height: imageHeight,
          style: {
            width: `${imageWidth}`,
            height: `${imageHeight}`,
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          },
        }),
        abortPromise,
      ]);

      return result as string;
    } catch (error) {
      return '';
    }
  };

  const getTwitterContent = (url: string) => {
    return `I'm launching my own ZK Rollup on Bitcoin with @BVMnetwork! 🚀

BVM Studio makes blockchain building a breeze with simple drag-and-drop tools. No sweat, just pure innovation. Starting from $99/mo.

Let's transform #Bitcoin beyond money together!
https://bvm.network/studio/${url}`;
  };

  return {
    resetEdit,
    capture,
    cloneHandler,
    getTwitterContent,
    clearFlow,
    isUpdateFlow,
    getChainNode,
    getChainNodeId,
    getAccountAbstractionNode,
    getAccountAbstractionNodeId,
    getBridgeAppsNode,
    getBridgeAppsNodeId,
    getGamingAppsNode,
    getGamingAppsNodeId,
    getNodeAndDappIndex,
    pushEdgeToChainNode,
  };
}
