import {
  ITxBTCPutDetail,
  ITxBTCTokenTransfer,
} from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { ITokenTransfer } from '@/services/api/dapp/rollupl2-detail/interface';
import { shortCryptoAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import { Box, Flex, Text } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import s from './styles.module.scss';
import AddressCopy from './addressCopy';
import { useRouter } from 'next/navigation';
import { HEART_BEAT } from '@/constants/route-path';

export const ItemBalanceDetail = ({
  balance,
  token,
}: {
  balance: string;
  token: ITxBTCTokenTransfer;
}) => {
  return (
    <Flex className={s.itemBalanceDetail}>
      <Text>{formatCurrency(balance, 0, 6, 'BTC', true)}</Text>
      <Text as="span">{token?.symbol}</Text>
    </Flex>
  );
};

const ItemTransfer = ({
  data,
  symbol,
  address,
  tokenTransfer,
}: {
  data: ITxBTCPutDetail;
  symbol: string;
  address: string;
  tokenTransfer: ITxBTCTokenTransfer[];
}) => {
  const router = useRouter();
  const token: ITxBTCTokenTransfer = useMemo(
    () =>
      tokenTransfer.find(
        (v) => compareString(address, v.from || v.to) && v.output_index,
      ) as ITxBTCTokenTransfer,
    [tokenTransfer, address],
  );

  return (
    <Flex className={s.itemTransfer} flexDirection={'column'} gap={'8px'}>
      <Flex
        flexDirection={['column', 'row']}
        alignItems={['flex-start', 'center']}
        justifyContent={'space-between'}
      >
        <AddressCopy
          address={address}
          onClick={() => router.push(`${HEART_BEAT}/address/${address}`)}
        />
        <Text className={s.price}>
          {formatCurrency(data.amount, 0, 6)} <Text as="span">{symbol}</Text>
        </Text>
      </Flex>
      {token && (
        <ItemBalanceDetail
          balance={token.amount}
          token={token as unknown as ITxBTCTokenTransfer}
        />
      )}
    </Flex>
  );
};

export default ItemTransfer;
