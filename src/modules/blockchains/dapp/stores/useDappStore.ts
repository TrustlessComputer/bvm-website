import { create, StateCreator } from 'zustand';

type UseDappsSlice = {
  dapps: DappModel[];
  setDapps: (dapps: DappModel[]) => void;
};

type UseDappFormSlice = {
  formDapps: Record<string, DappModel>;
  setFormDapps: (formDapps: Record<string, DappModel>) => void;
};

type UseDappStore = UseDappsSlice & UseDappFormSlice;

const useDappsSlice: StateCreator<UseDappsSlice> = (set) => ({
  dapps: [],
  setDapps: (dapps) => set({ dapps }),
});

const useDappFormSlice: StateCreator<UseDappFormSlice> = (set) => ({
  formDapps: {},
  setFormDapps: (formDapps) => set({ formDapps }),
});

const useDappsStore = create<UseDappStore>((...set) => ({
  ...useDappsSlice(...set),
  ...useDappFormSlice(...set),
}));

export default useDappsStore;
