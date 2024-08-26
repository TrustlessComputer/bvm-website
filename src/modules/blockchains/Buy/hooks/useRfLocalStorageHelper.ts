import { STORAGE_KEYS } from '@/constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { AppNode } from '../stores/useFlowStore';

const useRfLocalStorageHelper = () => {
  const isExitAANodeInLocal = (): boolean => {
    const flow = LocalStorage.getItem(STORAGE_KEYS.LAST_NODES);

    if (flow?.nodes) {
      return flow.nodes.some(
        (node: AppNode) => node.id === 'account-abstraction',
      );
    }

    return false;
  };

  return {
    isExitAANodeInLocal,
  };
};

export default useRfLocalStorageHelper;
