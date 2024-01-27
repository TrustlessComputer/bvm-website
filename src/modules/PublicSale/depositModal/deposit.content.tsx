import AppLoading from '@/components/AppLoading';
import SvgInset from '@/components/SvgInset';
import { PublicSaleWalletTokenDeposit } from '@/interfaces/vc';
import { getPublicsaleWalletInfo } from '@/services/public-sale';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { userSelector } from '@/stores/states/user/selector';
import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import {
  Box,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import copy from 'copy-to-clipboard';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import DepositContentItem from './deposit.content.item';
import s from './styles.module.scss';

interface IDepositContent {
  amount_usd?: string;
}

const DepositContent: React.FC<IDepositContent> = ({ amount_usd }) => {
  const user = useAppSelector(userSelector);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<PublicSaleWalletTokenDeposit[]>([]);
  const [selectToken, setSelectToken] = useState<
    PublicSaleWalletTokenDeposit | undefined
  >(undefined);

  const coinPrices = useSelector(commonSelector).coinPrices;

  useEffect(() => {
    getTokens();
  }, [user]);

  const getTokens = async () => {
    try {
      const rs = await getPublicsaleWalletInfo();
      if (rs.length > 0 && !selectToken) {
        setSelectToken(rs[0]);
      }
      setTokens(rs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const convertAmountUsdtToToken = useMemo(() => {
    if (
      amount_usd &&
      parseFloat(amount_usd) > 0 &&
      selectToken?.coin &&
      (coinPrices as any)[selectToken.coin]
    ) {
      return new BigNumber(amount_usd)
        .dividedBy((coinPrices as any)[selectToken.coin])
        .toFixed(8);
    }

    if (
      selectToken &&
      (compareString(selectToken.coin, 'USDT') ||
        compareString(selectToken.coin, 'USDC'))
    ) {
      return amount_usd;
    }

    return '0';
  }, [coinPrices, amount_usd, selectToken]);

  if (loading) {
    return (
      <Center>
        <AppLoading />
      </Center>
    );
  }

  return (
    <Center className={s.depositContent}>
      <Text className={s.title}>Deposit</Text>
      <Text className={s.desc}>
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam.
      </Text>
      <Box mt={'20px'} />
      <Menu>
        <MenuButton className={s.btnSelectToken}>
          <DepositContentItem token={selectToken} />
          <SvgInset svgUrl="/icons/ic_arrow_down.svg" />
        </MenuButton>
        <MenuList>
          {tokens.map((t) => (
            <DepositContentItem
              key={t.coin}
              token={t}
              onSelectToken={(_token) => setSelectToken(_token)}
            />
          ))}
        </MenuList>
      </Menu>
      {selectToken && (
        <>
          <Box mt={'24px'} />
          <Flex className={s.qrCodeContainer}>
            <QRCode size={184} value={selectToken?.address} />
          </Flex>
          <Box mt={'24px'} />
          <Flex className={s.wrapTokenDepositDetail}>
            <Flex className={s.wrapTokenDepositDetailItem}>
              <Text className={s.wrapTokenDepositDetailItemTitle}>Network</Text>
              <Text
                style={{
                  textTransform: 'capitalize',
                }}
                className={s.wrapTokenDepositDetailItemValue}
              >
                {selectToken.network.join(', ')}
              </Text>
            </Flex>
            <Flex className={s.wrapTokenDepositDetailItem}>
              <Text className={s.wrapTokenDepositDetailItemTitle}>
                Deposit Address
              </Text>
              <Flex className={s.wrapTokenDepositDetailItemValueAddress}>
                <Text className={s.wrapTokenDepositDetailItemValue}>
                  {selectToken.address}
                </Text>
                <SvgInset
                  onClick={() => {
                    copy(selectToken.address);
                    toast.success('Address copied');
                  }}
                  svgUrl="/icons/ic-copy.svg"
                />
              </Flex>
            </Flex>
          </Flex>
          <Box mt={'12px'} />
          <Text className={s.balanceConvert}>
            ${amount_usd} ={' '}
            {formatCurrency(convertAmountUsdtToToken, 2, 2, 'BTC', true)}{' '}
            {selectToken.coin}
          </Text>
        </>
      )}
    </Center>
  );
};

DepositContent.defaultProps = {
  amount_usd: '100',
};

export default DepositContent;
