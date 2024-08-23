import useFlowStore, { AppNode } from '@/modules/blockchains/Buy/stores/useFlowStore';
import LocalStorage from '@/libs/localStorage';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  restoreLocal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import { formDappSignal } from '@/modules/blockchains/Buy/signals/useFormDappsSignal';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';
import { STORAGE_KEYS } from '@constants/storage-key';
import { useSignalEffect } from '@preact/signals-react';
import { useReactFlow } from '@xyflow/react';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

function useHandleReloadNode() {
  const { nodes, setNodes, setEdges } = useFlowStore();
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [haveOldData, setHaveOldData] = useState(false);
  const { setViewport } = useReactFlow();
  const path = usePathname();
  const { field, setFields } = useOrderFormStoreV3();
  const { draggedFields, setDraggedFields } = useDragStore();

  React.useEffect(() => {
    if (path === '/studio') {
      onSave();
    }
  }, [nodes.length]);

  const onRestore = useCallback(async () => {
    const restoreFlow = async () => {
      const flow = LocalStorage.getItem(STORAGE_KEYS.LAST_NODES);
      const signals = LocalStorage.getItem(STORAGE_KEYS.USE_DRAG_SIGNALS) || {};
      const signalsForm =
        LocalStorage.getItem(STORAGE_KEYS.USE_SIGNALS_FORM) || {};
      const blockchainForm =
        LocalStorage.getItem(STORAGE_KEYS.USE_BLOCKCHAIN_FORM) || {};
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes);
        setEdges(flow.edges);
        draggedDappIndexesSignal.value = signals.draggedDappIndexesSignal;
        draggedIds2DSignal.value = signals.draggedIds2DSignal;
        formDappSignal.value = signalsForm.formDappSignal;

        if (Object.keys(blockchainForm.field).length > 0) {
          setFields(blockchainForm.field);
          setDraggedFields(blockchainForm.draggedFields);
        }
        await setViewport({ x, y, zoom });
      }
      restoreLocal.value = true;
    };

    await restoreFlow();
  }, []);

  useSignalEffect(() => {
    const signalsForm =
      LocalStorage.getItem(STORAGE_KEYS.USE_SIGNALS_FORM) || {};
    if (signalsForm.value) {
      LocalStorage.setItem(
        STORAGE_KEYS.USE_SIGNALS_FORM,
        JSON.stringify({ signalsForm }),
      );
    }
  });

  useSignalEffect(() => {
    if (Object.keys(formDappSignal.value).length > 0) {
      LocalStorage.setItem(
        STORAGE_KEYS.USE_SIGNALS_FORM,
        JSON.stringify({ formDappSignal }),
      );
    }
  });

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const signals = {
        draggedDappIndexesSignal,
        draggedIds2DSignal,
        // formDappSignal
      };

      LocalStorage.setItem(STORAGE_KEYS.LAST_NODES, JSON.stringify(flow));
      LocalStorage.setItem(
        STORAGE_KEYS.USE_DRAG_SIGNALS,
        JSON.stringify(signals),
      );
      LocalStorage.setItem(
        STORAGE_KEYS.USE_SIGNALS_FORM,
        JSON.stringify({ formDappSignal }),
      );
      LocalStorage.setItem(
        STORAGE_KEYS.USE_BLOCKCHAIN_FORM,
        JSON.stringify({ field, draggedFields }),
      );
    }
  }, [rfInstance]);


  return {
    haveOldData,
    setRfInstance,
    onRestore,
    rfInstance,
    onSave
  };
}

export default useHandleReloadNode;
