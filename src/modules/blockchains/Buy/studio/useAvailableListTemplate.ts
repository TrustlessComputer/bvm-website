import { useAppSelector } from '@/stores/hooks';
import { getAvailableListTemplateSelector } from '@/stores/states/l2services/selector';
import { useCallback } from 'react';

//StP (pattern)
let templateIndexDefault = 0;

export default function useAvailableListTemplate() {
  const templateList = useAppSelector(getAvailableListTemplateSelector);

  //Setter
  const setTemplateDefault = (index: number) => {
    //Index Out Of Range
    if (index < 0 || index >= templateList?.length) {
      templateIndexDefault = 0;
    } else {
      templateIndexDefault = index;
    }
  };

  //Getter
  const getTemplateList = useCallback(() => {
    return templateList || [];
  }, [templateList]);

  const getTemplateAtIndex = useCallback(
    (index: number) => {
      const result = templateList[index];

      //[index] Out of range Array, Get default at index  0
      if (!result) return templateList[0];
      return result;
    },
    [templateList],
  );

  // console.log('[useAvailableListTemplate] --- ', {
  //   templateIndexDefault,
  //   templateList,
  // });

  return {
    templateList,
    templateIndexDefault,
    setTemplateDefault,
    getTemplateList,
    getTemplateAtIndex,
  };
}
