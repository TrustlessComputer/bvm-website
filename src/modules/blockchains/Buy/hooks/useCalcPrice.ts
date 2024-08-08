import React from 'react';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';

export default function useCalcPrice() {
  const { field, setPriceBVM, setPriceUSD, setNeedContactUs } =
    useOrderFormStoreV3();

  const { parsedCategories, categories } = useModelCategoriesStore();

  const isAnyOptionNeedContactUs = () => {
    if (!categories) return false;
    for (const _field of categories) {
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

  const calculatePriceUSD = () => {
    return Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = parsedCategories?.find((i) => i.key === key);
          if (!item) return 0;
          const currentOption = item.options.find(
            (option) => option.key === value,
          );
          if (!currentOption) return 0;
          const isDisabled = isOptionDisabled(item, currentOption);
          if (isDisabled) return 0;
          return currentOption.priceUSD || 0;
        });
        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = parsedCategories?.find((i) => i.key === key);
      if (!item) return acc;
      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );
      if (!currentOption) return acc;
      const isDisabled = isOptionDisabled(item, currentOption);
      if (isDisabled) return acc;
      return acc + (currentOption?.priceUSD || 0);
    }, 0);
  };

  const calculatePriceBVM = () => {
    return Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = parsedCategories?.find((i) => i.key === key);
          if (!item) return 0;
          const currentOption = item.options.find(
            (option) => option.key === value,
          );
          if (!currentOption) return 0;
          const isDisabled = isOptionDisabled(item, currentOption);
          if (isDisabled) return 0;
          return currentOption.priceBVM || 0;
        });
        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = parsedCategories?.find((i) => i.key === key);
      if (!item) return acc;
      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );
      if (!currentOption) return acc;
      const isDisabled = isOptionDisabled(item, currentOption);
      if (isDisabled) return acc;
      return acc + (currentOption?.priceBVM || 0);
    }, 0);
  };

  const isOptionDisabled = (item: any, currentOption: any) => {
    return (
      !!(
        currentOption.supportLayer &&
        currentOption.supportLayer !== 'both' &&
        currentOption.supportLayer !== field['layers']?.value
      ) ||
      !!(
        currentOption.supportNetwork &&
        currentOption.supportNetwork !== 'both' &&
        currentOption.supportNetwork !== field['network']?.value
      ) ||
      (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
      (item.required && !field[item.key].dragged) ||
      item.disable ||
      !currentOption.selectable
    );
  };

  React.useEffect(() => {
    const priceUSD = calculatePriceUSD();
    const priceBVM = calculatePriceBVM();
    setPriceBVM(priceBVM);
    setPriceUSD(priceUSD);
    setNeedContactUs(isAnyOptionNeedContactUs());

    if (!categories) return;

    // save history of form
    const dynamicForm: any[] = [];
    for (const _field of categories) {
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
