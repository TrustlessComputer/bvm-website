import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { APP_BLOCKCHAIN } from '@/stores/states/l2services/constants';
import { setDAppConfigSelected } from '@/stores/states/l2services/reducer';
import { getDAppConfigByKeySelector } from '@/stores/states/l2services/selector';
import { useEffect } from 'react';

const enhanceSelecteDappConfig = (WrappedComponent: any) => (props: any) => {
  const getDAppConfigByKeyFunc = useAppSelector(getDAppConfigByKeySelector);
  const aaConfigItem = getDAppConfigByKeyFunc('account_abstraction');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDAppConfigSelected(aaConfigItem || APP_BLOCKCHAIN));
  }, [aaConfigItem]);

  return <WrappedComponent {...props} />;
};

export default enhanceSelecteDappConfig;
