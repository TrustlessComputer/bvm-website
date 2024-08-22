import AppLoading from '@/components/AppLoading';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import {
  INFT,
  IRollupNFT,
} from '@/services/api/dapp/rollupl2-detail/interface';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import EmptyList from '@/components/ListTable/EmptyList';

interface IProps {}

const NFTTab = (props: IProps) => {
  const { address } = useContext(L2RollupDetailContext);

  const rollupApi = new CRollupL2DetailAPI();

  const [rollupTransactions, setRollupTransactions] = useState<IRollupNFT[]>(
    [],
  );

  const list = useMemo(() => {
    let transactions: INFT[] = [];
    rollupTransactions.forEach((data) => {
      if (data.balances)
        transactions = [
          ...transactions,
          ...data.balances.map((balance) => ({
            ...balance,
            chain: data.rollup,
          })),
        ];
    });
    return transactions;
  }, [rollupTransactions]);

  const [isFetching, setIsFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <Box className={s.container} h="60vh">
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
        <Grid
          w="100%"
          gridTemplateColumns={{
            base: 'repeat(auto-fill, 196px)',
          }}
          gap={{ base: '16px', lg: '24px' }}
        >
          {list.length > 0 &&
            list.map((item) => {
              return (
                <Flex direction={'column'} className={s.shadow}>
                  <Image borderTopRadius={'12px'} w={'100%'} aspectRatio={1} />
                  <Flex direction={'column'} p={'8px'}>
                    <Text color={'#898989'}>#{item.block_number}</Text>
                    <Text>{item.token_name}</Text>
                  </Flex>
                </Flex>
              );
            })}
        </Grid>
        {isFetching ? (
          <AppLoading className={s.loading} />
        ) : (
          <>
            {list.length === 0 && (
              <EmptyList
                color={'#000'}
                labelText={'No NFTs found.'}
                emptyIcon={<Image src={'/icons/icon-empty.svg'} />}
              />
            )}
          </>
        )}
      </ScrollWrapper>
    </Box>
  );
};

export default NFTTab;
