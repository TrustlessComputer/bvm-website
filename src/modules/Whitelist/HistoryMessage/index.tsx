import { Button, Flex } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { CDN_URL_ICONS } from '@/config';
import React from 'react';
import AuthenStorage from '@/utils/storage/authen.storage';
import AllowListStorage from '@/utils/storage/allowlist.storage';
import { getSignatureStatus } from '@/services/whitelist';
import { SignatureStatus } from '@/interfaces/whitelist';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '@/utils/format';
import Loading from '@/components/Loading';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { shareTwitterSignature } from '@/utils/helpers';

let interval: any = undefined;

const HistoryMessage = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [status, setStatus] = React.useState<SignatureStatus[]>([]);
  const needReload = useAppSelector(commonSelector).needReload;

  const fetchData = async () => {
    try {
      const response  = await getSignatureStatus();
      const isProcessing = response.some(item => item.status === 'pending');
      setProcessing(isProcessing);
      setStatus([...(response || [])]);
      setLoaded(true);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  React.useEffect(() => {
    const authenKey = AuthenStorage.getAuthenKey();
    const allowlist = AllowListStorage.getStorage();

    if (!authenKey || !allowlist) return;
    if (interval) {
      clearInterval(interval);
      interval = undefined
    }

    fetchData();
    interval = setInterval(() => {
      fetchData();
    }, 10000)
  }, [setStatus, setLoaded, needReload])

  const amount = React.useMemo(() => {
    return status.reduce((prev, curr)=> {
      return {
        txsCount: new BigNumber(curr.num_txs || '0').plus(prev.txsCount).toNumber(),
        fee: new BigNumber(curr.btc_fee || '0').plus(prev.fee).toNumber(),
        point: new BigNumber(curr.gas_point || '0').plus(prev.point).toNumber()
      }
    }, { txsCount: 0, fee: 0, point: 0 } as any)
  }, [status])

  if (!loaded || !status.length) return <></>;

  if (processing) {
    return (
      <Flex className={styles.container}>
        <Loading />
        <p>Getting everything ready...</p>
      </Flex>
    )
  }

  return (
    <Flex className={styles.container}>
      <img src={`${CDN_URL_ICONS}/ic-verify.svg`} />
      <p>You've spent <span>{formatCurrency(amount.fee, 0)} BTC</span> for gas fees across <span>{formatCurrency(amount.txsCount, 0)} transactions</span></p>
      <p>Congratulations, you've earned <span>{formatCurrency(amount.point, 0)} points</span></p>
      <Button onClick={shareTwitterSignature}>Share now</Button>
    </Flex>
  )
}

export default HistoryMessage;
