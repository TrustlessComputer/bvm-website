import useFlowStore, {
  AppNode,
} from '@/modules/blockchains/Buy/stores/useFlowStore';
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
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { needReactFlowRenderSignal } from '@/modules/blockchains/Buy/studio/ReactFlowRender';
import useFirstLoadTemplateBoxStore from '@/modules/blockchains/Buy/stores/useFirstLoadTemplateBoxStore';

function useHandleReloadNode() {
  const searchParam = useSearchParams();
  const { nodes, edges, setNodes, setEdges } = useFlowStore();
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [haveOldData, setHaveOldData] = useState(false);
  const { setViewport } = useReactFlow();
  const path = usePathname();
  const { field, setFields } = useOrderFormStoreV3();
  const { draggedFields, setDraggedFields } = useDragStore();
  const { isFirstLoadTemplateBox } = useFirstLoadTemplateBoxStore();

  React.useEffect(() => {
    if (!isFirstLoadTemplateBox || !restoreLocal.value) return;
    if (path === '/studio') {
      onSave();
    }
  }, [nodes.length, field, isFirstLoadTemplateBox]);

  const onRestore = useCallback(async () => {
    if (path !== '/studio') return;

    const template = searchParam.get('template') || searchParam.get('dapp');
    if (!!template) return;

    console.log('runnnn dapp');
    const restoreFlow = async () => {
      const flow = LocalStorage.getItem(STORAGE_KEYS.LAST_NODES);
      const signals = LocalStorage.getItem(STORAGE_KEYS.USE_DRAG_SIGNALS) || {};
      const signalsForm =
        LocalStorage.getItem(STORAGE_KEYS.USE_SIGNALS_FORM) || {};
      const blockchainForm =
        LocalStorage.getItem(STORAGE_KEYS.USE_BLOCKCHAIN_FORM) || {};
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        formDappSignal.value = signalsForm.formDappSignal;
        draggedDappIndexesSignal.value = signals.draggedDappIndexesSignal;
        draggedIds2DSignal.value = signals.draggedIds2DSignal;

        if (Object.keys(blockchainForm.field).length > 0) {
          setFields(blockchainForm.field);
          setDraggedFields(blockchainForm.draggedFields);
        }

        setNodes(flow.nodes);
        setEdges(flow.edges);
        await setViewport({ x, y, zoom });
        needReactFlowRenderSignal.value = true;
      }
    };

    await restoreFlow();
  }, [searchParam, path]);

  useSignalEffect(() => {
    const restoreLocalSignal = restoreLocal.value;
    if (!isFirstLoadTemplateBox || !restoreLocalSignal) return;
    onSave();

    LocalStorage.setItem(
      STORAGE_KEYS.USE_SIGNALS_FORM,
      JSON.stringify({ formDappSignal }),
    );
    const signals = {
      draggedDappIndexesSignal,
      draggedIds2DSignal,
    };
    LocalStorage.setItem(
      STORAGE_KEYS.USE_DRAG_SIGNALS,
      JSON.stringify(signals),
    );
    console.log('runnnn USE_SIGNALS_FORM end');
  });

  // useSignalEffect(() => {
  //   if(!isFirstLoadTemplateBox || !restoreLocal.value) return;
  //
  //   const signalsForm =
  //     LocalStorage.getItem(STORAGE_KEYS.USE_SIGNALS_FORM) || {};
  //   if (signalsForm.value) {
  //     LocalStorage.setItem(
  //       STORAGE_KEYS.USE_SIGNALS_FORM,
  //       JSON.stringify({ signalsForm }),
  //     );
  //   }
  // });
  //
  // useSignalEffect(() => {
  //   if(!isFirstLoadTemplateBox || !restoreLocal.value) return;
  //
  //   if (Object.keys(formDappSignal.value).length > 0) {
  //     LocalStorage.setItem(
  //       STORAGE_KEYS.USE_SIGNALS_FORM,
  //       JSON.stringify({ formDappSignal }),
  //     );
  //   }
  // });

  const onSave = () => {
    if (!isFirstLoadTemplateBox || !restoreLocal.value) return;

    if (rfInstance) {
      console.log('runnn on save');
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
  };

  React.useEffect(() => {
    setHaveOldData(!!LocalStorage.getItem(STORAGE_KEYS.LAST_NODES));
  }, [rfInstance]);

  return {
    haveOldData,
    setRfInstance,
    onRestore,
    rfInstance,
    onSave,
  };
}

export default useHandleReloadNode;
