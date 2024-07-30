import { create, StateCreator } from 'zustand';
import { signal } from '@preact/signals-react';

type UseDappsSlice = {
  currentIndexDapp: number;
  setCurrentIndexDapp: (index: number) => void;
  dapps: DappModel[];
  setDapps: (dapps: DappModel[]) => void;
};

type UseTemplateFormSlice = {
  templateDapps: DappModel[];
  setTemplateDapps: (templateDapps: DappModel[]) => void;
  templateForm: TemplateForm | null;
  setTemplateForm: (templateForm: TemplateForm | null) => void;
};

type UseFormDappsSlice = {
  formDapps: Record<string, DappModel>;
  setFormDapps: (formDapps: Record<string, DappModel>) => void;
  setFormDappsWithKey: (key: string, dapp: DappModel) => void;
};

type UseDappStore = UseDappsSlice;
type UseFormDappStore = UseFormDappsSlice;
type UseTemplateFormStore = UseTemplateFormSlice;

const useDappsSlice: StateCreator<UseDappsSlice> = (set) => ({
  currentIndexDapp: 2,
  setCurrentIndexDapp: (currentIndexDapp) => set({ currentIndexDapp }),
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

const useTemplateFormSlice: StateCreator<UseTemplateFormSlice> = (set) => ({
  templateDapps: [],
  setTemplateDapps: (templateDapps) => set({ templateDapps }),

  templateForm: null,
  setTemplateForm: (templateForm) => set({ templateForm }),
});

const useDappsStore = create<UseDappStore>((...set) => ({
  ...useDappsSlice(...set),
  // ...useDappFormSlice(...set),
}));

export const useFormDappsStore = create<UseFormDappStore>((...set) => ({
  ...useDappFormSlice(...set),
}));

export const useTemplateFormStore = create<UseTemplateFormStore>((...set) => ({
  ...useTemplateFormSlice(...set),
}));

export const subScribeDropEnd = signal<number>(0);

export default useDappsStore;
