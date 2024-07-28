import { useState } from 'react';
import ErrorModal from '../../Buy/components3/ErrorModal';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';
import s from '../styles.module.scss';

const withResetModal =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const resetEditHandler = () => {};

    return (
      <>
        <WrappedComponent {...props} resetEditHandler={resetEditHandler} />
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
              onClick={resetEditHandler}
              className={`${s.actions__button} ${s.actions__button__reset}`}
            >
              Reset
            </button>
          </div>
        </ErrorModal>
      </>
    );
  };

export default withResetModal;
