import { OrderItem } from '@/stores/states/l2services/types';

export interface DappState {
  chain?: OrderItem | undefined;
  loading?: boolean;
}
