import FieldText from '@/components/Form/Field.Text';
import FieldAmount from '@/components/Form/fieldAmount.Formik';
import InputWrapper from '@/components/Form/inputWrapper';
import { composeValidators, required } from '@/utils/form-validate';
import { formatCurrency } from '@/utils/format';
import { requiredAmount } from '@/utils/validate';
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { Field, Form, useForm, useFormState } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  launchpadSelector,
  setCreateBody,
  setCreateStep,
} from '../store/reducer';
import SetupPreLaunch from './SetupPreLaunch';

const FormCreateLaunchpadStep1 = ({ handleSubmit }: any) => {
  const { values } = useFormState();
  const { change } = useForm();

  const create_fee_options = useSelector(launchpadSelector).create_fee_options;

  const launchpad_price = values?.launchpad_price || '0';
  const allocation_ticket = values?.allocation_ticket || '0';
  const launchpad_allocation = values?.launchpad_allocation || '0';
  const price_allocation_ticket = values?.price_allocation_ticket || '0';
  const launchpad_fee_option_id = values?.launchpad_fee_option_id || '1';
  const public_sale_allocation = values?.public_sale_allocation;
  const liquidity_fund_ratio = values?.liquidity_fund_ratio;
  const liquidity_allocation = values?.liquidity_allocation;
  const airdrop_ratio = values?.airdrop_ratio;
  const airdrop = values?.airdrop;

  const isDisabled = useMemo(() => false, []);

  useEffect(() => {
    //Price per ticket la = Allocation / Total ticket * Price
    if (launchpad_price && allocation_ticket && launchpad_allocation) {
      const value = new BigNumber(allocation_ticket)
        .dividedBy(
          new BigNumber(launchpad_allocation).multipliedBy(launchpad_price),
        )
        .toString();
      change('price_allocation_ticket', value);
    }
  }, [launchpad_price, allocation_ticket, launchpad_allocation]);

  useEffect(() => {
    if (allocation_ticket && price_allocation_ticket) {
      const value = new BigNumber(allocation_ticket)
        .multipliedBy(price_allocation_ticket)
        .toString();
      change('total_launchpad_valuation', value);
    }
  }, [price_allocation_ticket, allocation_ticket]);

  useEffect(() => {
    if (liquidity_fund_ratio && public_sale_allocation) {
      const value = new BigNumber(liquidity_fund_ratio)
        .multipliedBy(public_sale_allocation)
        .dividedBy(100)
        .toString();
      change('liquidity_allocation', value);
    }
  }, [liquidity_fund_ratio, public_sale_allocation]);

  useEffect(() => {
    if (liquidity_fund_ratio && airdrop_ratio) {
      const value = new BigNumber(public_sale_allocation)
        .multipliedBy(airdrop_ratio)
        .dividedBy(100)
        .toString();
      change('airdrop', value);
    }
  }, [airdrop_ratio, public_sale_allocation]);

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid columns={3} gap={'12px'}>
        <InputWrapper label="Token name">
          <Field
            placeholder="Bitcoin Virtual Network"
            name="name"
            component={FieldText}
            validate={composeValidators(required)}
          />
        </InputWrapper>
        <InputWrapper label="Token symbol">
          <Field
            placeholder="BVM"
            name="token_name"
            component={FieldText}
            validate={composeValidators(required)}
          />
        </InputWrapper>
        <InputWrapper label="Total supply">
          <Field
            placeholder="21,000,000"
            name="total_supply"
            component={FieldAmount}
            validate={composeValidators(requiredAmount)}
            decimals={0}
          />
        </InputWrapper>
        <InputWrapper label="Hardcap (USDT)">
          <Field
            name="hard_cap"
            component={FieldAmount}
            validate={composeValidators(requiredAmount)}
          />
        </InputWrapper>
        <InputWrapper label="Total Tokens for Presale">
          <Field
            name="public_sale_allocation"
            component={FieldAmount}
            validate={composeValidators(requiredAmount)}
            decimals={0}
          />
        </InputWrapper>
        <InputWrapper
          label="Liquidity Percentage (%)"
          rightLabel={`Total Tokens for Liquidity: ${formatCurrency(
            liquidity_allocation,
            0,
            2,
            'BTC',
            true,
          )}`}
        >
          <Field
            placeholder="30%"
            name="liquidity_fund_ratio"
            component={FieldAmount}
            validate={composeValidators(requiredAmount)}
            decimals={0}
          />
        </InputWrapper>
        {/* <InputWrapper label="Total Tokens for Liquidity">
          <Flex height={'48px'} alignItems={'center'}>
            <Text fontSize={'20px'}>
              {formatCurrency(liquidity_allocation, 0, 2, 'BTC', true)}
            </Text>
          </Flex>
        </InputWrapper> */}
        <InputWrapper label="Public sale duration (days)">
          <Field
            name="public_sale_duration"
            component={FieldAmount}
            validate={composeValidators(required)}
            decimals={2}
          />
        </InputWrapper>
        <InputWrapper
          label="Airdrop"
          desc="The percentage of airdrop to Shard holder (stake BVM)"
          rightLabel={`Total Tokens for Airdrop: ${formatCurrency(
            airdrop,
            0,
            2,
            'BTC',
            true,
          )}`}
        >
          <Field
            placeholder="3%"
            name="airdrop_ratio"
            component={FieldAmount}
            validate={composeValidators(requiredAmount)}
            decimals={2}
          />
        </InputWrapper>
        {/* <InputWrapper label="Total Tokens for Airdrop">
          <Flex height={'48px'} alignItems={'center'}>
            <Text fontSize={'20px'}>
              {formatCurrency(airdrop, 0, 2, 'BTC', true)}
            </Text>
          </Flex>
        </InputWrapper> */}
      </SimpleGrid>

      <Box mt={6} />
      <SetupPreLaunch />
      <Box mt={6} />
      <InputWrapper label="Fee">
        <RadioGroup
          onChange={(e) => change('launchpad_fee_option_id', e)}
          defaultValue={launchpad_fee_option_id}
        >
          <Stack>
            {create_fee_options.map((c) => (
              <Radio key={c.id} value={c.id?.toString()}>
                {c.description}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </InputWrapper>
      <Box mt={6} />
      <Flex justifyContent={'center'}>
        <Button isDisabled={isDisabled} type="submit">
          Next
        </Button>
      </Flex>
    </form>
  );
};

const CreateLaunchpadStep1 = () => {
  const dispatch = useDispatch();
  const create_fee_options = useSelector(launchpadSelector).create_fee_options;
  const step_values = useSelector(launchpadSelector).create_body;

  const onSubmit = (values: any) => {
    try {
      dispatch(setCreateBody(values));
      dispatch(setCreateStep(1));
    } catch (error) {
      //
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        launchpad_fee_option_id:
          step_values.launchpad_fee_option_id || create_fee_options[0]?.id,
        launchpad_price: step_values.launchpad_price,
        allocation_ticket: step_values.allocation_ticket,
        launchpad_allocation: step_values.launchpad_allocation,
        price_allocation_ticket: step_values.price_allocation_ticket,
        total_launchpad_valuation: step_values.total_launchpad_valuation,
        token_name: step_values.token_name,
        token_address: step_values.token_address,
        total_supply: step_values.total_supply,
        start_date: step_values.start_date,
        end_ido_date: step_values.end_ido_date,
        end_date: step_values.end_date,
        pre_sale: step_values.pre_sale,
        name: step_values.name,
        hard_cap: step_values.hard_cap,
        public_sale_allocation: step_values.public_sale_allocation,
        liquidity_fund_ratio: step_values.liquidity_fund_ratio,
        airdrop_ratio: step_values.airdrop_ratio,
        public_sale_duration: step_values.public_sale_duration,
        pre_sale_duration: step_values.pre_sale_duration,
      }}
    >
      {({ handleSubmit }) => (
        <FormCreateLaunchpadStep1 handleSubmit={handleSubmit} />
      )}
    </Form>
  );
};

export default CreateLaunchpadStep1;
