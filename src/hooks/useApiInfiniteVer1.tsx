import { BareFetcher, SWRConfiguration } from 'swr';
import useSWRInfinite from 'swr/infinite';

export type ApiInfiniteHook<T> = {
  dataInfinite?: Array<T>;
  data?: T;
  isLoadingMore: boolean;
  isEmpty: boolean;
  isReachingEnd: boolean;
  isRefreshing: boolean;
  isValidating: boolean;
  hasFirstFetching: boolean;
  page: number;
  error: string;
  loadMore: () => void;
  refresh: () => void;
  clear: () => void;
};

type Data = any;

export const useApiInfinite = (
  fetcher: BareFetcher,
  params?: Record<string, unknown>,
  config?: SWRConfiguration & { shouldFetch?: boolean; parallel?: boolean },
): ApiInfiniteHook<Data> => {
  const limit = params?.limit || 10;
  const shouldFetch =
    typeof config?.shouldFetch === 'undefined' ? true : config?.shouldFetch; // Conditional fetching default is true

  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite<Data>(
      (currentPage) => {
        return shouldFetch
          ? {
              ...params,
              limit,
              page: currentPage + 1, // Incremented index
            }
          : null;
      },
      async (reParams) => {
        const result = await fetcher(reParams);
        return result;
      },
      {
        revalidateFirstPage: false, //  To validate first page before the call of every next page
        ...config,
      },
    );

  const dataInfinite = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.length === 0;
  const isLoadingMore =
    isLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined') ||
    false;
  const isRefreshing = (isValidating && data && data.length === size) || false;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.length < (limit as any)) ||
    false;
  const hasFirstFetching = !!data;

  return {
    dataInfinite,
    data,
    page: size,
    loadMore: () => {
      if (!isLoadingMore) {
        setSize((prevSize) => prevSize + 1);
      }
    },
    isValidating,
    isLoadingMore,
    isEmpty,
    isRefreshing,
    isReachingEnd,
    hasFirstFetching,
    error,
    refresh: () => mutate(),
    clear: () => setSize(0),
  };
};

export default useApiInfinite;
