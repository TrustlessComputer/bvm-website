import React from 'react';
import useChainFormStore, { ChainField } from '../../stores/useChainFormStore';
import { IModelCategory, IModelOption } from '@/types/customize-model';
import { cloneDeep } from '../../utils';

const useChainFormHelper = () => {
  const chainFields = useChainFormStore((state) => state.chainFields);

  const isAnyFieldNeedContactUs = React.useMemo(() => {
    for (const field of chainFields) {
      const isFieldNeedContactUs = field.category.options.some(
        (option) => option.needContactUs,
      );
      const isFieldDragged = field.dragged;

      if (isFieldNeedContactUs && isFieldDragged) {
        return true;
      }
    }

    return false;
  }, [chainFields]);

  const currentNetwork = React.useMemo(() => {
    const network = chainFields.find(
      (field) => field.category.key === 'network',
    );
    if (!network) return null;

    const currentOption = network.category.options[0];
    if (!currentOption) return null;

    return currentOption.key;
  }, [chainFields]);
  const currentLayer = React.useMemo(() => {
    const layer = chainFields.find((field) => field.category.key === 'layers');
    if (!layer) return null;

    const currentOption = layer.category.options[0];
    if (!currentOption) return null;
    return currentOption.key;
  }, [chainFields]);

  const isAllRequiredFieldsFilled = React.useMemo(() => {
    const requiredFields = chainFields.filter(
      (field) => field.category.required,
    );

    return requiredFields.every((field) => field.dragged);
  }, [chainFields]);

  const isDisabledOption = React.useCallback(
    (category: IModelCategory, option: IModelOption) => {
      if (!currentNetwork || !currentLayer) return false;

      const isOptionSupportBothNetwork = option.supportNetwork === 'both';
      const isOptionSupportCurrentNetwork =
        option.supportNetwork === currentNetwork;
      const isOptionSupportCurrentLayer =
        option.supportLayers?.includes(currentLayer) || true;

      return (
        (!isOptionSupportBothNetwork && !isOptionSupportCurrentNetwork) ||
        !isOptionSupportCurrentLayer ||
        !option.selectable ||
        category.disable
      );
    },
    [currentNetwork, currentLayer, chainFields],
  );

  const processField = React.useCallback(
    (chainField: ChainField) => {
      const fieldClone = cloneDeep(chainField);
      const { category } = chainField;

      if (
        category.key === 'network' ||
        category.key === 'layers' ||
        !currentNetwork ||
        !currentLayer
      )
        return fieldClone;

      const newOptions = category.options.map((option) => {
        const isDisabled = isDisabledOption(category, option);
        return {
          ...option,
          disabled: isDisabled,
        };
      });

      fieldClone.category.options = newOptions;

      return fieldClone;
    },
    [currentNetwork, currentLayer],
  );

  const shouldCalcPrice = React.useCallback((chainField: ChainField) => {
    return chainField.dragged;
  }, []);

  return {
    isAnyFieldNeedContactUs,
    currentNetwork,
    isAllRequiredFieldsFilled,
    processField,
    isDisabledOption,
    shouldCalcPrice,
  };
};

export default useChainFormHelper;
