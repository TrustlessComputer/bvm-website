import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { IModelCategory } from '@/types/customize-model';
import useTemplate from './useTemplate';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import { useTemplateFormStore } from '../stores/useDappStore';
import useFlowStore from '../stores/useFlowStore';
import useAvailableListTemplate from '../studio/useAvailableListTemplate';
import l2ServicesAPI from '@/services/api/l2services';
import { toPng } from 'html-to-image';
import { getNodesBounds, getViewportForBounds } from '@xyflow/react';

export default function useStudioHelper() {
  const { templateIndexDefault } = useAvailableListTemplate();
  const { initTemplate, setTemplate } = useTemplate();
  const { nodes, setNodes } = useFlowStore();
  const { templateDapps } = useTemplateFormStore();
  const { order, isAAInstalled } = useChainProvider();

  const cloneHandler = async (template: IModelCategory[]) => {
    resetEdit();
    setTemplate(template);
  };

  const resetEdit = async () => {
    const totalTemplateDapps = templateDapps.length;
    setNodes(nodes.slice(0, totalTemplateDapps + 1 + Number(isAAInstalled)));
    draggedIds2DSignal.value = [];
    if (isAAInstalled) {
      draggedDappIndexesSignal.value = [0];
    } else {
      draggedDappIndexesSignal.value = [];
    }
    formDappSignal.value = {};

    if (order) {
      setTemplate(order.selectedOptions || []);
    } else {
      initTemplate(templateIndexDefault);
    }
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
  };
}
