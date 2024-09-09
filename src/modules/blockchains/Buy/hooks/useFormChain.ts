import { uniqBy } from 'lodash';

import { IModelCategory, IModelOption } from '@/types/customize-model';
import useOrderFormStoreV3 from '../stores/index_v3';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import { chainKeyToDappKey } from '../utils';
import useFormDappToFormChain from './useFormDappToFormChain';

const useFormChain = () => {
  const { categories } = useModelCategoriesStore();
  const { field } = useOrderFormStoreV3();
  const { dappCount } = useFormDappToFormChain();

  console.log('[useFormChain] field', field);

  const getDynamicForm = () => {
    if (!categories) {
      return {
        dynamicForm: [],
        allOptionKeyDragged: [],
        allRequiredForKey: [],
        optionMapping: {},
      };
    }

    const ignoreKeys = ['bridge_apps', 'wallet', 'gaming_apps'];
    const dynamicForm: IModelCategory[] = [];
    const optionMapping: Record<string, IModelOption> = {};
    const allOptionKeyDragged: string[] = [];
    const allRequiredForKey: string[] = [];

    for (const _field of categories) {
      if (!_field.isChain && !ignoreKeys.includes(_field.key)) continue;

      _field.options.forEach((opt: IModelOption) => {
        optionMapping[opt.key] = opt;
      });

      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        const options = _field.options.filter((opt: IModelOption) =>
          (field[_field.key].value as string[])!.includes(opt.key),
        );
        options.forEach((opt: IModelOption) => {
          allOptionKeyDragged.push(opt.key);
          allRequiredForKey.push(...(opt.requiredFor || []));
        });

        dynamicForm.push({
          ..._field,
          options,
        });
        continue;
      }

      const value = _field.options.find(
        (opt: IModelOption) => opt.key === field[_field.key].value,
      );

      if (!value) continue;

      allOptionKeyDragged.push(value.key);
      allRequiredForKey.push(...(value.requiredFor || []));

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        options: [value],
      });
    }

    for (const _field of categories) {
      if (_field.isChain) continue;

      for (const opt of _field.options) {
        if (dappCount[chainKeyToDappKey(opt.key)]) {
          const opts = new Array(dappCount[chainKeyToDappKey(opt.key)]).fill(
            opt,
          );

          const fieldAlreadyInDynamicForm = dynamicForm.find(
            (field) => field.key === _field.key,
          );

          if (fieldAlreadyInDynamicForm) {
            fieldAlreadyInDynamicForm.options.push(...opts);
          } else {
            dynamicForm.push({
              ..._field,
              options: opts,
            });
          }
        }
      }
    }

    dynamicForm.forEach((field) => {
      field.options = uniqBy(field.options, 'key');
    });

    console.log('[useFormChain] getDynamicForm', dynamicForm);

    return {
      dynamicForm,
      allOptionKeyDragged,
      allRequiredForKey,
      optionMapping,
    };
  };

  const getCurrentFieldFromChain = (
    key: string,
  ): IModelCategory | undefined => {
    const { dynamicForm } = getDynamicForm();

    return dynamicForm.find((field) => field.key === key);
  };

  return {
    getDynamicForm,
    getCurrentFieldFromChain,
  };
};

export default useFormChain;
