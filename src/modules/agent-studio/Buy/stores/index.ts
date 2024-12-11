import { create } from 'zustand';
import { BuyBuilderSelectState } from '../Buy.types';
import { DALayerEnum, NetworkEnum } from '../Buy.constanst';

export const ORDER_FIELD = {
  CHAIN_NAME: 'chainName',
  NETWORK: 'network',
  DATA_AVAILABILITY_CHAIN: 'dataAvaibilityChain',
  GAS_LIMIT: 'gasLimit',
  WITHDRAW_PERIOD: 'withdrawPeriod',
  // COMPUTED: 'computed',
  // STORAGE: 'storage',
  // SETTLEMENT: 'settleMent',
  // SYSTEMAPPS: 'systemApps',
  // BRIDGEAPPS: 'brightApps',
  // WALLET: 'wallet',
  // DEFI: 'defi',
  // DEGENAPPS: 'degenApps',
  // GAMES: 'games',
} as const;

export type FormOrder = Pick<
  BuyBuilderSelectState,
  | 'chainName'
  | 'network'
  | 'dataAvaibilityChain'
  | 'gasLimit'
  | 'withdrawPeriod'
// | 'computed'
// | 'storage'
// | 'settleMent'
// | 'systemApps'
// | 'brightApps'
// | 'wallet'
// | 'defi'
// | 'degenApps'
// | 'games'
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
    // [ORDER_FIELD.BRIDGEAPPS]: {
    //   dragged: boolean;
    //   value: number;
    // };
    // [ORDER_FIELD.DEFI]: {
    //   dragged: boolean;
    //   value: Record<string, any>;
    // };
    // [ORDER_FIELD.COMPUTED]: {
    //   dragged: boolean;
    //   value: number;
    // };
    // [ORDER_FIELD.STORAGE]: {
    //   dragged: boolean;
    //   value: number;
    // };
    // [ORDER_FIELD.SETTLEMENT]: {
    //   dragged: boolean;
    //   value: number;
    // };
    // [ORDER_FIELD.SYSTEMAPPS]: {
    //   dragged: boolean;
    //   value: number;
    // };
    // [ORDER_FIELD.WALLET]: {
    //   dragged: boolean;
    //   value: number;
    // };
    // [ORDER_FIELD.DEGENAPPS]: {
    //   dragged: boolean;
    //   value: number;
    // };
    // [ORDER_FIELD.GAMES]: {
    //   dragged: boolean;
    //   value: number;
    // };
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
    // [ORDER_FIELD.BRIDGEAPPS]: 1,
    // [ORDER_FIELD.DEFI]: {
    //   nestedKey1: null,
    //   nestedKey2: null,
    // },
    // [ORDER_FIELD.COMPUTED]: 0,
    // [ORDER_FIELD.STORAGE]: 0,
    // [ORDER_FIELD.SETTLEMENT]: 0,
    // [ORDER_FIELD.SYSTEMAPPS]: 0,
    // [ORDER_FIELD.WALLET]: 0,
    // [ORDER_FIELD.DEGENAPPS]: 0,
    // [ORDER_FIELD.GAMES]: 0,
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

    // [ORDER_FIELD.BRIDGEAPPS]: {
    //   dragged: false,
    //   value: 1,
    // },

    // [ORDER_FIELD.DEFI]: {
    //   dragged: false,
    //   value: {
    //     nestedKey1: null,
    //     nestedKey2: null,
    //   },
    // },
    // [ORDER_FIELD.COMPUTED]: {
    //   dragged: false,
    //   value: 0,
    // },
    // [ORDER_FIELD.STORAGE]: {
    //   dragged: false,
    //   value: 0,
    // },
    // [ORDER_FIELD.SETTLEMENT]: {
    //   dragged: false,
    //   value: 0,
    // },
    // [ORDER_FIELD.SYSTEMAPPS]: {
    //   dragged: false,
    //   value: 0,
    // },

    // [ORDER_FIELD.WALLET]: {
    //   dragged: false,
    //   value: 0,
    // },

    // [ORDER_FIELD.DEGENAPPS]: {
    //   dragged: false,
    //   value: 0,
    // },

    // [ORDER_FIELD.GAMES]: {
    //   dragged: false,
    //   value: 0,
    // },
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
