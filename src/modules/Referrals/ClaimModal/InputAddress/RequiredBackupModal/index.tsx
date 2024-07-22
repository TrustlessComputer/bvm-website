import { closeModal } from '@/stores/states/modal/reducer';
import copy from 'copy-to-clipboard';
import { Formik } from 'formik';
import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import s from './styles.module.scss';
import { showSuccess } from '@components/toast';

interface IFormValue {
  code: string;
}

type Props = {
  privateKey: string;
};

export const BACKUP_KEY_MODAL = "BACKUP_KEY_MODAL";
const RequiredBackupModal = ({ privateKey }: Props) => {
  const dispatch = useDispatch();
  // const wallet = useSelector(walletSelector);

  // const isBackup = useMemo(() => wallet?.isBackup, [wallet?.isBackup]);

  const [isNextStep, setIsNextStep] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [loading, _] = useState(false);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.code) {
      errors.code = "Code is required.";
    }

    if (
      values.code.length === 4 &&
      values.code.toLowerCase() !==
        privateKey.substring(privateKey.length - 4)?.toLowerCase()
    ) {
      errors.code = "Incorrect. Please check and try again.";
    }

    return errors;
  };

  const handleSubmit = async (_: IFormValue): Promise<void> => {
    if (loading) return;
    // dispatch(setIsBackup(true));
    dispatch(closeModal({ id: BACKUP_KEY_MODAL }));
    // window.location.reload();
  };

  const renderStep1 = () => {
    return (
      <>
        <div className={s.block_wrapper}>
          <h5>1. Copy your Private Key</h5>
          <p className={s.description}>
            Copy your Private Key and save it in a place that you trust and only
            you can access.
          </p>
          <div className={s.tips_wrapper}>
            <h6>Tips:</h6>
            <ul>
              <li>Save in a password manager</li>
              <li>Store in a safe deposit box</li>
              <li>Write down and store in multiple secret places</li>
            </ul>

            {/*  */}
          </div>
        </div>
        <button
          className={s.copy_btn}
          onClick={() => {
            if (!privateKey) return;
            copy(privateKey);

            showSuccess({message: 'Copied'});
            setIsNextStep(true);
          }}
        >
          <svg
            className="ic-copy"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.625 21H18.375C20.125 21 21 20.125 21 18.375V9.625C21 7.875 20.125 7 18.375 7H9.625C7.875 7 7 7.875 7 9.625V18.375C7 20.125 7.875 21 9.625 21Z"
              fill="black"
            />
            <path
              d="M3 15.75C2.586 15.75 2.25 15.414 2.25 15V5.625C2.25 3.448 3.448 2.25 5.625 2.25H15C15.414 2.25 15.75 2.586 15.75 3C15.75 3.414 15.414 3.75 15 3.75H5.625C4.293 3.75 3.75 4.293 3.75 5.625V15C3.75 15.414 3.414 15.75 3 15.75Z"
              fill="black"
            />
          </svg>
          Copy Private Key
        </button>
      </>
    );
  };

  const renderStep2 = () => {
    return (
      <>
        <div className={s.block_wrapper}>
          <h5>2. Confirm Private Key</h5>
          <p className={s.description}>
            Enter the last 4 characters of your Private Key.
          </p>
          <div>
            <Formik
              key="cash-out-form"
              initialValues={{
                code: "",
              }}
              validate={validateForm}
              onSubmit={handleSubmit}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => {
                return (
                  <form className={s.form} onSubmit={handleSubmit}>
                    <div className={s.codeInput}>
                      <OTPInput
                        value={values.code}
                        onChange={(v) => {
                          setSubmitError("");
                          setFieldValue("code", v);
                        }}
                        numInputs={4}
                        renderSeparator={<></>}
                        renderInput={(props) => <input {...props} />}
                        placeholder="-"
                        inputType="text"
                        containerStyle={s.codeWrapper}
                      />
                      {!!(errors.code || submitError) && (
                        <div className={s.error}>
                          <p className="error">{errors.code || submitError}</p>
                        </div>
                      )}
                    </div>
                    <button
                      disabled={
                        !!errors.code ||
                        !!submitError ||
                        loading ||
                        values.code.length < 4
                      }
                      // onClick={handleConfirm}
                      type="submit"
                      className={s.confirm_btn}
                    >
                      {loading ? "Processing..." : "Confirm"}
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </>
    );
  };

  // if (isBackup) return <></>;

  return (
    <div className={s.RequiredBackupModal_container}>
      <div className={s.RequiredBackupModal_wrapper}>
        <h3>Secure wallet</h3>
        <div>{!isNextStep ? renderStep1() : renderStep2()}</div>
      </div>
    </div>
  );
};

export default React.memo(RequiredBackupModal);
