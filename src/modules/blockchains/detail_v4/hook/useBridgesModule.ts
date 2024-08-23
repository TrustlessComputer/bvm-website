import { useAppDispatch } from '@/stores/hooks';
import useFormChain from '../../Buy/hooks/useFormChain';
import { useChainProvider } from '../provider/ChainProvider.hook';

export const useBridgesModule = () => {
  const dispatch = useAppDispatch();

  const { getCurrentFieldFromChain } = useFormChain();

  const { order, getAAStatus, isUpdateFlow, getDAppInstalledByKey } =
    useChainProvider();

  return {};
};
