import HorizontalItem from '@/components/HorizontalItem';

import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import { Box, Button, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import CLaunchpadAPI from '../services/launchpad';
import {
  launchpadSelector,
  setCreatedLaunchpadId,
  setCreateStep,
} from '../store/reducer';
import { ILaunchpad } from '../services/launchpad.interfaces';

const CreateLaunchpadStep4 = () => {
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const created_launchpad_id =
    useSelector(launchpadSelector).created_launchpad_id;
  const create_fee_options = useSelector(launchpadSelector).create_fee_options;
  const [detail, setDetail] = useState<ILaunchpad>();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getDetail();
  }, [created_launchpad_id]);

  const getDetail = async () => {
    if (!created_launchpad_id) {
      return;
    }
    try {
      const rs = await launchpadApi.getDetailLaunchpad(created_launchpad_id);
      setDetail(rs);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    try {
      setSubmitting(true);
    } catch (error) {
      //
    } finally {
      setSubmitting(false);
    }
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

  return (
    <Center
      maxW={'300px'}
      alignSelf={'center'}
      margin={'0 auto'}
      flexDirection={'column'}
    >
      <HorizontalItem
        label={'Amount'}
        value={`${formatCurrency(
          create_fee_options?.find((v) =>
            compareString(v.id, detail.launchpad_fee_option_id),
          )?.bvm_amount,
        )} BVM`}
      />
      <Box mt={2} />
      <HorizontalItem
        label={'Your balance'}
        value={`${formatCurrency(
          create_fee_options?.find((v) =>
            compareString(v.id, detail.launchpad_fee_option_id),
          )?.bvm_amount,
        )} BVM`}
      />
      <Box mt={6} />
      <Flex gap={4} justifyContent={'center'}>
        <Button
          onClick={onSubmit}
          isDisabled={submitting}
          isLoading={submitting}
        >
          Confirm
        </Button>
      </Flex>
    </Center>
  );
};

export default CreateLaunchpadStep4;
