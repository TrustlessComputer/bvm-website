"use client";

import {Spinner} from "@chakra-ui/react";
import cs from "classnames";
import {ethers, Wallet} from "ethers";
import {Formik} from "formik";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {isIOS} from "react-device-detect";
import Input from "./Input";
import s from "./styles.module.scss";

interface IFormValue {
  prvKey: string;
}

interface IProps {
  onGoBack?: () => void;
  onClose?: () => void;
  hideBack?: boolean;
  onSuccess?: (_: any) => void;
}

const ImportPrivateKey = (props: IProps) => {
  const router = useRouter();

  const [isProcess, _setIsProcess] = useState<boolean>(false);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.prvKey) {
      errors.prvKey = "Private key is required.";
    }
    if (values.prvKey) {
      try {
        new ethers.Wallet(values.prvKey).address;
      } catch (e) {
        errors.prvKey = "Invalid private key.";
      }
    }

    return errors;
  };

  const goBack = () => {
    if (props.onGoBack) return props.onGoBack();
    router.back();
  };

  const handleSubmit = async (payload: IFormValue): Promise<void> => {
    // setIsProcess(true);
    try {
      const wallet = new Wallet(payload.prvKey);

      // await onImportPrivateKey({ privateKey: wallet.privateKey });
      // window.location.reload();
      if (props.onClose) props.onClose();
      if (props.onSuccess) {
        return props.onSuccess({wallet});
      }
    } catch (error) {
      //
    }
    // window.location.reload();
    // if (props.onClose) props.onClose();
  };

  return (
    <>
      <div className={cs(s.importPrivateKey, isIOS && s.ios)}>
        {!props.hideBack && (
          <div className={s.header}>
            <button className={s.backBtn} onClick={goBack}>
              <img src="/icons/icon-back.svg" />
              <span>Back</span>
            </button>
          </div>
        )}
        <div className={s.main}>
          <Formik
            key="create-wallet"
            initialValues={{
              pass: "",
              confirm: "",
              prvKey: "",
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form className={s.form} onSubmit={handleSubmit}>
                <Input
                  classContainer={s.input}
                  id="prvKey"
                  type="password"
                  title="Private key"
                  value={values.prvKey}
                  placeholder="Enter your private key"
                  onChange={handleChange}
                  errorMsg={errors.prvKey}
                />
                <button
                  className={s.submitBtn}
                  type="submit"
                  disabled={isProcess}
                >
                  {(isProcess) && (
                    <>
                      <Spinner />
                    </>
                  )}
                  Import
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ImportPrivateKey;
