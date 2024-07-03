import TextInput from '@/components/TextInput/TextInput';
import { isEmpty } from 'lodash';
import {
  FormFields,
  FormFieldsErrorMessage,
  NativeTokenPayingGasEnum,
  NetworkEnum,
} from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import ErrorMessage from './ErrorMessage';
import { useBuy } from '../../../providers/Buy.hook';
import { ethers } from 'ethers';
import { Flex, RadioGroup, Stack, Radio, Text } from '@chakra-ui/react';
import Section from './Section';
import { useEffect, useMemo } from 'react';
import orderBy from 'lodash/orderBy';

const TokenPayingGasSection = () => {
  const {
    nativeTokenPayingGasSelected,
    setNativeTokenPayingGasSelected,
    isMainnet,
    availableListData,
    tickerField,
    setTickerField,
    totalSupplyField,
    setTotalSupplyField,
    receivingAddressField,
    setReceivingAddressField,
    isStandardMode,
  } = useBuy();

  const TICKER_ID = FormFields.TICKER;
  const TOTAL_SUPPLY_ID = FormFields.TOTAL_SUPPLY;
  const RECEIVING_ADDRESS_ID = FormFields.RECEIVING_ADDRESS;

  const nativeTokenPayingGas = availableListData?.nativeTokenPayingGas;

  if (!nativeTokenPayingGas) return <></>;

  let dataList: ItemDetail[] = isMainnet
    ? nativeTokenPayingGas[NetworkEnum.Network_Mainnet]
    : nativeTokenPayingGas[NetworkEnum.Network_Testnet];

  dataList = useMemo(() => {
    return orderBy(
      dataList,
      (item) => [
        item.value === NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM,
        item.value === NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC,
        item.value === NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint,
      ],
      ['desc'],
    );
  }, []);

  useEffect(() => {
    if (
      nativeTokenPayingGasSelected ===
      NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC
    ) {
      setTickerField({
        ...tickerField,
        value: 'BTC',
        hasFocused: true,
        hasError: false,
      });
      setTotalSupplyField({
        ...totalSupplyField,
        value: '21000000',
        hasFocused: true,
        hasError: false,
      });
    }

    if (
      nativeTokenPayingGasSelected ===
      NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint
    ) {
      setTickerField({
        ...tickerField,
        value: '',
        hasFocused: true,
        hasError: false,
      });
      setTotalSupplyField({
        ...totalSupplyField,
        value: '',
        hasFocused: true,
        hasError: false,
      });
      setReceivingAddressField({
        ...receivingAddressField,
        value: '',
        hasFocused: true,
        hasError: false,
      });
    }
  }, [nativeTokenPayingGasSelected]);

  const onChangeHandler = async (field: FormFields, e: any) => {
    const text = e.target.value;
    if (field == TICKER_ID) {
      setTickerField({
        ...tickerField,
        value: text,
        hasFocused: true,
        hasError: !!tickerField.isRequired && isEmpty(text),
      });
    }

    if (field == TOTAL_SUPPLY_ID) {
      setTotalSupplyField({
        ...totalSupplyField,
        value: text,
        hasFocused: true,
        hasError: !!totalSupplyField.isRequired && isEmpty(text),
      });
    }

    if (field == RECEIVING_ADDRESS_ID) {
      let isValid = true;
      let errorMessage = undefined;
      if (isEmpty(text)) {
        isValid = false;
        errorMessage = FormFieldsErrorMessage[RECEIVING_ADDRESS_ID];
      } else if (!ethers.utils.isAddress(text)) {
        isValid = false;
        errorMessage = 'Address is invalid.';
      }

      setReceivingAddressField({
        ...receivingAddressField,
        value: text,
        hasFocused: true,
        hasError: !!receivingAddressField.isRequired && !isValid,
        errorMessage: errorMessage,
      });
    }
  };

  const renderBTCExpandView = () => {
    return (
      <Flex gap={'10px'} flexDir={'column'} mt={'10px'}>
        <Flex gap={'3px'} flexDir={'column'} ref={receivingAddressField.ref}>
          <Section
            title={'Receiving address'}
            titleFontSize="16px"
            isRequired
          />
          <TextInput
            placeholder=""
            id={RECEIVING_ADDRESS_ID}
            name={RECEIVING_ADDRESS_ID}
            value={receivingAddressField.value}
            isInvalid={
              receivingAddressField.hasFocused && receivingAddressField.hasError
            }
            onChange={(e: any) => {
              onChangeHandler(RECEIVING_ADDRESS_ID, e);
            }}
            onBlur={(e: any) => {
              onChangeHandler(RECEIVING_ADDRESS_ID, e);
            }}
          />
          {receivingAddressField.hasFocused &&
            receivingAddressField.hasError && (
              <ErrorMessage message={receivingAddressField.errorMessage} />
            )}
        </Flex>
      </Flex>
    );
  };

  const renderCustomNativeTokenExpandView = () => {
    return (
      <Flex gap={'10px'} flexDir={'column'} mt={'10px'}>
        <Flex gap={'3px'} flexDir={'column'} ref={tickerField.ref}>
          <Section title={'Ticker'} titleFontSize="16px" isRequired />
          <TextInput
            placeholder=""
            isInvalid={tickerField.hasFocused && tickerField.hasError}
            id={TICKER_ID}
            name={TICKER_ID}
            value={tickerField.value}
            className={`${
              tickerField.hasFocused && tickerField.hasError ? 'error' : ''
            }`}
            onChange={(e: any) => {
              onChangeHandler(TICKER_ID, e);
            }}
            onBlur={(e: any) => {
              onChangeHandler(TICKER_ID, e);
            }}
          />
          {tickerField.hasFocused && tickerField.hasError && (
            <ErrorMessage message={tickerField.errorMessage} />
          )}
        </Flex>

        <Flex gap={'3px'} flexDir={'column'} ref={totalSupplyField.ref}>
          <Section title={'Total Supply'} titleFontSize="16px" isRequired />
          <TextInput
            placeholder=""
            id={TOTAL_SUPPLY_ID}
            name={TOTAL_SUPPLY_ID}
            value={totalSupplyField.value}
            isInvalid={totalSupplyField.hasFocused && totalSupplyField.hasError}
            onChange={(e: any) => {
              onChangeHandler(TOTAL_SUPPLY_ID, e);
            }}
            onBlur={(e: any) => {
              onChangeHandler(TOTAL_SUPPLY_ID, e);
            }}
            type="number"
          />
          {totalSupplyField.hasFocused && totalSupplyField.hasError && (
            <ErrorMessage message={totalSupplyField.errorMessage} />
          )}{' '}
        </Flex>

        <Flex gap={'3px'} flexDir={'column'} ref={receivingAddressField.ref}>
          <Section
            title={'Receiving address'}
            titleFontSize="16px"
            isRequired
          />
          <TextInput
            placeholder=""
            id={RECEIVING_ADDRESS_ID}
            name={RECEIVING_ADDRESS_ID}
            value={receivingAddressField.value}
            isInvalid={
              receivingAddressField.hasFocused && receivingAddressField.hasError
            }
            onChange={(e: any) => {
              onChangeHandler(RECEIVING_ADDRESS_ID, e);
            }}
            onBlur={(e: any) => {
              onChangeHandler(RECEIVING_ADDRESS_ID, e);
            }}
          />
          {receivingAddressField.hasFocused &&
            receivingAddressField.hasError && (
              <ErrorMessage message={receivingAddressField.errorMessage} />
            )}
        </Flex>
      </Flex>
    );
  };

  return (
    <Section
      title={'Native token for paying transaction gas'}
      description={'Which native token is right for you?'}
      descriptionDetail={undefined}
    >
      <Flex flexDir={'column'}>
        <RadioGroup
          defaultValue={nativeTokenPayingGasSelected?.toString()}
          onChange={(e: any) => {
            setNativeTokenPayingGasSelected(
              Number(e || NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM),
            );
          }}
          value={nativeTokenPayingGasSelected?.toString()}
        >
          <Stack direction="column" gap={'20px'}>
            {dataList.map((item, index) => {
              return (
                <Radio
                  key={`${item.valueStr}-${index}`}
                  value={String(item.value)}
                  borderColor={'#4851fa'}
                >
                  <Text fontSize={'18px'} color={'#000'}>
                    {item.valueStr}
                  </Text>
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>

        {nativeTokenPayingGasSelected ===
          NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC &&
          renderBTCExpandView()}

        {nativeTokenPayingGasSelected ===
          NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint &&
          renderCustomNativeTokenExpandView()}
      </Flex>
    </Section>
  );
};

export default TokenPayingGasSection;
