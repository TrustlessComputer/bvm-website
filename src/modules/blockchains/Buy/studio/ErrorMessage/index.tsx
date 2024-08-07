import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import ErrorModal from '@/modules/blockchains/Buy/components3/ErrorModal';
import React from 'react';


export default function ErrorMessage(){

  return <div>
    <ErrorModal
      title="Module Reset"
      show={isShowModal}
      onHide={() => {
        setIsShowModal(false);
      }}
    >
      <p className={s.resetDescription}>
        Remove all selected modules and start again.
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
  </div>
}
