import useFlowStore, {
  AppNode,
} from '@/modules/agent-studio/Buy/stores/useFlowStore';
import LocalStorage from '@/libs/localStorage';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  restoreLocal,
} from '@/modules/agent-studio/Buy/signals/useDragSignal';
import { formDappSignal } from '@/modules/agent-studio/Buy/signals/useFormDappsSignal';
import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import useDragStore from '@/modules/agent-studio/Buy/stores/useDragStore';
import { STORAGE_KEYS } from '@constants/storage-key';
import { useSignalEffect } from '@preact/signals-react';
import { useReactFlow } from '@xyflow/react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { needReactFlowRenderSignal } from '@/modules/agent-studio/Buy/studio/ReactFlowRender';
import useFirstLoadTemplateBoxStore from '@/modules/agent-studio/Buy/stores/useFirstLoadTemplateBoxStore';

function useHandleReloadNode() {
  const searchParam = useSearchParams();
  const params = useParams();
  const path = usePathname();
  const { setViewport } = useReactFlow();

  const nodes = useFlowStore((state) => state.nodes);
  const setNodes = useFlowStore((state) => state.setNodes);
  const setEdges = useFlowStore((state) => state.setEdges);

  const isFirstLoadTemplateBox = useFirstLoadTemplateBoxStore(
    (state) => state.isFirstLoadTemplateBox,
  );

  const draggedFields = useDragStore((state) => state.draggedFields);
  const setDraggedFields = useDragStore((state) => state.setDraggedFields);

  const field = useOrderFormStoreV3((state) => state.field);
  const setFields = useOrderFormStoreV3((state) => state.setFields);

  const [rfInstance, setRfInstance] = useState<any>(null);
  const [haveOldData, setHaveOldData] = useState(false);

  const isUpdateFlow = React.useMemo(() => !!params.id, [params.id]);

  React.useEffect(() => {
    if (!isFirstLoadTemplateBox || !restoreLocal.value) return;

    if (!isUpdateFlow) {
      onSave();
    }
  }, [nodes.length, field, isFirstLoadTemplateBox, isUpdateFlow]);

  const onRestore = useCallback(async () => {
    if (isUpdateFlow) return;

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

    // await restoreFlow();
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
    if (isUpdateFlow) return;
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
