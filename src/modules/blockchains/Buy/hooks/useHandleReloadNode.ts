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
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';


function useHandleReloadNode() {
  const { nodes, setNodes, setEdges, edges, onNodesChange } = useFlowStore();
  const [rfInstance, setRfInstance] = useState<any>(null);
  const { setViewport } = useReactFlow();
  const path = usePathname();
  const { dapps } = useDapps();
  const { field, setFields } =useOrderFormStoreV3()
  const { draggedFields, setDraggedFields } = useDragStore();

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
      const blockchainForm = LocalStorage.getItem(STORAGE_KEYS.USE_BLOCKCHAIN_FORM) || {};
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        draggedDappIndexesSignal.value = signals.draggedDappIndexesSignal
        draggedIds2DSignal.value = signals.draggedIds2DSignal
        formDappSignal.value = signalsForm.formDappSignal
        formAccountAbtractionSignal.value = aaSignalsForm.formAccountAbtractionSignal
        console.log('useHandleReloadNode', {
          draggedDappIndexesSignal : signals.draggedDappIndexesSignal,
          draggedIds2DSignal : signals.draggedIds2DSignal,
          formDappSignal : signalsForm.formDappSignal,
          formAccountAbtractionSignal : aaSignalsForm.formAccountAbtractionSignal,
          blockchainForm: blockchainForm,
          flow
        });
        if(Object.keys(blockchainForm.field).length > 0) {
          setFields(blockchainForm.field);
          setDraggedFields(blockchainForm.draggedFields);
        }
        await setViewport({ x, y, zoom });
      }
      restoreLocal.value = true
    };

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

    if(Object.keys(formAccountAbtractionSignal.value).length > 0) {
      LocalStorage.setItem(STORAGE_KEYS.USE_AA_SIGNALS_FORM, JSON.stringify({formAccountAbtractionSignal}))
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
      LocalStorage.setItem(STORAGE_KEYS.USE_SIGNALS_FORM, JSON.stringify({ formDappSignal }))
      LocalStorage.setItem(STORAGE_KEYS.USE_AA_SIGNALS_FORM, JSON.stringify({ formAccountAbtractionSignal }))
      LocalStorage.setItem(STORAGE_KEYS.USE_BLOCKCHAIN_FORM, JSON.stringify({ field, draggedFields }))
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
