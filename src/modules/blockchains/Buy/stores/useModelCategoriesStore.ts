import { IModelCategory } from '@/types/customize-model';
import { create } from 'zustand';

type UseModelCategoriesStore = {
  parsedCategories:
    | (IModelCategory & {
        options: IModelCategory['options'] &
          {
            value: any;
            label: string;
            disabled: boolean;
          }[];
      })[]
    | null;
  setParsedCategories: (
    parsedCategories: UseModelCategoriesStore['parsedCategories'],
  ) => void;

  categories: IModelCategory[] | null;
  setCategories: (categories: UseModelCategoriesStore['categories']) => void;
};

const useModelCategoriesStore = create<UseModelCategoriesStore>((set) => ({
  parsedCategories: null,
  setParsedCategories: (parsedCategories) => set({ parsedCategories }),

  categories: null,
  setCategories: (categories) => set({ categories }),
}));

export default useModelCategoriesStore;
