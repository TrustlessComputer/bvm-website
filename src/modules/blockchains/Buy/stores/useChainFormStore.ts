import { IModelCategory } from '@/types/customize-model';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ChainField = {
  dragged: boolean;
  category: IModelCategory;
};

type UseChainFormState = {
  chainName: string;
  chainFields: ChainField[];

  priceUSD: number;
  priceBVM: number;

  needContactUs: boolean;
};

type UseChainFormAction = {
  setChainName: (chainName: string) => void;
  setChainFields: (chainFields: ChainField[]) => void;
  setChainField: (fieldKey: string, value: ChainField) => void;

  setPriceUSD: (priceUSD: number) => void;
  setPriceBVM: (priceBVM: number) => void;

  setNeedContactUs: (needContactUs: boolean) => void;
};

type UseChainFormStore = UseChainFormState & UseChainFormAction;

const DEFAULT_STATE: UseChainFormState = {
  chainName: '',
  chainFields: [],
  priceUSD: 0,
  priceBVM: 0,
  needContactUs: false,
};

const useChainFormStore = create<UseChainFormStore>()(
  immer((set) => ({
    ...DEFAULT_STATE,
    setChainName: (chainName) => set({ chainName }),
    setChainFields: (chainFields) => set({ chainFields }),
    setChainField: (fieldKey, value) => {
      set((state) => {
        const fieldIndex = state.chainFields.findIndex(
          (field) => field.category.key === fieldKey,
        );

        if (fieldIndex === -1) {
          return;
        }

        state.chainFields[fieldIndex] = value;
      });
    },
    setPriceUSD: (priceUSD) => set({ priceUSD }),
    setPriceBVM: (priceBVM) => set({ priceBVM }),
    setNeedContactUs: (needContactUs) => set({ needContactUs }),
  })),
);

export default useChainFormStore;
