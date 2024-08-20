import BaseModal from '@/components/BaseModal';
import s from './styles.module.scss';
import { Text, Flex, Box } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import AppLoading from '@/components/AppLoading';
import ListTable, { ColumnProp } from '@/components/ListTable';
import { ellipsisCenter, formatToHumanAmount } from '@/utils/format';
import createAxiosInstance from '@/services/http-client';
import { isMobile } from 'react-device-detect';
import uniqBy from 'lodash/uniqBy';

export interface IBitcoinRent {
  id: string;
  created_at: string;
  updated_at: string;
  tc_address: string;
  nonce: number;
  tc_tx_id: string;
  tc_tx_fee: number;
  tcTxSize: number;
  btc_tx_id: string;
  btc_tx_fee_rate: number;
  btcTxFee: number;
  blockTime: string;
  blockNumber: number;
}

const apiClient = createAxiosInstance({
  baseURL: 'https://raas.bvm.network/api/',
});

const BitcoinRentModal = ({ title, chain_id, isShow, onHide }: any) => {
  const [txs, setTxs] = useState<IBitcoinRent[]>([]);

  const [isFetching, setIsFetching] = useState(true);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 100,
  });

  useEffect(() => {
    fetchData(true);
  }, [chain_id]);

  const fetchData = async (isNew?: boolean) => {
    try {
      if (isNew) {
        const res = (await apiClient.get(
          `service/rollup-txs?chainID=${chain_id}&page=1&limit=${refParams.current.limit}`,
        )) as any;
        refParams.current = {
          ...refParams.current,
          page: 1,
        };

        setTxs(res);
      } else {
        const res = (await apiClient.get(
          `service/rollup-txs?chainID=${chain_id}&page=${refParams.current.page}&limit=${refParams.current.limit}`,
        )) as any;

        setTxs([...txs, ...res]);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
      hasIncrementedPageRef.current = false;
    }
  };

  const labelConfig = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '11px',
    letterSpacing: '-0.5px',
    borderBottom: '1px solid #FFFFFF33',
    textTransform: 'uppercase',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      // {
      //   id: 'tx',
      //   label: 'Tx L1',
      //   labelConfig,
      //   config: {
      //     borderBottom: 'none',
      //     fontSize: '14px',
      //     fontWeight: 500,
      //     verticalAlign: 'middle',
      //     letterSpacing: '-0.5px',
      //   },
      //   render(data: IBitcoinRent) {
      //     return (
      //       <Flex
      //         gap={6}
      //         alignItems={'center'}
      //         width={'100%'}
      //         justifyContent={'space-between'}
      //         cursor="pointer"
      //         onClick={() => {
      //           window.open(
      //             `https://explorer.trustless.computer/tx/${data?.tc_tx_id}`,
      //           );
      //         }}
      //       >
      //         <Flex flex={1} gap={2} alignItems={'center'}>
      //           <Flex width={'100%'} gap={'4px'} direction={'column'}>
      //             <Text className={s.title} textDecoration={'underline'}>
      //               {ellipsisCenter({
      //                 str: data?.tc_tx_id || '',
      //                 limit: isMobile ? 4 : 8,
      //               })}
      //             </Text>
      //           </Flex>
      //         </Flex>
      //       </Flex>
      //     );
      //   },
      // },
      {
        id: 'name',
        label: 'Transaction',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: IBitcoinRent) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
              onClick={() => {
                window.open(`https://mempool.space/tx/${data?.btc_tx_id}`);
              }}
            >
              <Flex flex={1} gap={2} alignItems={'center'}>
                <Flex width={'100%'} gap={'4px'} direction={'column'}>
                  <Text className={s.title} textDecoration={'underline'}>
                    {ellipsisCenter({
                      str: data?.btc_tx_id || '',
                      limit: isMobile ? 8 : 16,
                    })}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: 'rent',
        label: <Box>Fee</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          color: 'white !important',
        },
        render(data: IBitcoinRent) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Text className={s.title}>
                {formatToHumanAmount({
                  amount: `${data.btcTxFee}`,
                  decimals: 8,
                })}{' '}
                BTC
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'time',
        label: <Box>Time</Box>,
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
          color: 'white !important',
        },
        render(data: IBitcoinRent) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Text className={s.title}>
                {data.blockTime.replaceAll('T', ' ').replaceAll('Z', '')}
              </Text>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <div className={s.container}>
        <Text fontWeight={'600'} fontSize={'24px'} color={'#000'} mb={'12px'}>
          {title}
        </Text>
        <ScrollWrapper
          onFetch={() => {
            refParams.current = {
              ...refParams.current,
              page: refParams.current.page + 1,
            };
            hasIncrementedPageRef.current = true;
            fetchData();
          }}
          isFetching={isFetching}
          hasIncrementedPageRef={hasIncrementedPageRef}
          onFetchNewData={() => {}}
          wrapClassName={s.wrapScroll}
          dependData={txs}
        >
          <ListTable
            data={uniqBy(txs, (item) => item.btc_tx_id)}
            columns={columns}
            className={s.tableContainer}
          />
          {isFetching && <AppLoading className={s.loading} />}
        </ScrollWrapper>
      </div>
    </BaseModal>
  );
};

export default BitcoinRentModal;
