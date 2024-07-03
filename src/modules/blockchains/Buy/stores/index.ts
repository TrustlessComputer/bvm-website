import { create } from 'zustand';

export const ORDER_FIELD = {
  CHAIN_NAME: 'chainName',
  NETWORK: 'isMainnet',
  DATA_AVAILABILITY_CHAIN: 'dataAvaibilityChain',
  GAS_LIMIT: 'gasLimit',
  BLOCK_TIME: 'blockTime',
};
type OrderField = (typeof ORDER_FIELD)[keyof typeof ORDER_FIELD]

// type FormOrder = {
//   chainName: string | null;
//   dataAvaibilityChain: number | null;
//   isMainnet: boolean | null;
//   gasLimit: number | null;
//   blockTime: number | null;
// };
type FormOrder = Record<OrderField, string | number | null>


type UseFormOrderStore = {
  form: FormOrder;
  isAllFieldsFilled: boolean;
  setFormField(field: keyof FormOrder, value: FormOrder[keyof FormOrder]): void;
};



export const useFormOrderStore = create<UseFormOrderStore>((set) => ({
  form: {
    [ORDER_FIELD.CHAIN_NAME]: null,
    [ORDER_FIELD.NETWORK]: null,
    [ORDER_FIELD.DATA_AVAILABILITY_CHAIN]: null,
    [ORDER_FIELD.GAS_LIMIT]: null,
    [ORDER_FIELD.BLOCK_TIME]: null,
  },
  isAllFieldsFilled: false,

  setFormField: (field, value) =>
    set((state) => {
      return {
        form: { ...state.form, [field]: value },
        isAllFieldsFilled: Object.values(state.form).every(
          (field) => field !== null,
        ),
      };
    }),
}));
