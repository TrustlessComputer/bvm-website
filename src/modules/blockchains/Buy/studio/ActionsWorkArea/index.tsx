import Capture from '@/modules/blockchains/Buy/Capture';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import Button from '../../component4/Button';
import ErrorModal from '../../components3/ErrorModal';
import useTemplate from '../../hooks/useTemplate';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../../signals/useDragSignal';
import { formDappSignal } from '../../signals/useFormDappsSignal';
import { useTemplateFormStore } from '../../stores/useDappStore';
import useFlowStore from '../../stores/useFlowStore';

export default function ActionsWorkArea(): ReactElement {
  const { isCapture } = useCaptureStore();
  const [isShowModal, setIsShowModal] = React.useState(false);
  // const { setDraggedFields } = useDragStore();
  const { initTemplate, setTemplate } = useTemplate();
  const { nodes, setNodes } = useFlowStore();
  const { templateDapps } = useTemplateFormStore();
  const { order, isAAInstalled } = useChainProvider();

  const resetEdit = () => {
    const totalTemplateDapps = templateDapps.length;
    setIsShowModal(false);
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
      initTemplate(0);
    }
  };

  return (
    <>
      {!isCapture && (
        <div className={s.resetButton}>
          <Capture />
          <Button onClick={() => setIsShowModal(true)}>
            RESET{' '}
            <Image src="/icons/undo.svg" alt="undo" width={20} height={20} />
          </Button>
        </div>
      )}

      <ErrorModal
        title="Module Reset"
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
      >
        <p className={s.resetDescription}>
          Remove all dragged modules and start again.
        </p>

        <div className={s.actions}>
          <button
            onClick={() => {
              setIsShowModal(false);
            }}
            className={`${s.actions__button} ${s.actions__button__cancel}`}
          >
            Cancel
          </button>
          <button
            onClick={resetEdit}
            className={`${s.actions__button} ${s.actions__button__reset}`}
          >
            Reset
          </button>
        </div>
      </ErrorModal>
    </>
  );
}
