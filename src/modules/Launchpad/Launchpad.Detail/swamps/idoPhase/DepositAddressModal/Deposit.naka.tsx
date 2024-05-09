import { MAX_DECIMAL } from '@/constants/constants';
import CContractBase from '@/contract/base';
import BVM_ADDRESS from '@/contract/stakeV2/configs';
import { isProduction } from '@/utils/commons';
import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import { Box, Button, Flex } from '@chakra-ui/react';
import BigNumberJS from 'bignumber.js';
import { useFormik } from 'formik';
import orderBy from 'lodash/orderBy';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DepositContentItem2 } from './Deposit.Item';
import styles from './styles.module.scss';
import { depositAddressSelector } from '@/stores/states/user/selector';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import TOKEN_ADDRESS from '@/constants/token';
import { WalletTokenDeposit } from '@/modules/Launchpad/services/launchpad.interfaces';
import { commonSelector } from '@/stores/states/common/selector';
import { requestReload } from '@/stores/states/common/reducer';
import { isAmount } from '@/utils/number';

interface IProps {
  btcBalance: string;
  ethBalance: string;
  bvmBalance: string;
  baseSymbol: string;
}

interface ITokenMap {
  symbol: string;
  balance: string;
  address: string;
  coinPrice: string;
}

interface IFormValues {
  amount: string;
}

export const TOKEN_BTC_ADDRESS = isProduction()
  ? TOKEN_ADDRESS.NATIVE_TOKEN_ADDRESS
  : TOKEN_ADDRESS.BTC_ADDRESS_L2;

