import AppLoading from '@/components/AppLoading';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import { INFT, IRollupDetail, IRollupNFT } from '@/services/api/dapp/rollupl2-detail/interface';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import ListTable, { ColumnProp } from '@components/ListTable';
import { formatCurrency } from '@utils/format';
import CollectionModal from '@/modules/l2-rollup-detail/NFTTab/CollectionModal';

interface IProps {}

const NFTTab = (props: IProps) => {
  const { address } = useContext(L2RollupDetailContext);
  const { rollupDetails } = useContext(
    L2RollupDetailContext,
  );
  const [selectedRollup, setSelectedRollup] = useState<IRollupDetail | undefined>(undefined);

  const rollupApi = new CRollupL2DetailAPI();

  const [rollupTransactions, setRollupTransactions] = useState<IRollupNFT[]>(
    [],
  );

  const list = useMemo(() => {
    let transactions: INFT[] = [];
    rollupTransactions.forEach((data) => {
      if (data.balances && (!selectedRollup || (selectedRollup && data?.rollup?.id === selectedRollup?.rollup?.id)))
        transactions = [
          ...transactions,
          ...data.balances.map((balance) => ({
            ...balance,
            chain: data.rollup,
          })),
        ];
    });
    return transactions;
  }, [rollupTransactions, selectedRollup]);

  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<INFT | undefined>(undefined);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    refParams.current = {
      ...refParams.current,
    };
  }, []);

  const refInitial = useRef(false);

  useEffect(() => {
    fetchData(true);
  }, [address]);

  const fetchData = async (isNew?: boolean) => {
    try {
      setIsFetching(true);
      if (isNew) {
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const res = (await rollupApi.getRollupL2NFTs({
          user_address: address,
          ...refParams.current,
        })) as any;

        setRollupTransactions(res);
      } else {
        const res = (await rollupApi.getRollupL2NFTs({
          user_address: address,
          ...refParams.current,
        })) as any;

        setRollupTransactions([...rollupTransactions, ...res]);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
      hasIncrementedPageRef.current = false;
    }
  };

  const onRefresh = async () => {
    if (!refInitial.current) {
      return;
    }
    try {
      setRefreshing(true);
      refParams.current = {
        ...refParams.current,
        page: 1,
      };
      hasIncrementedPageRef.current = true;
      await fetchData(true);
    } catch (error) {
      console.log('refreshing err', error);
    } finally {
      setRefreshing(false);
    }
  };

  const labelConfig = {
    color: '#898989',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'collection',
        label: 'Collection',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: INFT) {
          return (
            <Flex
              gap={6}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'space-between'}
              cursor="pointer"
            >
              <Text className={s.title}>
                {data?.token_name}
              </Text>
            </Flex>
          );
        },
      },
      {
        id: 'balance',
        label: 'Balance',
        labelConfig,
        config: {
          borderBottom: 'none',
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle',
          letterSpacing: '-0.5px',
        },
        render(data: INFT) {
          return (
            <Flex gap={3} alignItems={'center'} width={'100%'}>
              <Flex gap={2} alignItems={'center'}>
                <Text className={s.title}>
                  {formatCurrency(data.value, 0, 0)}
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
    ];
  }, []);

  const renderChains = () => {
    return (
      <Grid
        w="100%"
        mt="20px"
        gridTemplateColumns={{
          base: 'repeat(auto-fill, 200px)',
        }}
        gap={{ base: '16px', lg: '20px' }}
        p={{ base: '12px', lg: '24px' }}
        borderRadius={'12px'}
        className={s.chains}
      >
        {rollupDetails.map((detail) => {
          if (!detail.rollup) return;

          return (
            <Flex
              bg={detail?.rollup?.id === selectedRollup?.rollup.id ? '#fa4e0e' : ''}
              direction={'row'}
              alignItems={'center'} gap={'12px'}
              cursor={'pointer'}
              onClick={() => setSelectedRollup(detail)}
              borderRadius={"8px"}
              p={"4px"}
            >
              <Image
                src={detail.rollup?.icon}
                w={'40px'}
                h={'40px'}
                borderRadius={'50%'}
              />
              <Flex direction={'column'}>
                <Text fontWeight={'400'} color={detail?.rollup?.id === selectedRollup?.rollup.id ? '#FFF' : '#808080'}>
                  {detail.rollup?.name}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box className={s.container} h="60vh">
      {rollupDetails.length > 0 && renderChains()}
      <ScrollWrapper
        onFetch={() => {
          refParams.current = {
            ...refParams.current,
            page: refParams.current.page + 1,
          };
          hasIncrementedPageRef.current = true;
          fetchData();
        }}
        isFetching={refreshing}
        hasIncrementedPageRef={hasIncrementedPageRef}
        onFetchNewData={onRefresh}
        wrapClassName={s.wrapScroll}
        dependData={list}
      >
        <ListTable
          data={list}
          columns={columns}
          className={s.tableContainer}
          showEmpty={!isFetching}
          emptyLabel="No NFTs found."
          emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
          onItemClick={(item) => {
            setSelectedCollection(item)
          }}
        />
        {isFetching && <AppLoading className={s.loading} />}
      </ScrollWrapper>
      <CollectionModal
        isOpen={!!selectedCollection}
        onClose={() => {
          setSelectedCollection(undefined);
        }}
        title={`${selectedCollection?.token_name} Collection`}
        item={selectedCollection as INFT}
      />
    </Box>
  );
};

export default NFTTab;
