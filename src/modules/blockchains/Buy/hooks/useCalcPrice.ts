import React from 'react';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';

export default function useCalcPrice() {
  const {
    field,
    setField,
    priceBVM,
    priceUSD,
    setPriceBVM,
    setPriceUSD,
    setNeedContactUs,
    needContactUs,
  } = useOrderFormStoreV3();

  const {
    parsedCategories: data,
    setParsedCategories: setData,
    categories: originalData,
    setCategories: setOriginalData,
  } = useModelCategoriesStore();

  const isAnyOptionNeedContactUs = () => {
    if (!originalData) return false;
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        for (const value of field[_field.key].value as string[]) {
          const option = _field.options.find((opt) => opt.key === value);

          if (option?.needContactUs) {
            return true;
          }
        }
      }

      const option = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      if (option?.needContactUs) {
        return true;
      }
    }

    return false;
  };

  React.useEffect(() => {
    const priceUSD = Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = data?.find((i) => i.key === key);

          if (!item) return 0;

          const currentOption = item.options.find(
            (option) => option.key === value,
          );

          if (!currentOption) return 0;

          const isDisabled =
            // prettier-ignore
            !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
            // prettier-ignore
            !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
            // prettier-ignore
            (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
            (item.required && !field[item.key].dragged) ||
            item.disable ||
            !currentOption.selectable;

          if (isDisabled) return 0;

          return currentOption.priceUSD || 0;
        });

        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = data?.find((i) => i.key === key);

      if (!item) return acc;

      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!currentOption) return acc;

      const isDisabled =
        // prettier-ignore
        !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
        // prettier-ignore
        !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
        // prettier-ignore
        (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
        (item.required && !field[item.key].dragged) ||
        item.disable ||
        !currentOption.selectable;

      if (isDisabled) return acc;

      return acc + (currentOption?.priceUSD || 0);
    }, 0);

    const priceBVM = Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = data?.find((i) => i.key === key);

          if (!item) return 0;

          const currentOption = item.options.find(
            (option) => option.key === value,
          );

          if (!currentOption) return 0;

          const isDisabled =
            // prettier-ignore
            !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
            // prettier-ignore
            !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
            // prettier-ignore
            (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
            (item.required && !field[item.key].dragged) ||
            item.disable ||
            !currentOption.selectable;

          if (isDisabled) return 0;

          return currentOption.priceBVM || 0;
        });

        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = data?.find((i) => i.key === key);

      if (!item) return acc;

      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!currentOption) return acc;

      const isDisabled =
        // prettier-ignore
        !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
        // prettier-ignore
        !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
        // prettier-ignore
        (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
        (item.required && !field[item.key].dragged) ||
        item.disable ||
        !currentOption.selectable;

      if (isDisabled) return acc;

      return acc + (currentOption?.priceBVM || 0);
    }, 0);

    setPriceBVM(priceBVM);
    setPriceUSD(priceUSD);
    setNeedContactUs(isAnyOptionNeedContactUs());

    if (!originalData) return;

    // save history of form
    const dynamicForm: any[] = [];
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        dynamicForm.push({
          ..._field,
          options: _field.options.filter((opt) =>
            (field[_field.key].value as string[])!.includes(opt.key),
          ),
        });
        continue;
      }

      const value = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        options: [value],
      });
    }

    setTimeout(() => {
      if (dynamicForm.length === 0) return;
      localStorage.setItem('bvm.customize-form', JSON.stringify(dynamicForm));
    }, 100);
  }, [field]);
}
