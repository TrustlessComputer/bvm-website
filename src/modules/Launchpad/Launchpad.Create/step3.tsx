import HorizontalItem from '@/components/HorizontalItem';

import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import { Box, Button, Divider, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import {
  launchpadSelector,
  setCreatedLaunchpadId,
  setCreateStep,
} from '../store/reducer';
import CLaunchpadAPI from '../services/launchpad';
import { ILaunchpadCreateBody } from '../services/launchpad.interfaces';
import BigNumber from 'bignumber.js';

export const FormCreateLaunchpadStep3 = ({ handleSubmit, submitting }: any) => {
  const dispatch = useDispatch();
  const create_body = useSelector(launchpadSelector).create_body;
  const create_fee_options = useSelector(launchpadSelector).create_fee_options;
  return (
    <form onSubmit={handleSubmit}>
      <HorizontalItem
        label={'Token address'}
        value={create_body.token_address}
      />
      <HorizontalItem label={'Token name'} value={create_body?.token_name} />
      <HorizontalItem
        label={'Token symbol'}
        value={create_body?.token_symbol}
      />
      <HorizontalItem
        label={'Token decimals'}
        value={create_body?.token_decimals}
      />
      <HorizontalItem
        label={'Start time'}
        value={dayjs(create_body.start_date).format('MM/DD/YYYY hh:mm A')}
      />
      <HorizontalItem
        label={'End time'}
        value={dayjs(create_body.end_date).format('MM/DD/YYYY hh:mm A')}
      />
      <Divider />
      <HorizontalItem
        label={'Market cap'}
        value={formatCurrency(create_body.total_supply)}
      />
      <HorizontalItem
        label={'Allocation ticket'}
        value={formatCurrency(create_body.allocation_ticket)}
      />
      <HorizontalItem
        label={'Launchpad price'}
        value={`${formatCurrency(create_body.launchpad_price)} BTC`}
      />
      <HorizontalItem
        label={'Launchpad valuation'}
        value={formatCurrency(create_body.launchpad_valuation)}
      />
      <HorizontalItem
        label={'Price per ticket'}
        value={`${formatCurrency(create_body.price_allocation_ticket)} BTC`}
      />
      <HorizontalItem
        label={'Total ticket'}
        value={formatCurrency(create_body.allocation_ticket)}
      />
      <Divider />
      <HorizontalItem
        label={'Fee option'}
        value={
          create_fee_options.find((v) =>
            compareString(v.id, create_body.launchpad_fee_option_id),
          )?.description
        }
      />
      <Box mt={6} />
      <Flex gap={4} justifyContent={'center'}>
        <Button
          className={s.btnBack}
          onClick={() => dispatch(setCreateStep(1))}
          type="button"
          isDisabled={submitting}
        >
          Back
        </Button>
        <Button isDisabled={submitting} isLoading={submitting} type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

const CreateLaunchpadStep3 = () => {
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const create_body = useSelector(launchpadSelector).create_body;
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const values: ILaunchpadCreateBody = {
        ...create_body,
        allocation_ticket: parseFloat(
          create_body.allocation_ticket as unknown as any,
        ),
        launchpad_fee_option_id: parseFloat(
          create_body.launchpad_fee_option_id as unknown as any,
        ),
        pre_sale_duration: new BigNumber(create_body?.pre_sale_duration || '0')
          .multipliedBy(24)
          .multipliedBy(60)
          .multipliedBy(60)
          .toNumber(),
        public_sale_duration: new BigNumber(
          create_body?.public_sale_duration || '0',
        )
          .multipliedBy(24)
          .multipliedBy(60)
          .multipliedBy(60)
          .toNumber(),
        liquidity_fund_ratio: new BigNumber(
          create_body?.liquidity_fund_ratio || '0',
        )
          .dividedBy(100)
          .toNumber(),
      };
      const rs = await launchpadApi.createLaunchpad(values);

      if (values?.tasks && values?.tasks?.length > 0 && values?.pre_sale) {
        await launchpadApi.postPreLaunchpadTasks(rs.id, values?.tasks);
      }

      dispatch(setCreatedLaunchpadId(rs.id));
      dispatch(setCreateStep(3));
    } catch (error) {
      //
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form initialValues={{}} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <FormCreateLaunchpadStep3
          handleSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </Form>
  );
};

export default CreateLaunchpadStep3;