const DepositFromNaka = ({
  ethBalance,
  btcBalance,
  bvmBalance,
  baseSymbol,
}: IProps) => {
  const wallet = useAuthenticatedWallet();
  const address = wallet?.address;
  const baseContract = new CContractBase();
  const depositAddress = useSelector(depositAddressSelector)(address);
  // const { networkFees, loading } = useTransactionFee({ type: ETypes.transfer });
  const { depositNaka } = React.useMemo(() => {
    return {
      depositNaka: orderBy(
        depositAddress?.depositNaka || [],
        (item: WalletTokenDeposit) => compareString(item.coin, baseSymbol),
        'desc',
      ),
      depositExternal: depositAddress?.depositExternal || [],
    };
  }, [depositAddress]);

  const dispatch = useDispatch();
  const [tokens] = useState<WalletTokenDeposit[]>(depositNaka || []);
  const [selectToken, setSelectToken] = useState<
    WalletTokenDeposit | undefined
  >(depositNaka ? depositNaka[0] : undefined);

  const coinPrices = useSelector(commonSelector).coinPrices;

  const cContract = new CContractBase();

  const tokenMap = React.useMemo<ITokenMap>(() => {
    const tokens: ITokenMap[] = [
      {
        symbol: 'BTC',
        balance: btcBalance,
        address: TOKEN_BTC_ADDRESS,
        coinPrice: (coinPrices as any)?.['BTC'],
      },
      {
        symbol: 'ETH',
        balance: ethBalance,
        address: TOKEN_ADDRESS.ETH_ADDRESS_L2,
        coinPrice: (coinPrices as any)?.['ETH'],
      },
      {
        symbol: 'BVM',
        balance: bvmBalance,
        address: BVM_ADDRESS.BVM.bvm,
        coinPrice: (coinPrices as any)?.['BVM'],
      },
    ];

    return tokens.find(
      (token) => token.symbol === selectToken?.coin,
    ) as ITokenMap;
  }, [selectToken, coinPrices, btcBalance, ethBalance]);

  const onSubmit = async (values: IFormValues) => {
    try {
      // await baseContract.checkNakaGasFee();
    } catch (error) {
      console.log('ERROR', error);
    }
    try {
      // await cContract.transferToken({
      //   amount: values.amount,
      //   tokenAddress: tokenMap.address,
      //   receiver: selectToken?.address || '',
      // });
      // showSuccess({
      //   message: 'Successfully.',
      // });
    } catch (error) {
      console.log(error);
      // const { message } = getErrorMessage(error);
      // showError({ message });
    } finally {
      dispatch(requestReload());
    }
  };
  const onValidate = (values: IFormValues) => {
    const errors: Record<string, string> = {};
    if (!values.amount || !isAmount(values.amount)) {
      errors.amount = 'Required.';
    } else if (new BigNumberJS(values.amount).gt(tokenMap.balance || '0')) {
      errors.amount = 'Insufficient balance.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { amount: '' } as IFormValues,
    onSubmit,
    validate: onValidate,
  });

  return (
    <div className={styles.depositFromNaka}>
      <p className={styles.depositContent_title}>Deposit from Naka wallet</p>
      <Flex className={styles.tokenWrapper} mt="16px">
        {tokens.map((t) => (
          <DepositContentItem2
            key={t.coin}
            token={t}
            onSelectToken={(_token) => setSelectToken(_token)}
            isActive={compareString(t.coin, selectToken?.coin)}
          />
        ))}
      </Flex>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputWrapper_header}>
            <p className={styles.inputWrapper_header_title}>Amount</p>
            <Flex alignItems="center" gap="12px">
              <p className={styles.inputWrapper_header_balance}>
                Balance{' '}
                <span>
                  {formatCurrency(
                    tokenMap.balance,
                    0,
                    MAX_DECIMAL,
                    'BTC',
                    false,
                    1000,
                  )}{' '}
                  {tokenMap.symbol}
                </span>
              </p>
              <Button
                // isDisabled={loading}
                cursor="pointer"
                bg="#10C800"
                borderRadius="100px"
                fontSize="14px"
                color="white"
                width="48px"
                height="24px"
                // isLoading={loading}
                onClick={() => {
                  const isNative = compareString(
                    tokenMap.address,
                    TOKEN_ADDRESS.NATIVE_TOKEN_ADDRESS,
                  );
                  if (isNative) {
                    // if (
                    //   new BigNumberJS(tokenMap.balance)
                    //     .minus(networkFees?.networkFee || 0)
                    //     .lte(0)
                    // ) {
                    //   return;
                    // }
                    // formik.setFieldValue(
                    //   'amount',
                    //   new BigNumberJS(tokenMap.balance)
                    //     .minus(networkFees?.networkFee || 0)
                    //     .toString(),
                    // );
                  } else {
                    formik.setFieldValue('amount', tokenMap.balance);
                  }
                }}
              >
                MAX
              </Button>
            </Flex>
          </div>
          <Flex flexDirection="column" gap="4px" mb="6px">
            <input
              type="number"
              id="amount"
              onChange={(e) => {
                if (e.target.value && new BigNumberJS(e.target.value).lt(0)) {
                  return;
                }
                formik.setFieldValue('amount', e.target.value);
              }}
              value={formik.values.amount}
              placeholder="0.00"
            />
            {!!formik.values.amount && (
              <p className={styles.inputWrapper_usd}>
                $
                {formatCurrency(
                  new BigNumberJS(formik.values.amount || 0)
                    .times(tokenMap.coinPrice)
                    .toFixed(),
                  0,
                  3,
                  'BTC',
                  false,
                )}
              </p>
            )}
          </Flex>
          {formik.errors.amount && formik.touched.amount && (
            <p className={styles.error}>{formik.errors.amount}</p>
          )}
        </div>
        <Button
          type="submit"
          height="52px"
          color="white"
          fontSize="16px"
          width="100%"
          mt="16px"
          isLoading={formik.isSubmitting}
          isDisabled={formik.isSubmitting}
        >
          BUY $GSWP
        </Button>
      </form>
      <Box height="12px" />
      {/*<DepositWarning />*/}
      <div className={styles.line}>
        <div className={styles.dash} />
        <p className={styles.line_text}>OR</p>
        <div className={styles.dash} />
      </div>
    </div>
  );
};

export default DepositFromNaka;
