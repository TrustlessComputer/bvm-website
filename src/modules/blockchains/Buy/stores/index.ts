import { create } from 'zustand';
import { BuyBuilderSelectState } from '../Buy.types';
import {
  DALayerEnum,
  NetworkEnum,
  WITHDRAWAL_PERIOD_BOOTSTRAP,
} from '../Buy.constanst';

export const ORDER_FIELD = {
  CHAIN_NAME: 'chainName',
  NETWORK: 'network',
  DATA_AVAILABILITY_CHAIN: 'dataAvaibilityChain',
  GAS_LIMIT: 'gasLimit',
  BLOCK_TIME: 'blockTime',
} as const;
export type FormOrder = Pick<
  BuyBuilderSelectState,
  'chainName' | 'network' | 'dataAvaibilityChain' | 'gasLimit' | 'blockTime'
>;

type UseFormOrderStore = {
  field: {
    [ORDER_FIELD.CHAIN_NAME]: {
      dragged: boolean;
      value: BuyBuilderSelectState['chainName'];
    };
    [ORDER_FIELD.NETWORK]: {
      dragged: boolean;
      value: BuyBuilderSelectState['network'];
    };
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      dragged: boolean;
      value: BuyBuilderSelectState['dataAvaibilityChain'];
    };
    [ORDER_FIELD.GAS_LIMIT]: {
      dragged: boolean;
      value: BuyBuilderSelectState['gasLimit'];
    };
    [ORDER_FIELD.BLOCK_TIME]: {
      dragged: boolean;
      value: BuyBuilderSelectState['blockTime'];
    };
  };
  setFormField(
    field: keyof FormOrder,
    value: FormOrder[keyof FormOrder],
    dragged?: boolean,
  ): void;
};

export const useFormOrderStore = create<UseFormOrderStore>((set) => ({
  field: {
    [ORDER_FIELD.CHAIN_NAME]: {
      dragged: true,
      value: '',
    },
    [ORDER_FIELD.NETWORK]: {
      dragged: false,
      value: NetworkEnum.Network_Testnet,
    },
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: {
      dragged: false,
      value: DALayerEnum.DALayer_PLG,
    },
    [ORDER_FIELD.GAS_LIMIT]: {
      dragged: false,
      value: String(1_000_000_000),
    },
    [ORDER_FIELD.BLOCK_TIME]: {
      dragged: false,
      value: WITHDRAWAL_PERIOD_BOOTSTRAP,
    },
  },
  setFormField: (field, value, dragged) => {
    set((state) => ({
      field: {
        ...state.field,
        [field]: {
          dragged: dragged ?? state.field[field].dragged,
          value,
        },
      },
    }));
  },
}));
