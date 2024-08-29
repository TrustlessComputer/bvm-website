import { IModelCategory } from '@/types/customize-model';
import { PromptCategory } from '../types';

export const modelCategoryToPromptCategory = (
  modelCategory: IModelCategory,
): PromptCategory => {
  return {
    layer: modelCategory.key,
    options: modelCategory.options.map((option) => ({
      key: option.key,
      title: option.title,
      value: option.value as string | number,
    })),
  };
};

export const promptCategoryToModelCategory = (
  promptCategory: PromptCategory,
  modelCategory: IModelCategory,
): IModelCategory => {
  return {
    ...modelCategory,
    options: modelCategory.options.filter((option) =>
      promptCategory.options.some((pOption) => pOption.key === option.key),
    ),
  };
};
