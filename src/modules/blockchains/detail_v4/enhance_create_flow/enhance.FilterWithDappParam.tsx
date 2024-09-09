import { useEffect, useState } from 'react';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

import { useSearchParams } from 'next/navigation';
import useAvailableListTemplate from '../../Buy/studio/useAvailableListTemplate';
import { useAppDispatch } from '@/stores/hooks';
import { setDAppParam } from '@/stores/states/l2services/reducer';

const enhanceFilterWithDappParam =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    // const { setDAppParamByData } = useAvailableListTemplate();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const dappParam = searchParams.get('dapp') || '0';

    const [isInitFinish, setInitFinish] = useState(false);

    useEffect(() => {
      // setDAppParamByData(dappParam);
      dispatch(setDAppParam(dappParam));
      setInitFinish(true);
    }, [dappParam]);

    if (!isInitFinish) return null;
    if (isInitFinish) return <WrappedComponent {...props} />;
  };

export default enhanceFilterWithDappParam;
