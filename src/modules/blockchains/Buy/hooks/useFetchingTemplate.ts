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
  const {
    setParsedCategories,
    setCategories,
    setCategoriesTemplates,
    categoriesTemplates,
  } = useModelCategoriesStore();
  const { setField } = useOrderFormStoreV3();
  const { l2ServiceUserAddress } = useWeb3Auth();
  const { initTemplate } = useTemplate();

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
      // getModelCategories('0x4113ed747047863Ea729f30C1164328D9Cc8CfcF'),
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

    setParsedCategories(convertData(sortedCategories));
    setCategories(sortedCategories);
    setCategoriesTemplates(templates);
    setNodes([
      {
        id: 'blockchain',
        type: 'chainNode',
        data: {
          label: 'Blockchain',
          status: 'Ready',
          isChain: true,
        },
        dragHandle: '.drag-handle-area',
        position: { x: 30, y: 30 },
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
  }, [categoriesTemplates]);
}
