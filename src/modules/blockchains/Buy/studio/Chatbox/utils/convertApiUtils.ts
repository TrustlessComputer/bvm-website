import { IModelCategory } from '@/types/customize-model';
import { PromptCategory } from '../types';

export const modelCategoryToPromptCategory = (
  modelCategory: IModelCategory,
): PromptCategory => {
  return {
    key: modelCategory.key,
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

export const blockLegoResponseToModelCategory = (
  categories: IModelCategory[],
  blockLego: Record<string, string[]>,
): IModelCategory[] => {
  return Object.keys(blockLego)
    .filter((key) => !!categories.find((category) => category.key === key))
    .map((key) => {
      const category = categories.find((category) => category.key === key)!;

      return {
        ...category,
        options: category.options.filter((option) =>
          blockLego[key].includes(option.key),
        ),
      };
    });
};

export const parseAIResponse = (response: string) => {
  const message: {
    content: string;
    type: 'text' | 'json';
  }[] = [];
  const paragraphs = response.split('\n');
  const codeBlockRegex = /```(?:json)?([\s\S]*?)```/g;

  paragraphs.forEach((paragraph) => {
    const jsonString = paragraph.match(codeBlockRegex);
    if (jsonString && jsonString.length > 0) {
      message.push({
        content: jsonString[0].replace('```json', '').replace('```', ''),
        type: 'json',
      });
    } else {
      message.push({
        content: paragraph,
        type: 'text',
      });
    }
  });

  return message;
};
