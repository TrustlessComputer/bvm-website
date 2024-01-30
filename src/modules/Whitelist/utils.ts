import { SignatureStatus } from '@/interfaces/whitelist';
import { EVMFieldType } from '@/stores/states/user/types';
import { PUBLIC_SALE_START } from '@/modules/Whitelist/index';
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

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

const checkIsPublicSale = () => {
  return dayjs
    .utc(PUBLIC_SALE_START, 'YYYY-MM-DD HH:mm:ss')
    .isBefore(dayjs().utc().format());
}

export {
  checkIsAllowState,
  getEVMNetworkByFieldType,
  getSymbolByFieldType,
  checkIsPublicSale
}
