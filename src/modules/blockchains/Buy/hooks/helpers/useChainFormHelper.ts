import React from 'react';
import useChainFormStore from '../../stores/useChainFormStore';

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

  const isAllRequiredFieldsFilled = React.useMemo(() => {
    const requiredFields = chainFields.filter(
      (field) => field.category.required,
    );

    return requiredFields.every((field) => field.dragged);
  }, [chainFields]);

  return {
    isAnyFieldNeedContactUs,
    currentNetwork,
    isAllRequiredFieldsFilled,
  };
};

export default useChainFormHelper;
