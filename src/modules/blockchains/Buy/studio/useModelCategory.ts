import { useAppSelector } from '@/stores/hooks';
import { getModelCategoriesSelector } from '@/stores/states/l2services/selector';

export default function useModelCategory() {
  const modelCategoryList = useAppSelector(getModelCategoriesSelector);

  //Setter

  //Getter
  return {
    modelCategoryList,
  };
}
