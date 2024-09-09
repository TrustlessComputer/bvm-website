import { useEffect, useState } from 'react';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

import { useAppDispatch } from '@/stores/hooks';
import {
  setDAppParam,
  setTemplateParam,
} from '@/stores/states/l2services/reducer';
import { DappParam } from '@/stores/states/l2services/types';
import { useSearchParams } from 'next/navigation';

const enhanceFilterWithDappParam =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    // const { setDAppParamByData } = useAvailableListTemplate();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const dappParam = searchParams.get('dapp');
    const templateParam = searchParams.get('template') || '-1';

    console.log('[enhanceFilterWithDappParam] dappParam', dappParam);

    const [isInitFinish, setInitFinish] = useState(false);

    useEffect(() => {
      // setDAppParamByData(dappParam);
      dispatch(setDAppParam(dappParam as DappParam));
      dispatch(setTemplateParam(templateParam));
      setInitFinish(true);
    }, [dappParam]);

    if (!isInitFinish) return null;
    if (isInitFinish) return <WrappedComponent {...props} />;
  };

export default enhanceFilterWithDappParam;
