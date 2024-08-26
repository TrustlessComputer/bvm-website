import AppLoading from '@/components/AppLoading';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import { INFT, IRollupNFTDetail } from '@/services/api/dapp/rollupl2-detail/interface';
import React, { useContext, useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import BaseModal from '@components/BaseModal';
import { L2RollupDetailContext } from '@/modules/l2-rollup-detail/providers/l2-rollup-detail-context';
import { Grid } from '@chakra-ui/react';
import NFTItem from '@/modules/l2-rollup-detail/NFTTab/item';

const CollectionModal = ({isOpen, onClose, title, item}: { isOpen: boolean, onClose: any, title: string, item: INFT}) => {
  const { address } = useContext(L2RollupDetailContext);

  const rollupApi = new CRollupL2DetailAPI();

  const [rollupNFTs, setRollupNFTs] = useState<IRollupNFTDetail[]>(
    [],
  );

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
    if(isOpen) {
      fetchData(true);
    }
  }, [address, isOpen]);

  const fetchData = async (isNew?: boolean) => {
    try {
      setIsFetching(true);
      console.log('fetchData', isNew)
      if (isNew) {
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const res = (await rollupApi.getRollupL2NFTsList({
          rollup_id: item.chain?.id,
          user_address: address,
          token_address: item.token_contract_address,
          ...refParams.current,
        })) as any;

        console.log('aaaaa', res);

        setRollupNFTs(res);
      } else {
        const res = (await rollupApi.getRollupL2NFTsList({
          rollup_id: item.chain?.id,
          user_address: address,
          token_address: item.token_contract_address,
          ...refParams.current,
        })) as any;

        console.log('bbbb', res);

        setRollupNFTs([...rollupNFTs, ...res]);
      }
    } catch (error) {
      console.log('error', error);
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
    <BaseModal theme="dark" isShow={isOpen} onHide={onClose} title={title} size="extra" className={s.container}>
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
        dependData={rollupNFTs}
      >
        <Grid
          w="100%"
          gridTemplateColumns={{
            base: 'repeat(auto-fill, minmax(196px, 1fr))',
          }}
          gap={{ base: '16px', lg: '24px' }}
        >
          {rollupNFTs.length > 0 &&
            rollupNFTs.map((item) => {
              return (
                <NFTItem item={item} />
              );
            })}
        </Grid>
        {isFetching ? (
          <AppLoading className={s.loading} />
        ) : (
          <>

          </>
        )}
      </ScrollWrapper>
    </BaseModal>
  )
};

export default CollectionModal;
