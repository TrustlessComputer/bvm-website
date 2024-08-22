import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import LocalStorage from '@/libs/localStorage';
import React, { useCallback, useState } from 'react';
import { STORAGE_KEYS } from '@constants/storage-key';
import { useReactFlow } from '@xyflow/react';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  restoreLocal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import { formAccountAbtractionSignal, formDappSignal } from '@/modules/blockchains/Buy/signals/useFormDappsSignal';
import { useSignalEffect } from '@preact/signals-react';
import { usePathname } from 'next/navigation';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';


function useHandleReloadNode() {
  const { nodes, setNodes, setEdges, edges, onNodesChange } = useFlowStore();
  const [rfInstance, setRfInstance] = useState<any>(null);
  const { setViewport } = useReactFlow();
  const path = usePathname();
  const { dapps } = useDapps();

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
      const aaSignalsForm = LocalStorage.getItem(STORAGE_KEYS.USE_AA_SIGNALS_FORM) || {};
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        draggedDappIndexesSignal.value = signals.draggedDappIndexesSignal
        draggedIds2DSignal.value = signals.draggedIds2DSignal
        formDappSignal.value = signalsForm.formDappSignal
        formAccountAbtractionSignal.value = aaSignalsForm.formAccountAbtractionSignal
        await setViewport({ x, y, zoom });
      }
      restoreLocal.value = true

    };

    // await restoreFlow().then(() => restoreLocal.value = true);

    await restoreFlow()
  }, []);

  React.useEffect(()=>{
    if(path === '/studio') {
      if(dapps.length == 0) return
      onRestore();
    }
  },[rfInstance,dapps.length]);

  useSignalEffect(() => {
    const signalsForm = LocalStorage.getItem(STORAGE_KEYS.USE_SIGNALS_FORM) || {};
    const aaSignalsForm = LocalStorage.getItem(STORAGE_KEYS.USE_AA_SIGNALS_FORM) || {};
    if(signalsForm.value) {
      LocalStorage.setItem(STORAGE_KEYS.USE_SIGNALS_FORM, JSON.stringify({signalsForm}))
    }
    if(aaSignalsForm.value) {
      LocalStorage.setItem(STORAGE_KEYS.USE_AA_SIGNALS_FORM, JSON.stringify({aaSignalsForm}))
    }
  })

  useSignalEffect(() => {
    if(Object.keys(formDappSignal.value).length > 0) {
      LocalStorage.setItem(STORAGE_KEYS.USE_SIGNALS_FORM, JSON.stringify({formDappSignal}))
    }

    // if(Object.keys(formAccountAbtractionSignal.value).length > 0) {
    //   LocalStorage.setItem(STORAGE_KEYS.USE_AA_SIGNALS_FORM, JSON.stringify({formAccountAbtractionSignal}))
    // }
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
      LocalStorage.setItem(STORAGE_KEYS.USE_SIGNALS_FORM, JSON.stringify({ formDappSignal }))
      LocalStorage.setItem(STORAGE_KEYS.USE_AA_SIGNALS_FORM, JSON.stringify({ formAccountAbtractionSignal }))
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
