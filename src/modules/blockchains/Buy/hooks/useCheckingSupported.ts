import React from 'react';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';

export default function useCheckingSupported() {
  const {
    parsedCategories: data,
  } = useModelCategoriesStore();

  const {
    field,
    setField,
  } = useOrderFormStoreV3();


  React.useEffect(() => {
    data?.forEach((item) => {
      if (item.multiChoice) {
        const currentValues = (field[item.key].value || []) as string[];
        const newValues = currentValues.filter((value) => {
          const option = item.options.find((opt) => opt.key === value);

          if (!option) return false;

          const isDisabled =
            !!(
              option.supportLayer &&
              option.supportLayer !== 'both' &&
              option.supportLayer !== field['layers']?.value
            ) ||
            !!(
              option.supportNetwork &&
              option.supportNetwork !== 'both' &&
              option.supportNetwork !== field['network']?.value
            ) ||
            !option.selectable;

          return !isDisabled;
        });

        if (newValues.length === 0) {
          setField(item.key, null, false);
          return;
        }

        setField(item.key, newValues, field[item.key].dragged);
        return;
      }

      const newDefaultValue = item.options.find(
        (option) =>
          (option.supportLayer === field['layers']?.value ||
            option.supportLayer === 'both' ||
            !option.supportLayer) &&
          (option.supportNetwork === field['network']?.value ||
            option.supportNetwork === 'both' ||
            !option.supportNetwork) &&
          option.selectable &&
          !item.disable,
      );
      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!newDefaultValue) {
        setField(item.key, null, false);
        return;
      }

      if (!currentOption) return;

      if (
        (currentOption.supportLayer === field['layers']?.value ||
          currentOption.supportLayer === 'both' ||
          !currentOption.supportLayer) &&
        (currentOption.supportNetwork === field['network']?.value ||
          currentOption.supportNetwork === 'both' ||
          !currentOption.supportNetwork) &&
        currentOption.selectable &&
        !item.disable
      )
        return;
      setField(item.key, newDefaultValue.key, field[item.key].dragged);
    });
  }, [field['network']?.value, field['layers']?.value]);
}
