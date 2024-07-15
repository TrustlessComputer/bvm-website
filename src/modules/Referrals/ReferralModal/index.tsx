import { getErrorMessage } from '@/utils/errorV2';
import { Button } from '@chakra-ui/react';
import { FormikProps, useFormik } from 'formik';
import { debounce, isEmpty } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './styles.module.scss';
import CReferralAPI from 'src/services/api/referrals';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';
import { Wallet } from 'ethers';
import ButtonConnected from '@/components/ButtonConnected';
import cs from 'classnames';
import { requestReload } from '@/stores/states/common/reducer';
import { closeModal } from '@/stores/states/modal/reducer';
import { showError } from '@components/toast';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';

interface FormValues {
  code: string;
}

export const ReferralModalID = 'ReferralModalID';

const ReferralModal = () => {
  
  const dispatch = useDispatch();
  const wallet = useAuthenticatedWallet();
  const addressL2 = wallet?.address;
  const userApi = useRef(new CReferralAPI()).current;

  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isVerifiedCode, setIsVerifiedCode] = useState(false);
  const [isTakenCode, setIsTakenCode] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const nakaConnectContext = useContext(NakaConnectContext);

  const onSubmit = async (values: FormValues) => {
    if (!addressL2 || !wallet) return;
    try {
      setIsCreating(true);

      let _signature = '';
      if(wallet?.privateKey) {
        const _wallet = new Wallet(wallet.privateKey).connect(wallet.provider);
        _signature = await _wallet.signMessage(values.code);
      } else {
        const { signature } = await nakaConnectContext.getConnector().requestSignMessage({
          signMessage: values.code, fromAddress: wallet.address, target: 'popup'
        });
        _signature = signature;
      }

      await userApi.createReferralCode(addressL2, { referral_code: values.code, signature: _signature });
      dispatch(requestReload());
      dispatch(closeModal(ReferralModalID));
    } catch (error) {
      const {message} = getErrorMessage(error);
      showError({message: message});
    } finally {
      setIsCreating(false);
    }
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { code: '' } as FormValues,
    onSubmit,
  });

  const formValues = React.useMemo(() => {
    return formik.values;
  }, [formik.values]);

  useEffect(() => {
    setIsTakenCode(false);
    setIsVerifiedCode(false);
    if (!isEmpty(formik.values.code))
      debounceOnVerifyCode(formik.values.code);
  }, [formik.values.code]);

  const debounceOnVerifyCode = React.useCallback(
    debounce((code: string) => onVerifyCode(code), 700),
    [],
  );

  const onVerifyCode = async (code: string) => {
    try {
      setIsVerifyingCode(true);
      const data = await userApi.checkExitReferralCode({ referral_code: code });
      if (!!data) {
        setIsTakenCode(true);
      } else {
        setIsTakenCode(false);
        setIsVerifiedCode(true);
      }
    } catch (error) {
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const onChangeText = (e: any) => {
    formik.setValues((values) => ({
      ...values,
      code: e.target.value,
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <div className={s.inputContainer}>
            <input
              id="code"
              value={formValues.code}
              placeholder="Enter a code"
              className={s.input}
              onChange={onChangeText}
            />
          </div>
          <ButtonConnected className={cs(s.button)}>
            {isVerifiedCode ?
              <Button
                type="submit"
                isDisabled={formik.isSubmitting || isCreating}
                isLoading={formik.isSubmitting || isCreating}
                loadingText={'Updating...'}
                className={s.button}
              >
                <p className={s.button_text}>
                  UPDATE
                </p>
              </Button>
              :
              <Button
                type="button"
                isDisabled={false}
                isLoading={isVerifyingCode}
                loadingText={'Checking code...'}
                className={s.button}
              >
                <p className={s.button_text}>
                  {isTakenCode ? 'CODE ALREADY TAKEN' : 'ENTER A CODE'}
                </p>
              </Button>
            }
          </ButtonConnected>
        </form>
      </div>
    </div>
  );
};

export default ReferralModal;
