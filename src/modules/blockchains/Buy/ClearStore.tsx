import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from './signals/useDragSignal';
import { formDappSignal } from './signals/useFormDappsSignal';
import useDappsStore from './stores/useDappStore';
import useFlowStore from './stores/useFlowStore';

const ClearStore = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { setNodes, setEdges } = useFlowStore();
  const { setDapps } = useDappsStore();

  const clear = () => {
    setNodes([]);
    setEdges([]);
    setDapps([]);

    draggedDappIndexesSignal.value = [];
    draggedIds2DSignal.value = [];
    formDappSignal.value = {};
  };

  React.useEffect(() => {
    console.log('CLEAR ============');
    clear();
  }, [pathname]);

  return null;
};

export default ClearStore;
