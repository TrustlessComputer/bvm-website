import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import ErrorModal from '@/modules/blockchains/Buy/components3/ErrorModal';
import React from 'react';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';
import useTemplate from '@/modules/blockchains/Buy/hooks/useTemplate';
import { useErrorMessage } from '@/modules/blockchains/Buy/studio/useErrorMessage';

export default function ErrorMessage() {
  const { isShowErrorMessage, toggleErrorMessage } = useErrorMessage(
    (state) => state,
  );
  const { setDraggedFields } = useDragStore();
  const { initTemplate } = useTemplate();

  const resetEdit = () => {
    setDraggedFields([]);
    toggleErrorMessage(false);
    initTemplate(0);
  };

  return (
    <div>
      <ErrorModal
        title="Module Reset"
        show={isShowErrorMessage}
        onHide={() => {
          toggleErrorMessage(false);
        }}
      >
        <p className={s.resetDescription}>
          Remove all selected modules and start again.
        </p>

        <div className={s.actions}>
          <button
            onClick={() => {
              toggleErrorMessage(false);
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
    </div>
  );
}
