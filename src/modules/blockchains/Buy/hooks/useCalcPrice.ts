import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import { IModelOption } from '@/types/customize-model';
import React from 'react';
import { shouldCalcPrice } from '../utils';

export default function useCalcPrice() {
  const field = useOrderFormStoreV3((state) => state.field);
  const setPriceBVM = useOrderFormStoreV3((state) => state.setPriceBVM);
  const setPriceUSD = useOrderFormStoreV3((state) => state.setPriceUSD);
  const setNeedContactUs = useOrderFormStoreV3(
    (state) => state.setNeedContactUs,
  );

  const parsedCategories = useModelCategoriesStore(
    (state) => state.parsedCategories,
  );
  const categories = useModelCategoriesStore((state) => state.categories);

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

  const calculatePriceByKey = (calcKeys: (keyof IModelOption)[]) => {
    return Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = parsedCategories?.find((i) => i.key === key);
          if (!item) return 0;

          const currentOption = item.options.find(
            (option) => option.key === value,
          );
          if (!currentOption) return 0;

          const isDisabled = !shouldCalcPrice(field, item, currentOption);
          if (isDisabled) return 0;

          const keyHavePrice = calcKeys.find(
            (calcKey) => typeof currentOption[calcKey] === 'number',
          );
          if (!keyHavePrice) return 0;

          // console.log('[useCalcPrice] calculatePriceByKey multiChoice', {
          //   key,
          //   currentOption,
          //   keyHavePrice,
          //   price: currentOption[keyHavePrice],
          // });

          return currentOption[keyHavePrice] || 0;
        });

        // @ts-ignore
        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = parsedCategories?.find((i) => i.key === key);
      if (!item) return acc;

      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );
      if (!currentOption) return acc;

      const isDisabled = !shouldCalcPrice(field, item, currentOption);
      if (isDisabled) return acc;

      const keyHavePrice = calcKeys.find(
        (calcKey) => typeof currentOption[calcKey] === 'number',
      );
      if (!keyHavePrice) return acc;

      // console.log('[useCalcPrice] calculatePriceByKey single', {
      //   key,
      //   currentOption,
      //   keyHavePrice,
      //   price: currentOption[keyHavePrice],
      // });

      // @ts-ignore
      return acc + (currentOption[keyHavePrice] || 0);

      // if (typeof currentOption[calcKey] !== 'number') return acc;

      // return acc + (currentOption?.[calcKey] || 0);
    }, 0);
  };

  React.useEffect(() => {
    const calcBVMKeys: (keyof IModelOption)[] = ['priceBVM'];
    const calcUSDKeys: (keyof IModelOption)[] = ['priceUSD'];

    if (field['network']?.value === 'testnet') {
      calcBVMKeys.unshift('priceBVMTestnet');
      calcUSDKeys.unshift('priceUSDTestnet');
    }

    const priceUSD = calculatePriceByKey(calcUSDKeys);
    const priceBVM = calculatePriceByKey(calcBVMKeys);
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
