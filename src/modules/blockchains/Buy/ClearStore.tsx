import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  templateIds2DSignal,
} from './signals/useDragSignal';
import {
  formDappSignal,
  formTemplateDappSignal,
} from './signals/useFormDappsSignal';
import useDappsStore from './stores/useDappStore';
import useFlowStore from './stores/useFlowStore';
import useDragStore from './stores/useDragStore';

const ClearStore = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { setNodes, setEdges } = useFlowStore();
  const { setDapps } = useDappsStore();
  const { setDraggedFields } = useDragStore();

  const clear = () => {
    console.log('[ClearStore] clear');

    setNodes([]);
    setEdges([]);
    setDapps([]);
    setDraggedFields([]);

    templateIds2DSignal.value = [];
    formTemplateDappSignal.value = {};
    formDappSignal.value = {};
    draggedIds2DSignal.value = [];
    draggedDappIndexesSignal.value = [];
  };

  React.useEffect(() => {
    clear();
  }, [pathname]);

  return null;
};

export default ClearStore;
