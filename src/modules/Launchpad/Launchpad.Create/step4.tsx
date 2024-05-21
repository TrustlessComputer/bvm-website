import HorizontalItem from '@/components/HorizontalItem';

import FieldText from '@/components/Form/Field.Text';
import InputWrapper from '@/components/Form/inputWrapper';
import { showSuccess } from '@/components/toast';
import TOKEN_ADDRESS from '@/constants/token';
import CLaunchpad from '@/contract/launchpad';
import CToken from '@/contract/token';
import { requestReload } from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import { composeValidators, required } from '@/utils/form-validate';
import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import { Box, Button, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { formatEther, isAddress } from 'ethers/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Field, Form, useForm, useFormState } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import CLaunchpadAPI from '../services/launchpad';
import {
  clearCreateBody,
  launchpadSelector,
  setCreatedLaunchpadId,
  setCreateStep,
} from '../store/reducer';
import { ELaunchpadStatus } from '../services/launchpad.interfaces';
import { useRouter } from 'next/navigation';

interface IFormCreateLaunchpadStep4 {
  handleSubmit: any;
  submitting: boolean;
}

const validateAddress = (value: string, values: any) => {
  if (!isAddress(value)) {
    return `Token is invalid`;
  }

  if (!values?.saleTokenInfo) {
    return `Token not found`;
  }
  return undefined;
};

const FormCreateLaunchpadStep4 = ({
  handleSubmit,
  submitting,
}: IFormCreateLaunchpadStep4) => {
  const router = useRouter();
  const needReload = useSelector(commonSelector).needReload;
  const Token = useRef(new CToken()).current;
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const created_launchpad_id =
    useSelector(launchpadSelector).created_launchpad_id;
  const create_fee_options = useSelector(launchpadSelector).create_fee_options;
  const { change } = useForm();
  const { values } = useFormState();
  const saleTokenInfo = values?.saleTokenInfo;
  const isApproved = values?.isApproved;
  const detail = values?.detail;
  const amountBVM = values?.amountBVM;
  const isTransferBVMFeeAmount = values?.isTransferBVMFeeAmount;

  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getDetail();
  }, [created_launchpad_id]);

  useEffect(() => {
    checkSaleTokenApprove();
    getBVMToken();
  }, [saleTokenInfo, detail, needReload]);

  const getBVMToken = async () => {
    try {
      if (!detail) {
        return;
      }
      const rs = await Promise.all([
        Token.getTokenBalance(TOKEN_ADDRESS.BVM_TOKEN_ADDRESS),
      ]);

      change('amountBVM', rs[0]);
    } catch (error) {}
  };

  const getDetail = async () => {
    try {
      if (!created_launchpad_id) {
        return;
      }
      const rs = await launchpadApi.getDetailLaunchpad(created_launchpad_id);
      change('detail', rs);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const checkSaleTokenApprove = async () => {
    try {
      if (!saleTokenInfo || !detail?.admin_address) {
        change('isApprove', false);
        return;
      }
      const rs = await Promise.all([
        Token.isNeedApprove({
          token_address: saleTokenInfo?.token_address,
          spender_address: detail?.pool_address as string,
        }),
        Token.getERC20Contract({
          contractAddress: TOKEN_ADDRESS.BVM_TOKEN_ADDRESS,
        }).balanceOf(detail?.admin_address),
      ]);

      change('isApproved', !rs[0]);

      const _transferredBVMFeeAmount = formatEther(rs[1].toString());

      change('transferredBVMFeeAmount', _transferredBVMFeeAmount);
      change(
        'isTransferBVMFeeAmount',
        new BigNumber(_transferredBVMFeeAmount).gte(detail?.fee_bvm_amount),
      );
    } catch (error) {
      change('isApprove', false);
      //
    }
  };

  const isVoting = useMemo(() => {
    return compareString(detail?.status, ELaunchpadStatus.voting);
  }, [detail]);

  const isNew = useMemo(() => {
    return compareString(detail?.status, ELaunchpadStatus.new);
  }, [detail]);

  const onFieldChange = async (value: string) => {
    try {
      if (!isAddress(value)) {
        change('saleTokenInfo', undefined);
        return;
      }
      setChecking(true);
      const rs = await Token.getTokenInfo(value);
      change('saleTokenInfo', rs);
      console.log('rs', rs);
    } catch (error) {
      change('saleTokenInfo', undefined);
      console.log('error', error);
    } finally {
      setChecking(false);
    }
  };

  const renderButton = () => {
    let title = 'Submit Launchpad';

    if (saleTokenInfo) {
      if (!isTransferBVMFeeAmount) {
        title = `Transfer Fee Amount BVM`;
      } else if (!isApproved && saleTokenInfo) {
        title = `Approve ${saleTokenInfo?.symbol}`;
      }
    }

    return (
      <Button
        type="submit"
        isDisabled={submitting || checking}
        isLoading={submitting}
      >
        {title}
      </Button>
    );
  };

  if (loading) {
    return (
      <Center minH={'200px'}>
        <Spinner />
      </Center>
    );
  }

  if (!detail) {
    return (
      <Center flexDirection={'column'} minH={'200px'} gap={'15px'}>
        <Text>Oops..! Some thing went wrong.</Text>
        <Button
          onClick={() => {
            dispatch(setCreatedLaunchpadId(undefined));
            dispatch(setCreateStep(0));
          }}
        >
          Try again
        </Button>
      </Center>
    );
  }

  if (isNew) {
    return (
      <Center flexDirection={'column'} minH={'200px'} gap={'15px'}>
        <Text>This launchpad has submitted. Waiting for voting</Text>
      </Center>
    );
  }

  if (isVoting) {
    return (
      <Center flexDirection={'column'} minH={'200px'} gap={'15px'}>
        <Text>This launchpad is voting</Text>
        <Button
          onClick={() => router.push(`/proposal-dashboard/${detail?.id}`)}
        >
          Go to DAO
        </Button>
      </Center>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper label="Sale token address">
        <Field
          component={FieldText}
          name="saleTokenAddress"
          placeholder="0x123..."
          validate={composeValidators(required, validateAddress)}
          fieldChanged={onFieldChange}
          isDisabled={checking}
        />
      </InputWrapper>
      {saleTokenInfo && (
        <>
          <Flex flexDirection={'column'} gap={'2px'}>
            <HorizontalItem
              label={'Token name'}
              value={`${saleTokenInfo?.name}`}
            />
            <HorizontalItem
              label={'Supply'}
              value={`${formatCurrency(saleTokenInfo?.supply, 0, 2)}`}
            />
            <HorizontalItem
              label={'Balance'}
              value={`${formatCurrency(saleTokenInfo?.balance, 0, 2)}`}
            />
          </Flex>
        </>
      )}
      <Box mt={6} />

      <HorizontalItem
        label={'Fee'}
        value={`${formatCurrency(
          create_fee_options?.find((v) =>
            compareString(v.id, detail.launchpad_fee_option_id),
          )?.bvm_amount,
        )} BVM`}
      />
      <Box mt={2} />
      <HorizontalItem
        label={'Your balance'}
        value={`${formatCurrency(amountBVM)} BVM`}
      />
      <Box mt={6} />

      <Flex gap={4} justifyContent={'center'}>
        {renderButton()}
      </Flex>
    </form>
  );
};

const CreateLaunchpadStep4 = () => {
  const Token = useRef(new CToken()).current;
  const Launchpad = useRef(new CLaunchpad()).current;
  const LaunchpadAPI = useRef(new CLaunchpadAPI()).current;
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (values: any) => {
    try {
      const saleTokenInfo = values?.saleTokenInfo;
      const isTransferBVMFeeAmount = values?.isTransferBVMFeeAmount;
      const isApproved = values?.isApproved;
      const detail = values?.detail;

      setSubmitting(true);

      if (!isTransferBVMFeeAmount) {
        await Launchpad.transferBVMFee({
          amountBVM: detail?.fee_bvm_amount,
          adminAddress: detail?.admin_address,
        });
        showSuccess({
          message: `Transferred Fee Amount: ${formatCurrency(
            detail?.fee_bvm_amount,
          )} $BVM Successfully!`,
        });
      } else if (!isApproved) {
        await Token.approveToken({
          token_address: saleTokenInfo?.token_address,
          spender_address: detail?.pool_address,
        });
        showSuccess({
          message: `Approved $${saleTokenInfo?.symbol} Successfully!`,
        });
      } else {
        const tx = await Launchpad.startLaunchpad({
          saleTokenAddress: saleTokenInfo?.token_address,
          launchPoolAddress: detail?.pool_address,
        });
        await LaunchpadAPI.scanTrxAlpha({ tx_hash: tx.hash });
        showSuccess({
          message: `Submitted Launchpad Successfully!`,
        });
        dispatch(setCreateStep(0));
        dispatch(clearCreateBody());
      }
    } catch (error) {
      console.log('error', error);

      //
    } finally {
      setSubmitting(false);
      dispatch(requestReload());
    }
  };

  return (
    <Center minW={'500px'} flexDirection={'column'}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <FormCreateLaunchpadStep4
            handleSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </Form>
    </Center>
  );
};

export default CreateLaunchpadStep4;
