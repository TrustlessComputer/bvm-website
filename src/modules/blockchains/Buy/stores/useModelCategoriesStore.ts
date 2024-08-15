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

  categoryMapping: Record<string, IModelCategory> | null;
  setCategoryMapping: (
    categoryMapping: UseModelCategoriesStore['categoryMapping'],
  ) => void;

  categoriesTemplates: IModelCategory[][] | null;
  setCategoriesTemplates: (
    categoriesTemplates: UseModelCategoriesStore['categoriesTemplates'],
  ) => void;
};

const useModelCategoriesStore = create<UseModelCategoriesStore>((set) => ({
  parsedCategories: null,
  setParsedCategories: (parsedCategories) => set({ parsedCategories }),

  categories: null,
  setCategories: (categories) => set({ categories }),

  categoryMapping: null,
  setCategoryMapping: (categoryMapping) => set({ categoryMapping }),

  categoriesTemplates: null,
  setCategoriesTemplates: (categoriesTemplates) => set({ categoriesTemplates }),
}));

export default useModelCategoriesStore;
