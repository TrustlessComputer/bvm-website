import { create, StateCreator } from 'zustand';

type UseDappsSlice = {
  dapps: DappModel[];
  setDapps: (dapps: DappModel[]) => void;
};

type UseFormDappsSlice = {
  formDapps: Record<string, DappModel>;
  setFormDapps: (formDapps: Record<string, DappModel>) => void;
  setFormDappsWithKey: (key: string, dapp: DappModel) => void;
};

type UseDappStore = UseDappsSlice;
type UseFormDappStore = UseFormDappsSlice;

const useDappsSlice: StateCreator<UseDappsSlice> = (set) => ({
  dapps: [],
  setDapps: (dapps) => set({ dapps }),
});

const useDappFormSlice: StateCreator<UseFormDappsSlice> = (set) => ({
  formDapps: {},
  setFormDapps: (formDapps) => set({ formDapps }),
  setFormDappsWithKey: (key, dapp) =>
    set((state) => ({
      formDapps: {
        ...state.formDapps,
        [key]: dapp,
      },
    })),
});

const useDappsStore = create<UseDappStore>((...set) => ({
  ...useDappsSlice(...set),
  // ...useDappFormSlice(...set),
}));

export const useFormDappsStore = create<UseFormDappStore>((...set) => ({
  ...useDappFormSlice(...set),
}));

export default useDappsStore;
