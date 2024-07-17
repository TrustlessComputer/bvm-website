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
  needContactUs: boolean;
  priceUSD: number;
  priceBVM: number;
  setField: (
    field: string,
    value: string | number | string[] | number[] | null,
    dragged?: boolean,
  ) => void;
  setPriceUSD: (price: number) => void;
  setPriceBVM: (price: number) => void;
  setNeedContactUs: (needContactUs: boolean) => void;
};

type CaptureStore = {
  isCapture: boolean;
  setIsCapture: (isCapture: boolean) => void;
};

const useOrderFormStoreV3 = create<UseOrderFormStoreV3>((set) => ({
  form: {},

  needContactUs: false,
  setNeedContactUs: (needContactUs) => set({ needContactUs }),

  field: {},
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

  priceUSD: 0,
  setPriceUSD: (price) =>
    set((state) => ({
      priceUSD: price,
    })),

  priceBVM: 0,
  setPriceBVM: (price) =>
    set((state) => ({
      priceBVM: price,
    })),
}));

export const useCaptureStore = create<CaptureStore>((set) => ({
  isCapture: false,
  setIsCapture: (isCapture) => set({ isCapture }),
}));

export default useOrderFormStoreV3;
