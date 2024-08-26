import AppLoading from '@/components/AppLoading';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import { INFT, IRollupChain, IRollupDetail, IRollupNFT } from '@/services/api/dapp/rollupl2-detail/interface';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import ListTable, { ColumnProp } from '@components/ListTable';
import { formatCurrency } from '@utils/format';
import CollectionModal from '@/modules/l2-rollup-detail/NFTTab/CollectionModal';

interface IProps {};

const RollupAll:IRollupDetail = {
  rollup: {
    id: 0,
    name: 'All',
  } as IRollupChain,
  balances: []
};

const NFTTab = (props: IProps) => {
  const { address } = useContext(L2RollupDetailContext);
  const { rollupDetails } = useContext(L2RollupDetailContext);
  const [selectedRollup, setSelectedRollup] = useState<IRollupDetail | undefined>(RollupAll);

  const rollupApi = new CRollupL2DetailAPI();

  const [rollupCollections, setRollupCollections] = useState<IRollupNFT[]>(
    [],
  );

  const list = useMemo(() => {
    let transactions: INFT[] = [];
    rollupCollections.forEach((data) => {
      if (data.balances && (selectedRollup?.rollup?.id === 0 || (selectedRollup && data?.rollup?.id === selectedRollup?.rollup?.id)))
        transactions = [
          ...transactions,
          ...data.balances.map((balance) => ({
            ...balance,
            chain: data.rollup,
          })),
        ];
    });
    return transactions;
  }, [rollupCollections, selectedRollup]);

  const listRollup = useMemo(() => {
    let rollups: IRollupDetail[] = [RollupAll];

    if(rollupDetails && rollupCollections) {
      rollupDetails.forEach((rollupDetail) => {
        const index = rollupCollections.findIndex(collection => collection.balances && collection.rollup.id === rollupDetail.rollup?.id);
        if(index >= 0) {
          rollups.push(rollupDetail);
        }
      });
    }

    return rollups;
  }, [rollupCollections, rollupDetails]);

  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<INFT | undefined>(undefined);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 100,
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

        setRollupCollections(res);
      } else {
        const res = (await rollupApi.getRollupL2NFTs({
          user_address: address,
          ...refParams.current,
        })) as any;

        setRollupCollections([...rollupCollections, ...res]);
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
        {listRollup.map((rollupDetail) => {
          if (!rollupDetail.rollup) return;

          const numCollection = rollupCollections.reduce((result, collection) => {
            if(rollupDetail.rollup.id === 0) {
              if(collection.balances) {
                result += 1;
              }
            } else {
              if (collection.balances && (collection?.rollup?.id === rollupDetail?.rollup?.id)) {
                result += 1;
              }

            }

            return result;
          }, 0);

          return (
            <Flex
              bg={rollupDetail?.rollup?.id === selectedRollup?.rollup.id ? '#fa4e0e' : ''}
              direction={'row'}
              alignItems={'center'} gap={'12px'}
              cursor={'pointer'}
              onClick={() => setSelectedRollup(rollupDetail)}
              borderRadius={"8px"}
              p={"8px"}
            >
              {
                rollupDetail.rollup?.icon && (
                  <Image
                    src={rollupDetail.rollup?.icon}
                    w={'40px'}
                    h={'40px'}
                    borderRadius={'50%'}
                  />
                )
              }
              <Flex direction={'column'}>
                <Text fontWeight={'400'} color={rollupDetail?.rollup?.id === selectedRollup?.rollup.id ? '#FFF' : '#808080'}>
                  {rollupDetail.rollup?.name} ({numCollection})
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
