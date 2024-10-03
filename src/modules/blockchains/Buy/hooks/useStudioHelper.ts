import React from 'react';
import { getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { useParams } from 'next/navigation';

import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { IModelCategory, IModelOption } from '@/types/customize-model';

import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import useFlowStore from '../stores/useFlowStore';
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

export default function useStudioHelper() {
  const params = useParams();

  const { templateDefault } = useAvailableListTemplate();
  const { setTemplate } = useTemplate();
  const { order, isAAInstalled } = useChainProvider();

  const nodes = useFlowStore((state) => state.nodes);
  const setNodes = useFlowStore((state) => state.setNodes);
  const setEdges = useFlowStore((state) => state.setEdges);

  const isUpdateFlow = React.useMemo(() => {
    return !!params?.id;
  }, [params?.id]);

  const getSourceHandle = ({
    source,
    target,
  }: {
    source: string;
    target: string;
  }) => `${target}-s-${source}`;

  const getChainNodeId = () => 'blockchain';
  const getAccountAbstractionNodeId = () => 'account_abstraction';
  const getBridgeAppsNodeId = () => 'bridge_apps';
  const getGamingAppsNodeId = () => 'gaming_apps';

  const getChainNode = (position: { x: number; y: number }): ChainNode => {
    return {
      id: getChainNodeId(),
      type: nodeKey.CHAIN_NODE,
      data: {
        node: 'chain',
        title: 'Blockchain',
        sourceHandles: isUpdateFlow
          ? [
              `${getChainNodeId()}-s-account_abstraction`,
              `${getChainNodeId()}-s-bridge_apps`,
              `${getChainNodeId()}-s-gaming_apps`,
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
  }): DappNode => {
    const dapp = accountAbstractionAsADapp;

    return {
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
          getSourceHandle({
            source: getChainNodeId(),
            target: getAccountAbstractionNodeId(),
          }),
        ],
      },
    };
  };

  const getBridgeAppsNode = (position: { x: number; y: number }): DappNode => {
    const dapp = bridgesAsADapp;

    return {
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
          getSourceHandle({
            source: getChainNodeId(),
            target: getBridgeAppsNodeId(),
          }),
        ],
      },
    };
  };

  const getGamingAppsNode = (position: { x: number; y: number }): DappNode => {
    const dapp = gamingAppsAsADapp;

    return {
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
          getSourceHandle({
            source: getChainNodeId(),
            target: getGamingAppsNodeId(),
          }),
        ],
      },
    };
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
      const result = await Promise.all([
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

      return result[0] as string;
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
  };
}
