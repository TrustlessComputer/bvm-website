import BaseModal from '@/components/BaseModal';
import { useFormik } from 'formik';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { formatAmountToClient, formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import styles from './styles.module.scss';
import React, { useContext } from 'react';
import CStakeV2 from '@/contract/stakeV2/stakeV2.class';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { isFetchedStakeUserSelector, stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { STAKE_MAX_DECIMAL } from '@/modules/shard/topMiners/constant';
import { isAmount } from '@utils/number';
import toast from 'react-hot-toast';
import { sleep } from '@toruslabs/base-controllers';
import { requestReload } from '@/stores/states/common/reducer';
import { INakaConnectContext, NakaConnectContext } from '@/Providers/NakaConnectProvider';
import STAKE_TOKEN from '@/contract/stakeV2/configs';

interface IProps {
  show: boolean;
  onHide: () => void;
}

interface IFormValues {
  amount: string;
  balance: string;
}

enum UnstakeStep {
  form,
  confirm,
}

const UnStakeModal = ({ show, onHide }: IProps) => {
  const [step, setStep] = React.useState<UnstakeStep>(UnstakeStep.form);
  const isFetched = useAppSelector(isFetchedStakeUserSelector);
  const stakeUser = useAppSelector(stakeUserSelector);
  const { getConnector } = useContext(NakaConnectContext) as INakaConnectContext;
  const dispatch = useAppDispatch();
  const cStake = new CStakeV2();

  const stakingAmount = React.useMemo(() => {
    return formatAmountToClient(stakeUser?.principleBalance || '0');
  }, [stakeUser?.principleBalance]);

  const onSubmit = async (values: IFormValues) => {
    try {
      const connector = getConnector();
      const calldata = cStake.createUnstakeCallData({
        amount: values.amount,
      });

      await connector.requestSign({
        calldata,
        target: "popup",
        to: STAKE_TOKEN.BVM.stBVM || '',
        functionType: 'Unstake',
        chainType: "NAKA"
      })
      dispatch(requestReload());
      await sleep(2);
      toast.success('Successfully.');
      setStep(UnstakeStep.form);
      onHide();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const validate = (values: IFormValues) => {
    const errors: any = {};
    if (!values.amount || !isAmount(values.amount)) {
      errors.amount = 'Required';
    } else if (new BigNumber(values.amount).gt(stakingAmount)) {
      errors.amount = 'Must be less than staked amount';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: '',
    } as IFormValues,
    onSubmit,
    validate,
  });

  return (
    <BaseModal theme="dark" isShow={show} onHide={onHide} title="Unstake" size="small">
      <form onSubmit={formik.handleSubmit}>
        {step === UnstakeStep.form ? (
          <Flex flexDirection="column" width="100%">
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="white">
                Staked:{' '}
                {isFetched
                  ? formatCurrency(stakingAmount, 0, STAKE_MAX_DECIMAL)
                  : '0'}{' '}
                BVM
              </Text>
              <button
                type="button"
                className={styles.btnMax}
                onClick={() => {
                  formik.setFieldValue('amount', stakingAmount);
                }}
              >
                MAX
              </button>
            </Flex>
            <Input
              id="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              mt="6px"
              placeholder="0.00"
              type="number"
            />
            {!!formik.errors.amount && (
              <p className={styles.error}>{formik.errors.amount}</p>
            )}

            <Text fontSize="16px" opacity={0.7} mt="12px">
              Your staking tokens will be released after 21 days. Do you still
              wish to unstake?
            </Text>
            <Button
              w="100%"
              mt="24px"
              type="button"
              h="44px"
              bg="#ACF8C6"
              color="black"
              borderRadius="100px"
              isLoading={formik.isSubmitting}
              onClick={() => {
                setStep(UnstakeStep.confirm);
              }}
              isDisabled={!!formik.errors.amount || !formik.values.amount}
            >
              Unstake
            </Button>
          </Flex>
        ) : (
          <Flex flexDirection="column">
            <Text fontSize="16px" opacity={0.7} mt="12px">
              You are unstaking {formik.values.amount} $BVM. The unbonding
              period will be 21 days. Are you sure you want to proceed?
            </Text>
            <Button
              w="100%"
              mt="24px"
              type="submit"
              h="44px"
              bg="#ACF8C6"
              color="black"
              borderRadius="100px"
              isLoading={formik.isSubmitting}
              isDisabled={formik.isSubmitting}
            >
              Confirm
            </Button>
          </Flex>
        )}
      </form>
    </BaseModal>
  );
};

export default UnStakeModal;
