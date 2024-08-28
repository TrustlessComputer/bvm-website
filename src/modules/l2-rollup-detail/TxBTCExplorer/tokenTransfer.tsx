import ListTable, { ColumnProp } from '@/components/ListTable';
import {
  ITxBTC,
  ITxBTCTokenTransfer,
} from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import {
  Avatar,
  Badge,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import groupBy from 'lodash.groupby';
import { useMemo } from 'react';
import s from './styles.module.scss';
import { shortCryptoAddress } from '@/utils/address';
import AddressCopy from './addressCopy';
import { HEART_BEAT } from '@/constants/route-path';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/format';

const TabTokenTransfer = ({ rows = [] }: { rows: ITxBTCTokenTransfer[] }) => {
  const router = useRouter();
  const labelConfig = {
    color: '#000',
    fontSize: '11px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
    textTransform: 'uppercase',
  };

  const columns: ColumnProp[] = useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITxBTCTokenTransfer) {
          let statusColor = 'green';
          return <Badge colorScheme={statusColor}>{data.state}</Badge>;
        },
      },
      {
        id: 'from',
        label: 'From',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITxBTCTokenTransfer) {
          return (
            <AddressCopy
              address={data.from}
              onClick={() => router.push(`${HEART_BEAT}/${data.from}`)}
            />
          );
        },
      },
      {
        id: 'to',
        label: 'To',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITxBTCTokenTransfer) {
          return (
            <AddressCopy
              address={data.to}
              onClick={() => router.push(`${HEART_BEAT}/${data.to}`)}
            />
          );
        },
      },
      {
        id: 'action',
        label: 'Action',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITxBTCTokenTransfer) {
          return <Text>{data.action}</Text>;
        },
      },
      {
        id: 'token',
        label: 'Token',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITxBTCTokenTransfer) {
          return (
            <Flex alignItems={'center'} gap={'8px'}>
              <Avatar
                src={`https://ord.xverse.app/thumbnail/${data.inscription_id}`}
                width={'30px'}
                height={'30px'}
              />
              <Text>{data.symbol}</Text>
            </Flex>
          );
        },
      },
      {
        id: 'inscription_number',
        label: 'Ethscription',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITxBTCTokenTransfer) {
          return <Text>#{data.inscription_number}</Text>;
        },
      },
      {
        id: 'amount',
        label: 'Amount',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: ITxBTCTokenTransfer) {
          return <Text>{formatCurrency(data.amount, 0, 2, 'BTC', true)}</Text>;
        },
      },
    ],
    [],
  );
  return <ListTable data={rows} columns={columns} />;
};

const TokenTransfers = ({ data }: { data: ITxBTC }) => {
  const tokenProtocols = useMemo(
    () => groupBy(data.token_transfer, 'protocol_type'),
    [data.token_transfer],
  );

  return (
    <Tabs className={s.tokenTransferTabContainer}>
      <TabList>
        {Object.keys(tokenProtocols).map((t) => (
          <Tab key={t}>{t.replaceAll('_', ' ')}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {Object.keys(tokenProtocols).map((t) => (
          <TabPanel key={`${t}_panel`}>
            <TabTokenTransfer
              rows={tokenProtocols[t] as unknown as ITxBTCTokenTransfer[]}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TokenTransfers;
