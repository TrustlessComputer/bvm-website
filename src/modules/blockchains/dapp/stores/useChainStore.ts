import { create, StateCreator } from 'zustand';
import { OrderItem } from '@/stores/states/l2services/types';
import { IModelCategory } from '@/types/customize-model';

type UseChainSlice = {
  modelCategories: IModelCategory[];
  setModelCategories: (modelCategories: IModelCategory[]) => void;

  modelCategoriesTemplate: IModelCategory[][];
  setModelCategoriesTemplate: (
    modelCategoriesTemplate: IModelCategory[][],
  ) => void;
};

type UseChainStore = UseChainSlice;

const useChainSlice: StateCreator<UseChainSlice> = (set) => ({
  modelCategories: [],
  setModelCategories: (modelCategories) => set({ modelCategories }),

  modelCategoriesTemplate: [],
  setModelCategoriesTemplate: (modelCategoriesTemplate) =>
    set({ modelCategoriesTemplate }),
});

const useChainStore = create<UseChainStore>((...set) => ({
  ...useChainSlice(...set),
}));

export default useChainStore;
