import React from 'react';
import { SignatureStatus } from '@/interfaces/whitelist';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { getSignatureStatus } from '@/services/whitelist';
import AuthenStorage from '@/utils/storage/authen.storage';

let interval: any = undefined;
const useFetchHistoryBTC = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [status, setStatus] = React.useState<SignatureStatus[]>([]);
  const needReload = useAppSelector(commonSelector).needReload;

  const fetchData = async () => {
    try {
      const response  = await getSignatureStatus();
      const isProcessing = response.some(item => item.status === 'pending');
      setStatus([...(response || [])]);
      setLoaded(true);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  React.useEffect(() => {
    const authenKey = AuthenStorage.getAuthenKey();

    if (!authenKey) return;
    if (interval) {
      clearInterval(interval);
      interval = undefined
    }

    fetchData();
    interval = setInterval(() => {
      fetchData();
    }, 10000)
  }, [setStatus, setLoaded, needReload])
}

export default useFetchHistoryBTC;
