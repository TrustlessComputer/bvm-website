import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import React, { ReactElement } from 'react';
import Capture from '@/modules/blockchains/Buy/Capture';
import Image from 'next/image';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import Button from '../../component4/Button';
import ErrorModal from '../../components3/ErrorModal';
import useDragStore from '../../stores/useDragStore';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../../signals/useDragSignal';
import { formDappSignal } from '../../signals/useFormDappsSignal';
import useTemplate from '../../hooks/useTemplate';
import useFlowStore from '../../stores/useFlowStore';

export default function ActionsWorkArea(): ReactElement {
  const { isCapture } = useCaptureStore();
  const [isShowModal, setIsShowModal] = React.useState(false);
  const { setDraggedFields } = useDragStore();
  const { initTemplate } = useTemplate();
  const { setNodes } = useFlowStore();

  const resetEdit = () => {
    setDraggedFields([]);
    setIsShowModal(false);
    setNodes([
      {
        id: 'blockchain',
        type: 'chainNode',
        data: {
          label: 'Blockchain',
          status: 'Ready',
          isChain: true,
        },
        dragHandle: '.drag-handle-area',
        position: { x: 30, y: 30 },
      },
    ]);

    draggedDappIndexesSignal.value = [];
    draggedIds2DSignal.value = [];
    formDappSignal.value = {};

    initTemplate(0);
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
