import React from 'react';

import { getModelCategories, getTemplates } from '@/services/customize-model';
import useTemplate from '@/modules/blockchains/Buy/hooks/useTemplate';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useScreenMouse from '@/modules/blockchains/Buy/hooks/useScreenMouse';
import { IModelCategory } from '@/types/customize-model';

import useFlowStore from '../stores/useFlowStore';
import { categoriesMockup } from '../Buy.data';

export default function useFetchingTemplate() {
  const { setNodes } = useFlowStore();
  const { setParsedCategories: setData, setCategories: setOriginalData } =
    useModelCategoriesStore();

  const { setField } = useOrderFormStoreV3();

  const { l2ServiceUserAddress } = useWeb3Auth();
  const { initTemplate, setTemplates, templates } = useTemplate();

  const mousePositionRef = React.useRef({ x: 0, y: 0 });

  const tick = (
    contentRect: DOMRect,
    mousePosition: {
      x: number;
      y: number;
    },
    previousMousePosition: {
      x: number;
      y: number;
    },
  ) => {
    mousePositionRef.current = mousePosition;
  };

  const convertData = (data: IModelCategory[]) => {
    const newData = data?.map((item) => {
      return {
        ...item,
        options: item.options?.map((option) => {
          return {
            ...option,
            value: option.key,
            label: option.title,
            disabled: !option.selectable || item.disable,
          };
        }),
      };
    });

    return newData || [];
  };

  const fetchData = async () => {
    const [categories, templates] = await Promise.all([
      getModelCategories(l2ServiceUserAddress),
      getTemplates(),
    ]);

    // Use mockup data
    // const sortedCategories = (categoriesMockup || []).sort(
    // Use API
    const sortedCategories = (categories || []).sort(
      (a, b) => a.order - b.order,
    );
    sortedCategories.forEach((_field) => {
      setField(_field.key, null);
    });

    setData(convertData(sortedCategories));
    setOriginalData(sortedCategories);
    setTemplates(templates);
    setNodes([
      // @ts-ignore
      {
        id: 'blockchain',
        type: 'customBox',
        data: {
          label: 'Blockchain',
          status: 'Running',
          isChain: true,
        },
        dragHandle: '.drag-handle-area',
        position: { x: 0, y: 0 },
      },
    ]);
  };

  const { addListeners, removeListeners } = useScreenMouse({
    handleOnTick: tick,
  });

  React.useEffect(() => {
    fetchData();
    addListeners();

    return () => {
      removeListeners;
    };
  }, []);

  React.useEffect(() => {
    initTemplate(0);
  }, [templates]);
}
