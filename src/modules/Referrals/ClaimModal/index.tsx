import { getErrorMessage } from '@/utils/errorV2';
import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './styles.module.scss';
import CReferralAPI from 'src/services/api/referrals';
import ButtonConnected from '@/components/ButtonConnected/v2';
import cs from 'classnames';
import { requestReload } from '@/stores/states/common/reducer';
import { showError } from '@components/toast';
import { formatCurrency } from '@utils/format';
import { MIN_DECIMAL } from '@constants/constants';
import { IUserReferralInfo } from '@/interfaces/referral';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import InputAddress from '@/modules/Referrals/ClaimModal/InputAddress';
import { required } from '@utils/form-validate';

interface FormValues {
  address: string;
}

export const ClaimModalID = 'ClaimModalID';

const ClaimModal = ({userRefInfo, onClose}: {userRefInfo?: IUserReferralInfo; onClose?: any}) => {
  const dispatch = useDispatch();
  const userApi = useRef(new CReferralAPI()).current;

  const [submitting, setSubmitting] = useState(false);

  const unClaimReward = useMemo(() => {
    return Number(userRefInfo?.referral_reward_total || '0') - Number(userRefInfo?.referral_reward_claimed || '0');
  }, [userRefInfo]);

  const onSubmit = async (values: FormValues) => {
    if (!values?.address) return;
    try {
      setSubmitting(true);
      const origin = window.location.origin;
      const refUrl = origin + `?r=${userRefInfo?.referral_code}`;
      const content = `I just received $${formatCurrency(unClaimReward, MIN_DECIMAL, MIN_DECIMAL, 'BTC', true)} after trading on @RuneChain_L2\n\nTrade Unlimited Bitcoin Permissionlessly Now\n\n${refUrl}`;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        "_blank"
      );

      await userApi.claimReferralReward(values.address);
      dispatch(requestReload());
      onClose && onClose();
    } catch (error) {
      const { message } = getErrorMessage(error);
      showError({message: message});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Formik onSubmit={onSubmit} initialValues={{ address: '' } as any}>
          {({ handleSubmit, isSubmitting }) => (
            <Form className={s.form} onSubmit={handleSubmit}>
              <InputAddress
                name={"address"}
                label={"NAKA Receiver Address"}
                placeholder={"Input Receiver Address"}
                // fieldChanged={(e: any) => onChangeValue("address", e)}
                validate={required}
                className={s.inputContainer}
              />
              <ButtonConnected className={cs(s.button)}>
                <Button
                  type="submit"
                  isDisabled={isSubmitting || submitting}
                  isLoading={isSubmitting || submitting}
                  loadingText={'Claiming...'}
                  className={s.button}
                >
                  <p className={s.button_text}>
                    Claim
                  </p>
                </Button>
              </ButtonConnected>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default ClaimModal;
