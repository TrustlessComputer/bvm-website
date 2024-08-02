import { APP_BLOCKCHAIN } from '@/stores/states/l2services/constants';
import { IDAppInstalled, OrderItem } from '@/stores/states/l2services/types';
import { IModelOption } from '@/types/customize-model';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export const useChainInfor = (orderId: string) => {
  if (!orderId || isEmpty(orderId)) {
    console.error('[useChainInfor] orderId is required!');
    throw new Error('orderId is invalid');
  }

  const [isFetching, setFetching] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const [chainData, setChainData] = useState<undefined | OrderItem>(undefined);

  const dataFetcher = async () => {
    try {
      setFetching(true);
      const response = await fetch(
        `https://l2aas-api.newbitcoincity.com/api/order/detail/${orderId}`,
        {
          method: 'GET',
        },
      );
      const dataJSON = await response.json();

      if (dataJSON && dataJSON.result && dataJSON.result.orderId) {
        setChainData(dataJSON.result);
      } else {
        throw new Error('Chain data is invalid. Please check');
      }
    } catch (error) {
      console.error('[useChainInfor][dataFetcher] -- ERROR -- ', error);
    } finally {
      setFetching(false);
      setFetched(true);
    }
  };

  const getDAppInstalledByAppCode = (dAppName: string) => {
    return chainData?.dApps?.find(
      (item) => item.appCode?.toLowerCase() === dAppName?.toLowerCase(),
    );
  };

  const statusMapper = (dAppInstalled?: IDAppInstalled, dAppName?: string) => {
    let statusStr = '';
    let statusColor = 'transparent';

    if (dAppName === 'my_blockchain') {
      statusStr = 'Running';
      statusColor = '#00AA6C';
    } else if (dAppInstalled) {
      switch (dAppInstalled.status) {
        case 'new':
          statusStr = 'New'; // Map text if needed (Ex: Setting up)
          statusColor = '#F9D03F';
          break;
        case 'processing':
          statusStr = 'Processing'; // Map text if needed
          statusColor = '#F9D03F';
          break;

        case 'done':
          statusStr = 'Done'; // Map text if needed
          statusColor = '#00AA6C';
          break;
        default:
          break;
      }
    } else {
      statusStr = 'Need config';
      statusColor = '#FF4747';
    }

    return {
      statusStr,
      statusColor,
    };
  };

  const dAppListAvailable = useMemo(() => {
    let dAppList: IModelOption[] = [APP_BLOCKCHAIN];
    if (chainData) {
      chainData.selectedOptions?.filter((item) => {
        item.options.map((option: IModelOption) => {
          if (option.needConfig) {
            dAppList.push(option);
          }
        });
      }) || [];
      dAppList = [...dAppList];
    }

    return dAppList.map((item) => {
      const statusFactory = statusMapper(
        getDAppInstalledByAppCode(item.key),
        item.key,
      );

      return {
        ...item,
        ...statusFactory,
      };
    });
  }, [chainData]);

  const legoList = useMemo(() => {
    return chainData?.selectedOptions || [];
  }, [chainData]);

  useEffect(() => {
    dataFetcher();
  }, [orderId]);

  const result = useMemo(() => {
    return {
      isFetching,
      isFetched,
      chainData,
      dAppListAvailable,
      legoList,
    };
  }, [isFetching, isFetched, chainData, dAppListAvailable, legoList]);

  // Show log to debug if needed
  console.log('[useChainInfor][ALL DATA] ', result);
  return result;
};
