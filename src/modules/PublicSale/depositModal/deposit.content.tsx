import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useEffect, useMemo, useState } from 'react';
import { BARER_TOKEN_GUEST, SECRET_CODE_GUEST } from '../AuthForBuy/buyAsGuest';
import { getPublicsaleWalletInfo } from '@/services/public-sale';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import AppLoading from '@/components/AppLoading';
import { PublicSaleWalletTokenDeposit } from '@/interfaces/vc';
import s from './styles.module.scss';
import DepositContentItem from './deposit.content.item';
import SvgInset from '@/components/SvgInset';
import QRCode from 'react-qr-code';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';

interface IDepositContent {
  amount_usd?: string;
}

const DepositContent: React.FC<IDepositContent> = ({ amount_usd }) => {
  const user = useAppSelector(userSelector);
  const token = AuthenStorage.getAuthenKey();
  const [loading, setLoading] = useState(true);
  const barerTokenGuest = AuthenStorage.getGuestAuthenKey();
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
      let barerToken = 'Bearer ';
      if (token) {
        barerToken += token;
      } else if (barerTokenGuest) {
        barerToken += barerTokenGuest;
      }
      const headers = {
        Authorization: barerToken,
      };
      const rs = await getPublicsaleWalletInfo(headers);
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
          <Box mt={'12px'} />
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
