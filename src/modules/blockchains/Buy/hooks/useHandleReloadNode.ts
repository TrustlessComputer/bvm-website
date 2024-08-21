import useFlowStore, { AppNode } from '@/modules/blockchains/Buy/stores/useFlowStore';
import LocalStorage from '@/libs/localStorage';
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { STORAGE_KEYS } from '@constants/storage-key';
import { useReactFlow } from '@xyflow/react';
import { draggedDappIndexesSignal, draggedIds2DSignal } from '@/modules/blockchains/Buy/signals/useDragSignal';
import { formDappSignal } from '@/modules/blockchains/Buy/signals/useFormDappsSignal';
import { useSignalEffect } from '@preact/signals-react';
import { usePathname } from 'next/navigation';

function useHandleReloadNode() {
  const { nodes, setNodes, setEdges, edges, onNodesChange } = useFlowStore();
  const [rfInstance, setRfInstance] = useState<any>(null);
  const { setViewport } = useReactFlow();
  const path = usePathname();

  React.useEffect(()=>{
    if(path === '/studio') {
      onSave();
    }
  },[nodes.length]);

  const onRestore = useCallback(async () => {
    const restoreFlow = async () => {
      const flow = LocalStorage.getItem(STORAGE_KEYS.LAST_NODES);
      const signals = LocalStorage.getItem(STORAGE_KEYS.USE_DRAG_SIGNALS) || {};
      const signalsForm = LocalStorage.getItem(STORAGE_KEYS.USE_SIGNALS_FORM) || {};
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        draggedDappIndexesSignal.value = signals.draggedDappIndexesSignal
        draggedIds2DSignal.value = signals.draggedIds2DSignal
        formDappSignal.value = signalsForm.formDappSignal
        await setViewport({ x, y, zoom });
      }
    };

    await restoreFlow();
  }, []);

  useSignalEffect(() => {
    if(Object.keys(formDappSignal.value).length > 0) {
      LocalStorage.setItem(STORAGE_KEYS.USE_SIGNALS_FORM, JSON.stringify({formDappSignal}))
    }
  })

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const signals = {
        draggedDappIndexesSignal,
        draggedIds2DSignal,
        // formDappSignal
      };

      LocalStorage.setItem(STORAGE_KEYS.LAST_NODES, JSON.stringify(flow));
      LocalStorage.setItem(STORAGE_KEYS.USE_DRAG_SIGNALS, JSON.stringify(signals));
      LocalStorage.setItem(STORAGE_KEYS.USE_SIGNALS_FORM, JSON.stringify({formDappSignal}))
    }
  }, [rfInstance]);

  return {
    setRfInstance,
    onRestore,
    rfInstance,
    onSave,
  }
}

export default useHandleReloadNode;
