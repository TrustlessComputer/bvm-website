import ErrorModal from '@/modules/agent-studio/Buy/components3/ErrorModal';
import useTemplate from '@/modules/agent-studio/Buy/hooks/useTemplate';
import useDragStore from '@/modules/agent-studio/Buy/stores/useDragStore';
import s from '@/modules/agent-studio/Buy/styles.module.scss';
import useErrorMessageStore from '../useErrorMessage';

export default function ErrorMessage() {
  const { isShowErrorMessage, toggleErrorMessage } = useErrorMessageStore();
  const setDraggedFields = useDragStore((state) => state.setDraggedFields);
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
