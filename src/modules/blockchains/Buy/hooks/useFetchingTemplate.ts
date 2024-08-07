import { dappMockupData } from '@/modules/blockchains/Buy/mockup_3';
import { getModelCategories, getTemplates } from '@/services/customize-model';
import useTemplate from '@/modules/blockchains/Buy/hooks/useTemplate';
import React from 'react';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useDappsStore from '@/modules/blockchains/Buy/stores/useDappStore';
import { useNodesState } from '@xyflow/react';
import useScreenMouse from '@/modules/blockchains/Buy/hooks/useScreenMouse';
import { IModelCategory } from '@/types/customize-model';

export default function useFetchingTemplate() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);

  const mousePositionRef = React.useRef({ x: 0, y: 0 });

  const {
    parsedCategories: data,
    setParsedCategories: setData,
    categories: originalData,
    setCategories: setOriginalData,
  } = useModelCategoriesStore();

  const { field, setField } = useOrderFormStoreV3();

  const { setDapps } = useDappsStore();
  const { l2ServiceUserAddress } = useWeb3Auth();
  const { initTemplate, setTemplates, templates } = useTemplate();
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
    // const modelCategories = mockupOptions;

    const dapps = dappMockupData;
    const [categories, templates] = await Promise.all([
      getModelCategories(l2ServiceUserAddress),
      getTemplates(),
    ]);

    const sortedCategories = (categories || []).sort(
      (a, b) => a.order - b.order,
    );
    sortedCategories.forEach((_field) => {
      setField(_field.key, null);
    });

    const sortedDapps = dapps.sort((a, b) => a.order - b.order);

    console.log('useFetchingTemplate -> sortedCategories', sortedCategories);

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
    setDapps(sortedDapps);
  };

  React.useEffect(() => {
    console.log('nodes', nodes);
  }, [nodes]);

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
