import { create } from 'zustand';
import { BuyBuilderSelectState } from '../Buy.types';
import { DALayerEnum, NetworkEnum } from '../Buy.constanst';

export const ORDER_FIELD = {
  CHAIN_NAME: 'chainName',
  NETWORK: 'network',
  DATA_AVAILABILITY_CHAIN: 'dataAvaibilityChain',
  GAS_LIMIT: 'gasLimit',
  WITHDRAW_PERIOD: 'withdrawPeriod',
} as const;

export type FormOrder = Pick<
  BuyBuilderSelectState,
  | 'chainName'
  | 'network'
  | 'dataAvaibilityChain'
  | 'gasLimit'
  | 'withdrawPeriod'
>;

type UseFormOrderStore = {
  form: FormOrder;
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
    [ORDER_FIELD.WITHDRAW_PERIOD]: {
      dragged: boolean;
      value: BuyBuilderSelectState['withdrawPeriod'];
    };
    nestedData: {
      dragged: boolean;
      value: Record<string, any>;
    };
  };
  setFormField(
    field: keyof FormOrder,
    value: FormOrder[keyof FormOrder],
    dragged?: boolean,
  ): void;

  setForm(form: FormOrder): void;
};

export const useFormOrderStore = create<UseFormOrderStore>((set) => ({
  form: {
    [ORDER_FIELD.CHAIN_NAME]: '',
    [ORDER_FIELD.NETWORK]: NetworkEnum.Network_Testnet,
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: DALayerEnum.DALayer_PLG,
    [ORDER_FIELD.GAS_LIMIT]: String(0),
    [ORDER_FIELD.WITHDRAW_PERIOD]: 0,
  },

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
      value: String(0),
    },
    [ORDER_FIELD.WITHDRAW_PERIOD]: {
      dragged: false,
      value: 0,
    },
    nestedData: {
      dragged: false,
      value: {},
    },
    nestedData2: {
      dragged: false,
      value: {},
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

  setForm: (form) => {
    set((state) => ({
      form,
    }));
  },
}));
