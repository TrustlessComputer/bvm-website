import { Box, Flex } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import s from './styles.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppLoading from '@/components/AppLoading';
import ItemProposal from './ItemProposal';
import { getListProposal } from '@/services/governor';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import useApiInfiniteVer1 from '@/hooks/useApiInfiniteVer1';
import Empty from '@/components/Common/Empty';

const LIMIT_PAGE = 20;

export interface IGetParams {
  limit: number;
  page: number;
}

const ListProposal = () => {
  const infiniteScrollRef = useRef<any>(null);
  const refParams = useRef<IGetParams>({
    page: 1,
    limit: LIMIT_PAGE,
  });
  const needReload = useAppSelector(commonSelector).needReload;

  const fetchProposals = async (p: IGetParams) => {
    try {
      return getListProposal(p);
    } catch (err: unknown) {}
  };

  const getRefreshFn = () => fetchProposals;

  const {
    dataInfinite,
    loadMore,
    refresh,
    isLoadingMore,
    isReachingEnd,
    hasFirstFetching,
    isRefreshing,
  } = useApiInfiniteVer1(
    getRefreshFn(),
    { limit: LIMIT_PAGE, page: refParams.current.page },
    { revalidateOnFocus: true },
  );

  useEffect(() => {
    refresh();
  }, [needReload]);

  console.log('===dataInfinite', dataInfinite);

  const renderLoading = () => <AppLoading />;

  const renderItem = (data: any) => {
    return <ItemProposal data={data} />;
  };

  const renderEmptyPlaceholder = () => {
    return (
      dataInfinite?.length === 0 && (
        <Empty className={s.empty} text="No proposal found" />
      )
    );
  };

  return (
    <Flex className={s.wrapper}>
      {!hasFirstFetching ? (
        renderLoading()
      ) : (
        <Box w="100%">
          {renderEmptyPlaceholder()}
          {dataInfinite && dataInfinite.length > 0 && (
            <InfiniteScroll
              ref={infiniteScrollRef}
              className={s.infinite}
              dataLength={dataInfinite?.length || 500}
              hasMore={!isReachingEnd}
              loader={isLoadingMore && renderLoading()}
              refreshFunction={refresh}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
              next={loadMore}
            >
              {isRefreshing && renderLoading()}
              {(dataInfinite || []).map((item: any) => renderItem(item))}
            </InfiniteScroll>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default ListProposal;
