import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { IModelCategory } from '@/types/customize-model';
import useTemplate from '../hooks/useTemplate';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import { useTemplateFormStore } from '../stores/useDappStore';
import useFlowStore from '../stores/useFlowStore';
import useAvailableListTemplate from './useAvailableListTemplate';

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

  const capture = async () => {
    //TO DO
  };

  const share = async () => {
    //TO DO
  };

  // console.log('[useStudioHelper] --- ');

  return {
    resetEdit,
    capture,
    share,
    cloneHandler,
  };
}
