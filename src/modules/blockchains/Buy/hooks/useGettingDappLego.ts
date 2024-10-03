import React from 'react';
import useOrderFormStoreV3 from '../stores/index_v3';
import useDragStore from '../stores/useDragStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import { chainKeyToDappKey, cloneDeep, dappKeyToChainKey } from '../utils';
import useFormDappToFormChain from './useFormDappToFormChain';
import { useChainProvider } from '../../detail_v4/provider/ChainProvider.hook';

const useGettingDappLego = () => {
  const categories = useModelCategoriesStore((state) => state.categories);

  const draggedFields = useDragStore((state) => state.draggedFields);
  const setDraggedFields = useDragStore((state) => state.setDraggedFields);

  const field = useOrderFormStoreV3((state) => state.field);
  const setFields = useOrderFormStoreV3((state) => state.setFields);

  const { dappCount } = useFormDappToFormChain();
  const { order, selectedCategoryMapping } = useChainProvider();

  const setDappLegoToChain = () => {
    if (order && draggedFields.length === 0) return;

    let newDraggedFields = cloneDeep(draggedFields);
    const newField = cloneDeep(field);

    for (const key in dappCount) {
      const _key = dappKeyToChainKey(key);

      for (const category of categories || []) {
        for (const option of category.options) {
          const dappKey = chainKeyToDappKey(option.key);
          if (!dappCount[dappKey] || option.key !== _key) {
            continue;
          }

          if (!newDraggedFields.includes(category.key)) {
            newDraggedFields.push(category.key);

            if (category.multiChoice) {
              newField[category.key].value = [
                ...((newField[category.key].value || []) as any[]),
                option.key,
              ];
              newField[category.key].dragged = true;
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

    const ignoreKeys = ['bridge_apps', 'wallet', 'gaming_apps'];

    // console.log('[useGettingDappLego] 111', { dappCount, newField });

    for (const fieldKey in newField) {
      const category = categories?.find((c) => c.key === fieldKey);

      if (!category || ignoreKeys.includes(category.key) || category.isChain)
        continue;

      if (Array.isArray(newField[fieldKey].value)) {
        const newValues = (newField[fieldKey].value as string[]).filter(
          (v) =>
            !!(
              !!dappCount[chainKeyToDappKey(v)] ||
              selectedCategoryMapping?.[fieldKey]?.options.find(
                (o) => o.key === v,
              )
            ),
        );
        const isEmpty = newValues.length === 0;

        newField[fieldKey].value = isEmpty ? null : newValues;
        newField[fieldKey].dragged = !isEmpty;
      }
    }

    // console.log('[useGettingDappLego] 555', { newField, newDraggedFields });

    setFields(newField);
    setDraggedFields(newDraggedFields);
  };

  React.useEffect(() => {
    setDappLegoToChain();
  }, [dappCount]);
};

export default useGettingDappLego;
