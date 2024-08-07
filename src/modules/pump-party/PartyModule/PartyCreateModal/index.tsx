import BaseModal from '@/components/BaseModal';
import ButtonConnected from '@/components/ButtonConnected/v2';
import ButtonWrapper from '@/components/ButtonWrapper';
import InputWrapper from '@/components/Form/inputWrapper';
import { useAppDispatch } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';

import { Button, Flex, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import s from './styles.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormValues {
  title: string;
  tokenAddress: string;
  tokenTwitter: string;
}

const PartyCreateModal = (props: IProps) => {
  const { isOpen, onClose } = props;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values: IFormValues) => {
    try {
      setLoading(true);
      // const { stakingToken, rewardToken, ratio, apr } = values;
      // const data = await cStakeAPI.createNewStakingPool({
      //   principle_token: stakingToken.contract_address,
      //   reward_token: rewardToken.contract_address,
      //   base_ratio: apr / 100,
      //   token_price: 1 / ratio,
      // });

      // if (data && data.reward_pool_address) {
      //   await cStake.transferToken({
      //     token_address: rewardToken.contract_address,
      //     receiver_address: data.reward_pool_address,
      //     amount: values.rewardAmount,
      //   });
      // }
      // showMessage({
      //   message: 'Create successfully',
      //   status: 'success',
      // });
      dispatch(requestReload());
    } catch (error: any) {
      // showMessage({
      //   message: error?.message || getErrorMessage(error)?.message,
      //   status: 'error',
      // });
    } finally {
      setLoading(false);
    }
  };

  const onValidate = (values: IFormValues) => {
    const errors: Record<string, string> = {};
    if (!values.title) {
      errors.title = 'Required.';
    }
    if (!values.tokenAddress) {
      errors.tokenAddress = 'Required.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {} as any,
    onSubmit,
    validate: onValidate,
  });

  return (
    <BaseModal
      className={s.modalContent}
      icCloseUrl="/icons/ic-close-grey.svg"
      isShow={isOpen}
      onHide={onClose}
    >
      <Flex flexDir="column" alignItems={'center'}>
        <Flex
          className={s.container}
          w={'100%'}
          direction={'column'}
          gap={'40px'}
        >
          <Flex flexDir="column">
            <Text
              textAlign={'center'}
              fontSize={'28px'}
              mt={'12px'}
              mb={'20px'}
              color={'#1b1b1b'}
            >
              Create Pump Party
            </Text>
            <form className={s.form} onSubmit={formik.handleSubmit}>
              <InputWrapper
                className={s.inputWrapper}
                label="Title"
                theme="light"
                error={formik?.touched.title ? formik.errors?.title : ''}
              >
                <input
                  id="title"
                  placeholder="Enter Title"
                  type="number"
                  onChange={(event) => {
                    const value = event.target.value;
                    formik.setFieldValue('title', value || '');
                  }}
                  value={formik.values.title}
                />
              </InputWrapper>

              <InputWrapper
                className={s.inputWrapper}
                label="Pump token address"
                theme="light"
                error={
                  formik?.touched.tokenAddress
                    ? formik.errors?.tokenAddress
                    : ''
                }
              >
                <input
                  id="tokenAddress"
                  placeholder="Eg: 7EcD...tV"
                  type="number"
                  onChange={(event) => {
                    const value = event.target.value;
                    formik.setFieldValue('tokenAddress', value || '');
                  }}
                  value={formik.values.tokenAddress}
                />
              </InputWrapper>

              <InputWrapper
                className={s.inputWrapper}
                label="Pump token twitter"
                theme="light"
                error={
                  formik?.touched.tokenTwitter
                    ? formik.errors?.tokenTwitter
                    : ''
                }
              >
                <input
                  id="tokenTwitter"
                  placeholder="Eg. @pump"
                  type="number"
                  onChange={(event) => {
                    const value = event.target.value;
                    formik.setFieldValue('tokenTwitter', value || '');
                  }}
                  value={formik.values.tokenTwitter}
                />
              </InputWrapper>

              <ButtonWrapper className={s.btnSubmit} buttonType="pump">
                <ButtonConnected title="Sign in">
                  <Button
                    type="submit"
                    isDisabled={formik.isSubmitting || loading}
                    isLoading={formik.isSubmitting || loading}
                  >
                    <Text fontSize="14px">CREATE</Text>
                  </Button>
                </ButtonConnected>
              </ButtonWrapper>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default PartyCreateModal;
