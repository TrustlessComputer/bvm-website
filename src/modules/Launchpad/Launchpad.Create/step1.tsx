import { composeValidators, required } from '@/utils/form-validate';
import { formatCurrency } from '@/utils/format';
import { requiredAmount, validateEVMAddress } from '@/utils/validate';
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, useForm, useFormState } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import CContractBase from '@/contract/base';
import {
  launchpadSelector,
  setCreateBody,
  setCreateStep,
} from '../store/reducer';
import InputWrapper from '@/components/Form/inputWrapper';
import FieldText from '@/components/Form/Field.Text';
import FieldAmount from '@/components/Form/fieldAmount';
import FieldDateTime from '@/components/Form/Field.DateTime';

const FormCreateLaunchpadStep1 = ({ handleSubmit }: any) => {
  const { values } = useFormState();
  const { change } = useForm();
  const contractBase = useRef(new CContractBase()).current;

  const [checkToken, setCheckToken] = useState(false);

  const create_fee_options = useSelector(launchpadSelector).create_fee_options;

  const launchpad_price = values?.launchpad_price || '0';
  const allocation_ticket = values?.allocation_ticket || '0';
  const launchpad_allocation = values?.launchpad_allocation || '0';
  const price_allocation_ticket = values?.price_allocation_ticket || '0';
  const total_launchpad_valuation = values?.total_launchpad_valuation || '0';
  const launchpad_fee_option_id = values?.launchpad_fee_option_id || '1';
  const start_date = values?.start_date;
  const end_date = values?.end_date;
  const token_address = values?.token_address;
  const your_token_balance = values?.your_token_balance;
  const symbol = values?.symbol;

  // const isDisabled = useMemo(() => !symbol, [symbol]);

  // useEffect(() => {
  //   onValidateAddress();
  // }, [token_address]);

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

  const onValidateAddress = async (value: string) => {
    if (!validateEVMAddress(value)) {
      return 'Token address invalid';
    }
    try {
      setCheckToken(true);
      // const rs = await contractBase.getTokenInfo(token_address);
      // change('token_name', rs?.name);
      // change('total_supply', rs?.supply);
      // change('your_token_balance', rs?.balance);
      // change('symbol', rs?.symbol);
      return undefined;
    } catch (error) {
      return 'Token not found';
      //
    } finally {
      setCheckToken(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={6}>
        <Box flex={1}>
          <InputWrapper
            label="Token address"
            rightLabel={
              <Text
                onClick={() =>
                  window.open(
                    'https://newbitcoincity.com/tc?referral=%24%7BreferralCode%7D',
                    '_blank',
                  )
                }
                className={s.btnCreateToken}
              >
                + Create token
              </Text>
            }
          >
            <Field
              placeholder="0x...."
              name="token_address"
              component={FieldText}
              validate={composeValidators(required, onValidateAddress)}
              isDisabled={checkToken}
              inputRight={
                checkToken && (
                  <Flex pr={'12px'}>
                    <Spinner size={'sm'} />
                  </Flex>
                )
              }
            />
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="Token name">
            <Field
              placeholder="Naka"
              name="token_name"
              component={FieldText}
              validate={composeValidators(required)}
            />
          </InputWrapper>
        </Box>
      </Flex>
      <Box mt={2} />
      <Flex gap={6}>
        <Box flex={1}>
          <InputWrapper label="Price (BTC)">
            <Field
              name="launchpad_price"
              component={FieldAmount}
              validate={composeValidators(requiredAmount)}
              decimals={8}
            />
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper
            label="Allocation"
            rightLabel={`Balance: ${formatCurrency(your_token_balance)} ${
              symbol || ''
            }`}
          >
            <Field
              name="launchpad_allocation"
              component={FieldAmount}
              validate={composeValidators(requiredAmount)}
              decimals={8}
            />
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="Total ticket">
            <Field
              name="allocation_ticket"
              component={FieldAmount}
              validate={composeValidators(requiredAmount)}
              decimals={8}
            />
          </InputWrapper>
        </Box>
      </Flex>
      <Box mt={2} />
      <Flex gap={6}>
        <Box flex={1}>
          <InputWrapper label="Price per ticket (BTC)">
            {/* <Field
              name="allocation_ticket"
              component={FieldAmount}
              validate={composeValidators(requiredAmount)}
              isDisabled={true}
            /> */}

            <Flex height={'48px'} alignItems={'center'}>
              <Text fontSize={'20px'}>
                {formatCurrency(price_allocation_ticket, 0, 2, 'BTC', true)}
              </Text>
            </Flex>
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="Total valuation">
            {/* <Field
              placeholder="Total ticket * Price per ticket"
              name="total_launchpad_valuation"
              component={FieldAmount}
              isDisabled={true}
              validate={composeValidators(requiredAmount)}
              decimals={8}
            /> */}
            <Flex height={'48px'} alignItems={'center'}>
              <Text fontSize={'20px'}>
                {formatCurrency(total_launchpad_valuation, 0, 2, 'BTC', true)}
              </Text>
            </Flex>
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="Total supply">
            <Field
              placeholder="21,000,000"
              name="total_supply"
              component={FieldAmount}
              validate={composeValidators(requiredAmount)}
              decimals={8}
            />
          </InputWrapper>
        </Box>
      </Flex>

      <Box mt={6} />
      <Flex gap={6}>
        <Box flex={1}>
          <InputWrapper label="Start date">
            <Field
              name="start_date"
              component={FieldDateTime}
              validate={composeValidators(required)}
              showTimeSelect={true}
              minDate={dayjs().add(3, 'days').format()}
              maxDate={
                end_date
                  ? dayjs().subtract(end_date, 'days').format()
                  : undefined
              }
            />
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="End IDO date">
            <Field
              name="end_ido_date"
              component={FieldDateTime}
              validate={composeValidators(required)}
              showTimeSelect={true}
              minDate={
                start_date
                  ? dayjs(start_date).add(7, 'days').format()
                  : dayjs().add(10, 'days').format()
              }
              maxDate={
                end_date
                  ? dayjs(end_date).add(30, 'days').format()
                  : dayjs().add(30, 'days').format()
              }
            />
          </InputWrapper>
        </Box>
        <Box flex={1}>
          <InputWrapper label="End date">
            <Field
              name="end_date"
              component={FieldDateTime}
              validate={composeValidators(required)}
              showTimeSelect={true}
              minDate={
                start_date
                  ? dayjs(start_date).add(7, 'days').format()
                  : dayjs().add(10, 'days').format()
              }
              maxDate={
                start_date
                  ? dayjs(start_date).add(30, 'days').format()
                  : dayjs().add(30, 'days').format()
              }
            />
          </InputWrapper>
        </Box>
      </Flex>
      <Box mt={6} />
      <InputWrapper label="Fee Options">
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
        <Button type="submit">Next</Button>
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
      }}
    >
      {({ handleSubmit }) => (
        <FormCreateLaunchpadStep1 handleSubmit={handleSubmit} />
      )}
    </Form>
  );
};

export default CreateLaunchpadStep1;
