import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import { IModelCategory } from '@/types/customize-model';
import React from 'react';
import { isChainOptionDisabled } from '../utils';

export default function useCheckingSupported() {
  const { parsedCategories } = useModelCategoriesStore();
  const { field, setField } = useOrderFormStoreV3();

  React.useEffect(() => {
    parsedCategories?.forEach((item) => {
      if (item.multiChoice) {
        handleMultiChoice(item);
      } else {
        handleSingleChoice(item);
      }
    });
  }, [field['network']?.value, field['layers']?.value]);

  function handleMultiChoice(item: IModelCategory) {
    const currentValues = (field[item.key].value || []) as string[];

    if (field[item.key].value === null || !field[item.key].dragged) return;

    const newValues = currentValues.filter((value) => {
      const option = item.options.find((opt) => opt.key === value);

      if (!option) return false;

      return !isChainOptionDisabled(field, item, option);
    });

    if (newValues.length === 0) {
      setField(item.key, null, false);
      return;
    }

    setField(item.key, newValues, field[item.key].dragged);
  }

  function handleSingleChoice(item: IModelCategory) {
    if (item.key === 'network' || item.key === 'layers') return;

    const newDefaultValue = item.options.filter((option) => {
      return !isChainOptionDisabled(field, item, option);
    })[0];

    const currentOption = item.options.find(
      (option) => option.key === field[item.key].value,
    );

    if (!currentOption || !isChainOptionDisabled(field, item, currentOption))
      return;

    if (typeof newDefaultValue === 'undefined') {
      setField(item.key, null, false);
      return;
    }

    setField(item.key, newDefaultValue.key, field[item.key].dragged);
  }
}
