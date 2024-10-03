import React from 'react';
import { getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { IModelCategory } from '@/types/customize-model';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import useFlowStore from '../stores/useFlowStore';
import useAvailableListTemplate from '../studio/useAvailableListTemplate';
import useTemplate from './useTemplate';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import useStudioInfo from './useStudioInfo';
import useNodeHelper from './useNodeHelper';

export default function useStudioHelper() {
  const { templateDefault } = useAvailableListTemplate();
  const { setTemplate } = useTemplate();
  const { order, isAAInstalled } = useChainProvider();

  const nodes = useFlowStore((state) => state.nodes);
  const setNodes = useFlowStore((state) => state.setNodes);
  const setEdges = useFlowStore((state) => state.setEdges);

  const { isUpdateFlow } = useStudioInfo();
  const { getChainNode } = useNodeHelper();

  const defaultChainNode = React.useMemo(() => {
    return getChainNode({ x: 30, y: 30 });
  }, [getChainNode]);

  const cloneHandler = async (template: IModelCategory[]) => {
    resetEdit();
    setTemplate(template);
  };

  const resetEdit = async () => {
    setNodes([defaultChainNode]);

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
    setNodes([defaultChainNode]);
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
  };
}
