import React from 'react';
import { useOrderFormStore } from '../stores/index_v2';
import useOrderFormStoreV3 from '../stores/index_v3';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';

const useCheckAllFilled = () => {
  const parsedCategories = useModelCategoriesStore(
    (state) => state.parsedCategories,
  );

  const field = useOrderFormStoreV3((state) => state.field);

  const { chainName } = useOrderFormStore();

  const allFilled = React.useMemo(() => {
    return !!(
      !!chainName.trim() &&
      parsedCategories?.every((item) => {
        return (
          (field[item.key].dragged && item.required) ||
          item.disable ||
          !item.required
        );
      })
    );
  }, [chainName, field]);

  return {
    allFilled,
  };
};

export default useCheckAllFilled;
