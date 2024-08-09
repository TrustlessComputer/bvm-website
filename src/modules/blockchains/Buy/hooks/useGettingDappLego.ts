import React from 'react';
import { chainKeyToDappKey, cloneDeep, dappKeyToChainKey } from '../utils';
import useOrderFormStoreV3 from '../stores/index_v3';
import useDragStore from '../stores/useDragStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import useFormDappToFormChain from './useFormDappToFormChain';

const useGettingDappLego = () => {
  const { categories } = useModelCategoriesStore();
  const { draggedFields, setDraggedFields } = useDragStore();

  const { field, setFields } = useOrderFormStoreV3();
  const { dappCount } = useFormDappToFormChain();

  const setDappLegoToChain = () => {
    let newDraggedFields = cloneDeep(draggedFields);
    const newField = cloneDeep(field);

    for (const key in dappCount) {
      const _key = dappKeyToChainKey(key);

      for (const category of categories || []) {
        if (category.isChain) continue;

        for (const option of category.options) {
          if (!dappCount[chainKeyToDappKey(_key)] || option.key !== _key)
            continue;

          if (!newDraggedFields.includes(category.key)) {
            newDraggedFields.push(category.key);

            if (category.multiChoice) {
              newField[category.key].value = [
                ...((newField[category.key].value || []) as any[]),
                option.key,
              ];
            } else {
              newField[category.key].value = option.key;
              newField[category.key].dragged = true;
            }
          } else {
            if (
              category.multiChoice &&
              !(field[category.key].value || ([] as any)).includes(option.key)
            ) {
              newField[category.key].value = [
                ...((newField[category.key].value || []) as any[]),
                option.key,
              ];
              newField[category.key].dragged = true;
            }
          }
        }
      }
    }

    for (const key in newField) {
      const category = categories?.find((i) => i.key === key);

      if (
        !newField[key] ||
        !newField[key].value ||
        !category ||
        category.isChain
      )
        continue;

      if (Array.isArray(newField[key].value)) {
        newField[key].value = ((newField[key].value || []) as string[]).filter(
          (keyAsAValue) => {
            return (
              typeof dappCount[chainKeyToDappKey(keyAsAValue)] === 'number'
            );
          },
        );

        if (newField[key].value.length === 0) {
          newField[key].value = null;
          newField[key].dragged = false;
          newDraggedFields = newDraggedFields.filter((i) => i !== category.key);
        }
      } else {
        if (!dappCount[chainKeyToDappKey(newField[key].value as string)]) {
          newField[key].value = null;
          newField[key].dragged = false;
          newDraggedFields = newDraggedFields.filter((i) => i !== category.key);
        }
      }
    }

    setFields(newField);
    setDraggedFields(newDraggedFields);
  };

  React.useEffect(() => {
    setDappLegoToChain();
  }, [dappCount]);
};

export default useGettingDappLego;
