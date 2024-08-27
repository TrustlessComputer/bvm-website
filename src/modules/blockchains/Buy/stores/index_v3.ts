import { create } from 'zustand';

export type UseOrderFormStoreV3 = {
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
  setFields: (
    fields: Record<
      string,
      {
        dragged: boolean;
        value: string | number | string[] | number[] | null;
      }
    >,
  ) => void;
  setField: (
    field: string,
    value: string | number | string[] | number[] | null,
    dragged?: boolean,
  ) => void;
  // setOptionInputFiled: (
  //   field: string,
  //   inputValue: string,
  // ) => void;
  setPriceUSD: (price: number) => void;
  setPriceBVM: (price: number) => void;
  setNeedContactUs: (needContactUs: boolean) => void;
};
const useOrderFormStoreV3 = create<UseOrderFormStoreV3>((set) => ({
  form: {},

  needContactUs: false,
  setNeedContactUs: (needContactUs) => set({ needContactUs }),

  field: {},
  setFields: (fields) => set({ field: fields }),
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


  // setOptionInputFiled: (field, inputValue) =>
  //   set((state) => ({
  //     form: {
  //       ...state.form,
  //       [field]: inputValue,
  //     },
  //     field: {
  //       ...state.field,
  //       [field]: {
  //         inputValue,
  //       },
  //     },
  //   })),

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

type CaptureStore = {
  isCapture: boolean;
  setIsCapture: (isCapture: boolean) => void;
};
export const useCaptureStore = create<CaptureStore>((set) => ({
  isCapture: false,
  setIsCapture: (isCapture) => set({ isCapture }),
}));

export default useOrderFormStoreV3;
