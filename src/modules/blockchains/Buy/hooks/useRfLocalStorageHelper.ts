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

  const clearStoreLocalStorage = () => {
    LocalStorage.removeItem(STORAGE_KEYS.LAST_NODES);
    LocalStorage.removeItem(STORAGE_KEYS.USE_DRAG_SIGNALS);
    LocalStorage.removeItem(STORAGE_KEYS.USE_BLOCKCHAIN_FORM);
    LocalStorage.removeItem(STORAGE_KEYS.USE_SIGNALS_FORM);
  };

  return {
    isExitAANodeInLocal,
    clearStoreLocalStorage,
  };
};

export default useRfLocalStorageHelper;
