import Capture from '@/modules/blockchains/Buy/Capture';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import ErrorModal from '../../components3/ErrorModal';
import useStudioHelper from '../useStudioHelper';

export default function ActionsWorkArea(): ReactElement {
  const { isCapture } = useCaptureStore();
  const { resetEdit } = useStudioHelper();

  const [isShowModal, setIsShowModal] = React.useState(false);

  const resetEditHandler = async () => {
    await resetEdit();
    setIsShowModal(false);
  };

  return (
    <>
      {!isCapture && (
        <div className={s.resetButton}>
          <Capture />
          <div className={`${s.reset2}`} onClick={() => setIsShowModal(true)}>
            <p>RESET</p>
            <div>
              <Image src="/icons/undo.svg" alt="undo" width={20} height={20} />
            </div>
          </div>
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
            onClick={resetEditHandler}
            className={`${s.actions__button} ${s.actions__button__reset}`}
          >
            Reset
          </button>
        </div>
      </ErrorModal>
    </>
  );
}
