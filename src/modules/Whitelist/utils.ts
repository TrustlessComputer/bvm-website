import { SignatureStatus } from '@/interfaces/whitelist';
import { EVMFieldType } from '@/stores/states/user/types';

const checkIsAllowState = (status: SignatureStatus[]) => {
  return {
    isProcessing: status.some(item => item.status === 'pending'),
    isUnclaimed: status.some(item => item.status === 'unclaimed' && !!Number(item.gas_point || '0'))
  }
};

const getEVMNetworkByFieldType = (type: EVMFieldType) => {
  switch (type) {
    case 'allowOptimism':
      return 'optimism';
    default:
      return ''
  }
}

const getSymbolByFieldType = (type: EVMFieldType) => {
  switch (type) {
    case 'allowOptimism':
      return 'OP';
    default:
      return ''
  }
}

export {
  checkIsAllowState,
  getEVMNetworkByFieldType,
  getSymbolByFieldType
}
