import { create } from 'zustand';

type UseOrderFormStoreV3 = {
  form: Record<string, any>;
  field: Record<
    string,
    {
      dragged: boolean;
      value: string | number | string[] | number[] | null;
    }
  >;
  priceUSD: number;
  priceBVM: number;
  setField: (
    field: string,
    value: string | number | string[] | number[] | null,
    dragged?: boolean,
  ) => void;
  setPriceUSD: (price: number) => void;
  setPriceBVM: (price: number) => void;
};

const useOrderFormStoreV3 = create<UseOrderFormStoreV3>((set) => ({
  form: {},
  field: {},
  priceUSD: 0,
  priceBVM: 0,
  setField: (field, value, dragged = false) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
      field: {
        ...state.field,
        [field]: {
          dragged: dragged ?? state.field[field]?.dragged,
          value,
        },
      },
    })),
  setPriceUSD: (price) =>
    set((state) => ({
      priceUSD: price,
    })),
  setPriceBVM: (price) =>
    set((state) => ({
      priceBVM: price,
    })),
}));

export default useOrderFormStoreV3;
