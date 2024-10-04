import { useSearchParams } from 'next/navigation';
import React from 'react';
import useChainFormStore from '../../stores/useChainFormStore';
import { IModelCategory } from '@/types/customize-model';

const useChainTemplateHelper = () => {
  const setChainFields = useChainFormStore((state) => state.setChainFields);

  const setTemplate = (template: IModelCategory[]) => {
    const chainFields = template.map((category) => {
      return {
        dragged: category.options.length > 0,
        category,
      };
    });

    setChainFields(chainFields);
  };

  return {
    setTemplate,
  };
};

export default useChainTemplateHelper;
