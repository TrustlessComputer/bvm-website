import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import ModalVideo from 'react-modal-video';
import { EdgeBase, NodeBase, NodeChange } from '@xyflow/system';
import Image from 'next/image';
import { getModelCategories, getTemplates } from '@/services/customize-model';
import BoxOptionV3 from './components3/BoxOptionV3';
import ComputerNameInput from './components3/ComputerNameInput';
import Draggable from './components3/Draggable';
import DroppableV2 from './components3/DroppableV2';
import LaunchButton from './components3/LaunchButton';
import LegoParent from './components3/LegoParent';
import LegoV3 from './components3/LegoV3';
import SidebarV2 from './components3/SideBarV2';
import useOrderFormStoreV3, { useCaptureStore } from './stores/index_v3';
import useDragMask from './stores/useDragMask';
import s from './styles_v6.module.scss';
import {
  cloneDeep,
  DragUtil,
  FormDappUtil,
  hasValue,
  MouseSensor,
} from './utils';
import { formatCurrencyV2 } from '@/utils/format';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import ErrorModal from './components3/ErrorModal';
// import { mockupOptions } from './Buy.data';
import Capture from '@/modules/blockchains/Buy/Capture';
import Label from './components3/Label';
import { TABS } from './constants';
import ExplorePage from './Explore';
import { mockupOptions } from './Buy.data';
import { FieldModel, IModelCategory } from '@/types/customize-model';
import {
  applyNodeChanges,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
} from '@xyflow/react';
import CustomNode from './component4/CustomNode';
import useModelCategoriesStore from './stores/useModelCategoriesStore';
import useDragStore from './stores/useDragStore';
import AddBoxButton from '@/modules/blockchains/Buy/component4/AddBoxButton';
import { showValidateError } from '@/components/toast';
import useDappsStore, { subScribeDropEnd } from './stores/useDappStore';
import useDapps from './hooks/useDapps';
import {
  blockDraggingSignal,
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  idBlockErrorSignal,
} from './signals/useDragSignal';
import { dappMockupData } from './mockup_3';
import { removeItemAtIndex } from '../dapp/utils';
import { FieldKeyPrefix } from './contants';
import { formDappSignal } from './signals/useFormDappsSignal';
import Droppable from '../dapp/components/Droppable';
import BoxOption from './component4/BoxOption';
import RightDroppable from './component4/RightDroppable';
import DragMask from './component4/DragMask';
import Button from '../dapp/components/Button';
import DroppableMask from '@/modules/blockchains/Buy/component4/DroppableMask';
import { mouseDroppedPositionSignal } from './signals/useMouseDroppedPosition';
import useScreenMouse from './hooks/useScreenMouse';
import StudioControls from '@/modules/blockchains/Buy/studio/Controls';
import OverlayControl from '@/modules/blockchains/Buy/studio/OverlayControl';
import WorkArea from '@/modules/blockchains/Buy/studio/WorkArea';
import ErrorMessage from '@/modules/blockchains/Buy/studio/ErrorMessage';
import VideoEducation from '@/modules/blockchains/Buy/studio/VideoEducation';
import useHandleDragging from '@/modules/blockchains/Buy/hooks/useHandleDragging';
// import { Button } from '@chakra-ui/react';
const BuyPage = () => {
  const router = useRouter();

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);

  const {
    parsedCategories: data,
    setParsedCategories: setData,
    categories: originalData,
    setCategories: setOriginalData,
  } = useModelCategoriesStore();
  const { draggedFields, setDraggedFields } = useDragStore();
  const { dapps, setDapps } = useDappsStore();

  const [templates, setTemplates] = React.useState<Array<
    IModelCategory[]
  > | null>(null);

  const {
    field,
    setField,
    priceBVM,
    priceUSD,
    setPriceBVM,
    setPriceUSD,
    setNeedContactUs,
    needContactUs,
  } = useOrderFormStoreV3();
  const mousePositionRef = React.useRef({ x: 0, y: 0 });

  const [tabActive, setTabActive] = React.useState<TABS>(TABS.CODE);

  const { idDragging, setIdDragging, rightDragging, setRightDragging } =
    useDragMask();
  const searchParams = useSearchParams();
  const refTime = useRef<NodeJS.Timeout>();

  const [isShowModal, setIsShowModal] = React.useState(false);
  const [currentPackage, setCurrentPackage] = React.useState<number | null>(
    null,
  );
  const [isShowVideo, setIsShowVideo] = React.useState<boolean>(true);
  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);
  const { isCapture } = useCaptureStore();
  const { l2ServiceUserAddress } = useWeb3Auth();
  const { addListeners, removeListeners } = useScreenMouse({
    handleOnTick: tick,
  });

  const {
    baseModuleFieldMapping,
    blockFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
  } = useDapps();

  const isTabCode = React.useMemo(() => {
    return tabActive === TABS.CODE;
  }, [tabActive]);

  const cloneItemCallback = (template: IModelCategory[]) => {
    setTabActive(TABS.CODE);
    setDraggedFields([]);
    setIsShowModal(false);
    setTemplateDataClone(template || []);
  };

  function tick(
    contentRect: DOMRect,
    mousePosition: {
      x: number;
      y: number;
    },
    previousMousePosition: {
      x: number;
      y: number;
    },
  ) {
    mousePositionRef.current = mousePosition;
  }

  const getAllOptionKeysOfItem = (item: FieldModel) => {
    const result: string[] = [];

    const loop = (options: FieldModel[]) => {
      for (const option of options) {
        if (option.type !== '') result.push(option.key);

        if (option.options.length > 0) {
          loop(option.options);
        }
      }
    };

    loop(item.options);

    return result;
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

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;
    setDraggedFields([]);
    setCurrentPackage(Number(packageId));

    // set default value for package
    const templateData = (templates?.[Number(packageId)] ||
      []) as IModelCategory[];
    const fieldsNotInTemplate = data?.filter(
      (item) => !templateData.find((temp) => temp.key === item.key),
    );

    const _draggedFields: string[] = [];
    templateData.forEach((_field) => {
      if (_field.multiChoice) {
        setField(
          _field.key,
          _field.options.map((option) => option.key),
          _field.options[0] ? true : false,
        );
      } else {
        setField(
          _field.key,
          _field.options[0].key || null,
          _field.options[0] ? true : false,
        );
      }

      _draggedFields.push(_field.key);
    });
    setDraggedFields(_draggedFields);

    fieldsNotInTemplate?.forEach((field) => {
      setField(field.key, null, false);
    });
  };

  const setTemplateDataClone = (data: IModelCategory[]) => {
    // set default value for package
    const templateData = data;
    const fieldsNotInTemplate = data?.filter(
      (item) => !templateData.find((temp) => temp.key === item.key),
    );

    const _draggedFields: string[] = [];
    templateData.forEach((_field) => {
      if (_field.multiChoice) {
        setField(
          _field.key,
          _field.options.map((option) => option.key),
          _field.options[0] ? true : false,
        );
      } else {
        setField(
          _field.key,
          _field.options[0].key || null,
          _field.options[0] ? true : false,
        );
      }

      _draggedFields.push(_field.key);
    });
    setDraggedFields(_draggedFields);

    fieldsNotInTemplate?.forEach((field) => {
      setField(field.key, null, false);
    });
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

  const isAnyOptionNeedContactUs = () => {
    if (!originalData) return false;
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        for (const value of field[_field.key].value as string[]) {
          const option = _field.options.find((opt) => opt.key === value);

          if (option?.needContactUs) {
            return true;
          }
        }
      }

      const option = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      if (option?.needContactUs) {
        return true;
      }
    }

    return false;
  };

  React.useEffect(() => {
    data?.forEach((item) => {
      if (item.multiChoice) {
        const currentValues = (field[item.key].value || []) as string[];
        const newValues = currentValues.filter((value) => {
          const option = item.options.find((opt) => opt.key === value);

          if (!option) return false;

          const isDisabled =
            !!(
              option.supportLayer &&
              option.supportLayer !== 'both' &&
              option.supportLayer !== field['layers']?.value
            ) ||
            !!(
              option.supportNetwork &&
              option.supportNetwork !== 'both' &&
              option.supportNetwork !== field['network']?.value
            ) ||
            !option.selectable;

          return !isDisabled;
        });

        if (newValues.length === 0) {
          setField(item.key, null, false);
          return;
        }

        setField(item.key, newValues, field[item.key].dragged);
        return;
      }

      const newDefaultValue = item.options.find(
        (option) =>
          (option.supportLayer === field['layers']?.value ||
            option.supportLayer === 'both' ||
            !option.supportLayer) &&
          (option.supportNetwork === field['network']?.value ||
            option.supportNetwork === 'both' ||
            !option.supportNetwork) &&
          option.selectable &&
          !item.disable,
      );
      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!newDefaultValue) {
        setField(item.key, null, false);
        return;
      }

      if (!currentOption) return;

      if (
        (currentOption.supportLayer === field['layers']?.value ||
          currentOption.supportLayer === 'both' ||
          !currentOption.supportLayer) &&
        (currentOption.supportNetwork === field['network']?.value ||
          currentOption.supportNetwork === 'both' ||
          !currentOption.supportNetwork) &&
        currentOption.selectable &&
        !item.disable
      )
        return;
      setField(item.key, newDefaultValue.key, field[item.key].dragged);
    });
  }, [field['network']?.value, field['layers']?.value]);

  React.useEffect(() => {
    fetchData();
    addListeners();

    return () => {
      removeListeners;
    };
  }, []);

  const initTemplate = (crPackage?: number) => {
    const packageId =
      typeof crPackage !== 'undefined'
        ? crPackage
        : searchParams.get('use-case') || '-1';

    const oldForm = localStorage.getItem('bvm.customize-form') || `[]`;
    const form = JSON.parse(oldForm) as IModelCategory[];

    if (form.length === 0 || packageId !== '-1') {
      setValueOfPackage(Number(packageId));
    } else {
      for (const key in field) {
        setField(key, null, false);
      }
    }
  };

  React.useEffect(() => {
    initTemplate(0);
  }, [templates]);

  React.useEffect(() => {
    const priceUSD = Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = data?.find((i) => i.key === key);

          if (!item) return 0;

          const currentOption = item.options.find(
            (option) => option.key === value,
          );

          if (!currentOption) return 0;

          const isDisabled =
            // prettier-ignore
            !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
            // prettier-ignore
            !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
            // prettier-ignore
            (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
            (item.required && !field[item.key].dragged) ||
            item.disable ||
            !currentOption.selectable;

          if (isDisabled) return 0;

          return currentOption.priceUSD || 0;
        });

        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = data?.find((i) => i.key === key);

      if (!item) return acc;

      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!currentOption) return acc;

      const isDisabled =
        // prettier-ignore
        !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
        // prettier-ignore
        !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
        // prettier-ignore
        (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
        (item.required && !field[item.key].dragged) ||
        item.disable ||
        !currentOption.selectable;

      if (isDisabled) return acc;

      return acc + (currentOption?.priceUSD || 0);
    }, 0);

    const priceBVM = Object.keys(field).reduce((acc, key) => {
      if (Array.isArray(field[key].value)) {
        const currentOptions = (field[key].value as string[])!.map((value) => {
          const item = data?.find((i) => i.key === key);

          if (!item) return 0;

          const currentOption = item.options.find(
            (option) => option.key === value,
          );

          if (!currentOption) return 0;

          const isDisabled =
            // prettier-ignore
            !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
            // prettier-ignore
            !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
            // prettier-ignore
            (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
            (item.required && !field[item.key].dragged) ||
            item.disable ||
            !currentOption.selectable;

          if (isDisabled) return 0;

          return currentOption.priceBVM || 0;
        });

        return acc + currentOptions.reduce((a, b) => a + b, 0);
      }

      const item = data?.find((i) => i.key === key);

      if (!item) return acc;

      const currentOption = item.options.find(
        (option) => option.key === field[item.key].value,
      );

      if (!currentOption) return acc;

      const isDisabled =
        // prettier-ignore
        !!(currentOption.supportLayer && currentOption.supportLayer !== 'both' && currentOption.supportLayer !== (field['layers']?.value)) ||
        // prettier-ignore
        !!(currentOption.supportNetwork && currentOption.supportNetwork !== 'both' && currentOption.supportNetwork !== field['network']?.value) ||
        // prettier-ignore
        (!item.disable && currentOption.selectable && !field[item.key].dragged) ||
        (item.required && !field[item.key].dragged) ||
        item.disable ||
        !currentOption.selectable;

      if (isDisabled) return acc;

      return acc + (currentOption?.priceBVM || 0);
    }, 0);

    setPriceBVM(priceBVM);
    setPriceUSD(priceUSD);
    setNeedContactUs(isAnyOptionNeedContactUs());

    if (!originalData) return;

    // save history of form
    const dynamicForm: any[] = [];
    for (const _field of originalData) {
      if (!field[_field.key].dragged) continue;

      if (_field.multiChoice) {
        dynamicForm.push({
          ..._field,
          options: _field.options.filter((opt) =>
            (field[_field.key].value as string[])!.includes(opt.key),
          ),
        });
        continue;
      }

      const value = _field.options.find(
        (opt) => opt.key === field[_field.key].value,
      );

      const { options: _, ...rest } = _field;

      dynamicForm.push({
        ...rest,
        options: [value],
      });
    }

    setTimeout(() => {
      if (dynamicForm.length === 0) return;
      localStorage.setItem('bvm.customize-form', JSON.stringify(dynamicForm));
    }, 100);
  }, [field]);

  useEffect(() => {
    const wrapper = document.getElementById('wrapper-data');
    const loop = () => {
      if (wrapper) wrapper.scrollLeft = 0;
    };

    if (idDragging) {
      gsap.ticker.add(loop);
    } else if (refTime.current) {
      if (wrapper) wrapper.scrollLeft = 0;
      gsap.ticker.remove(loop);
    }

    wrapper?.addEventListener('mouseenter', loop);
    return () => {
      if (wrapper) wrapper.scrollLeft = 0;
      gsap.ticker.remove(loop);
      wrapper?.removeEventListener('mouseenter', loop);
    };
  }, [idDragging]);

  const resetEdit = () => {
    setDraggedFields([]);
    setIsShowModal(false);
    initTemplate(0);
  };


  const {handleDragStart, handleDragEnd, sensors} = useHandleDragging();

  return (
    <div
      className={`${s.container} ${isTabCode ? '' : s.explorePageContainer}`}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >

      </DndContext>

    </div>
  );
};

export default BuyPage;
