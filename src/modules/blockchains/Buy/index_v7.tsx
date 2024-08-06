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
import { applyNodeChanges, ReactFlow, ReactFlowProvider } from '@xyflow/react';
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
// import { Button } from '@chakra-ui/react';
const BuyPage = () => {
  const router = useRouter();

  const [nodes, setNodes] = useState<NodeBase[]>([]);

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

  const [tabActive, setTabActive] = React.useState<TABS>(TABS.CODE);

  const { idDragging, setIdDragging, rightDragging, setRightDragging } =
    useDragMask();
  const searchParams = useSearchParams();
  const refTime = useRef<NodeJS.Timeout>();
  const [showShadow, setShowShadow] = useState<string>('');
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [currentPackage, setCurrentPackage] = React.useState<number | null>(
    null,
  );
  const [isShowVideo, setIsShowVideo] = React.useState<boolean>(true);
  const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);
  const { isCapture } = useCaptureStore();
  const { l2ServiceUserAddress } = useWeb3Auth();

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

  const handleDragStart = (event: any) => {
    const { active } = event;

    if (active.data.current.isChain) {
      const [activeKey = '', activeSuffix1 = '', activeSuffix2] =
        active.id.split('-');

      if (activeSuffix2 === 'right') {
        setRightDragging(true);
      }

      setIdDragging(active.id);

      return;
    }
  };

  function handleDragEnd(event: any) {
    if (event.active.data.current.isChain) {
      setIdDragging('');
      setRightDragging(false);

      // router.push('/rollups/customizev2');

      const { over, active } = event;

      // Format ID of single option = <key>-<value>
      // Format ID of parent option = <key>-parent-<suffix>
      const [activeKey = '', activeSuffix1 = '', activeSuffix2] =
        active.id.split('-');
      const [overKey = '', overSuffix1 = '', overSuffix2 = ''] = (
        over?.id || ''
      ).split('-');
      const overIsParentOfActiveDroppable =
        overKey === activeKey && overSuffix1 === 'droppable';
      const overIsFinalDroppable = overKey === 'final';
      const overIsParentDroppable =
        !overIsFinalDroppable &&
        overSuffix1 === 'droppable' &&
        data?.find((item) => item.key === overKey)?.multiChoice;
      const activeIsParent =
        data?.find((item) => item.key === activeKey)?.multiChoice &&
        activeSuffix1 === 'parent';
      const isMultiChoice = data?.find(
        (item) => item.key === activeKey,
      )?.multiChoice;

      if (rightDragging && !overIsFinalDroppable && overSuffix1 === 'right') {
        // swap activeKey, overKey in draggedFields
        const _draggedFields = JSON.parse(JSON.stringify(draggedFields));
        const activeIndex = draggedFields.indexOf(activeKey);
        const overIndex = draggedFields.indexOf(overKey);

        if (activeIndex === -1 || overIndex === -1) return;

        const temp = _draggedFields[activeIndex];
        _draggedFields[activeIndex] = _draggedFields[overIndex];
        _draggedFields[overIndex] = temp;

        setDraggedFields(_draggedFields);

        return;
      }

      if (!isMultiChoice) {
        if (
          active.data.current.value !== field[activeKey].value &&
          field[activeKey].dragged
        ) {
          setShowShadow(field[activeKey].value as string);

          const currentField = data?.find((item) => item.key === activeKey);
          const currentOption = currentField?.options.find(
            (option) => option.key === field[activeKey].value,
          );
          const msg = `You have already chosen ${currentOption?.title} as your ${currentField?.title}. Please remove it before selecting again.`;

          toast.error(msg, {
            icon: null,
            style: {
              borderColor: 'blue',
              color: 'blue',
            },
            duration: 3000,
            position: 'bottom-center',
          });
          setTimeout(() => {
            setShowShadow('');
          }, 500);
          return;
        }

        const isHidden = data?.find((item) => item.key === activeKey)?.hidden;
        if (isHidden) return;

        // Normal case
        if (
          over &&
          (overIsFinalDroppable ||
            (!overIsFinalDroppable && overSuffix1 === 'right'))
        ) {
          setField(activeKey, active.data.current.value, true);

          if (field[activeKey].dragged) return;
          setDraggedFields([...draggedFields, activeKey]);
        } else {
          if (over && overIsParentDroppable) return;

          setField(activeKey, active.data.current.value, false);
          setDraggedFields(
            draggedFields.filter((field) => field !== activeKey),
          );
        }

        return;
      }

      // Active is parent and drag to the left side
      if (
        activeIsParent &&
        (!over || (over && !overIsFinalDroppable && !overIsParentDroppable))
      ) {
        setField(activeKey, [], false);
        setDraggedFields(draggedFields.filter((field) => field !== activeKey));
        return;
      }

      // Multi choice case
      if (
        (over && (overIsFinalDroppable || overIsParentOfActiveDroppable)) ||
        (!overIsFinalDroppable && overSuffix1 === 'right')
      ) {
        const currentValues = (field[activeKey].value || []) as string[];
        const isCurrentEmpty = currentValues.length === 0;
        const newValue = [...currentValues, active.data.current.value];

        if (currentValues.includes(active.data.current.value)) return;

        setField(activeKey, newValue, true);
        isCurrentEmpty && setDraggedFields([...draggedFields, activeKey]);
      } else {
        const currentValues = (field[activeKey].value || []) as string[];
        const newValue = currentValues.filter(
          (value) => value !== active.data.current.value,
        );
        const isEmpty = newValue.length === 0;

        setField(activeKey, newValue, !isEmpty);
        isEmpty &&
          setDraggedFields(
            draggedFields.filter((field) => field !== activeKey),
          );
      }

      return;
    }

    const { over, active } = event;
    subScribeDropEnd.value += 1;
    blockDraggingSignal.value = {
      id: '',
      title: '',
      icon: '',
      background: '',
      dappIndex: -1,
    };

    console.log(
      '🚀 -> file: page.tsx:46 -> handleDragEnd -> over, active ::',
      over,
      active,
    );

    if (!over) return;

    const dappIndex = active.data.current?.dappIndex;
    const thisDapp = dapps[dappIndex];
    const activeId = active.id.toString();
    const overId = over.id.toString();

    let draggedIds2D = cloneDeep(draggedIds2DSignal.value);
    const noBaseBlockInOutput = draggedIds2D.length === 0;
    const canPlaceMoreBase =
      Number(thisDapp.baseBlock.placableAmount) > draggedIds2D.length ||
      thisDapp.baseBlock.placableAmount === -1;
    // const canPlaceMoreBase = draggedIds2D.length === 0;

    const overIsInput = over.id === 'input';
    const overIsOutput = over.id === 'output';
    const overIsABase = DragUtil.idDraggingIsABase(overId);
    const overBaseIndex = Number(DragUtil.getBaseIndex(overId));
    const overIsABlock = DragUtil.idDraggingIsABlock(overId);
    const overIndex = Number(DragUtil.getChildIndex(overId));
    const overOriginalKey = DragUtil.getOriginalKey(overId);

    const activeFromRightSide = DragUtil.isRightSide(activeId);
    const activeFromLeftSide = DragUtil.isLeftSide(activeId);
    const activeIsAChildOfABlock =
      DragUtil.idDraggingIsAChildOfABlock(activeId);
    const activeIsRightSide = DragUtil.isRightSide(activeId);
    const activeIsABase = DragUtil.idDraggingIsABase(activeId);
    const activeIsAModule = DragUtil.idDraggingIsAModule(activeId);
    const activeBaseIndex = Number(DragUtil.getBaseIndex(activeId));
    const activeIsABlock = DragUtil.idDraggingIsABlock(activeId);
    const activeIsASingle = DragUtil.idDraggingIsASingle(activeId);
    const activeIsABaseModule = DragUtil.idDraggingIsABaseModule(activeId);
    const activeIndex = Number(DragUtil.getChildIndex(activeId));
    const activeOriginalKey = DragUtil.getOriginalKey(activeId);
    const activeFieldKey = active.data.current?.fieldKey;

    // Case 0.1: Drag to the block parent
    if (activeFromLeftSide && activeIsAChildOfABlock && overIsABlock) {
      if (activeOriginalKey !== overOriginalKey) {
        showValidateError('Please drag to the same block!');
        return;
      }

      // const composedFieldKey = `right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${activeFieldKey}-${overIndex}-${overBaseIndex}`;
      const composedFieldKey = activeFieldKey;

      if (
        draggedIds2D[overBaseIndex][overIndex].children.some(
          (item) => item.name === composedFieldKey,
        )
      ) {
        showValidateError('This field already exists in the block!');
        return;
      }

      draggedIds2D[overBaseIndex][overIndex] = {
        ...draggedIds2D[overBaseIndex][overIndex],
        children: [
          ...draggedIds2D[overBaseIndex][overIndex].children,
          {
            name: composedFieldKey,
            value: active.data.current?.value,
            parentNames: [],
            children: [],
          },
        ],
      };

      draggedIds2DSignal.value = [...draggedIds2D];
    }

    // Case 0.2: The child is dragged out of the block
    if (activeIsRightSide && overIsInput && activeIsAChildOfABlock) {
      const formDapp = cloneDeep(formDappSignal.value);
      const composedFieldKey = `right-${FieldKeyPrefix.CHILDREN_OF_BLOCK}-${activeFieldKey}-${activeIndex}-${activeBaseIndex}`;
      const formKey = `${activeBaseIndex}-${FieldKeyPrefix.BLOCK}-${activeFieldKey}`;
      const blockKey = active.data.current?.blockKey;
      const thisBlock = blockFieldMapping[dappIndex][blockKey];
      const thisChild = thisBlock.childrenFields?.find(
        (item) => item.key === activeFieldKey,
      );

      if (!thisChild) return;

      const thisChildIsExtendsInput = thisChild.type === 'extends';

      if (thisChildIsExtendsInput) {
        const allOptionKeys = getAllOptionKeysOfItem(thisChild);

        allOptionKeys.forEach((key) => {
          const optionFormKey = `${activeBaseIndex}-${FieldKeyPrefix.BLOCK}-${key}`;

          for (const key in formDapp) {
            if (
              key.startsWith(optionFormKey) &&
              FormDappUtil.getIndex(key) === activeIndex
            ) {
              delete formDapp[key];
            }
          }
        });
      }

      for (const key in formDapp) {
        if (
          key.startsWith(formKey) &&
          FormDappUtil.getIndex(key) === activeIndex
        ) {
          delete formDapp[key];
        }
      }

      draggedIds2D[activeBaseIndex][activeIndex] = {
        ...draggedIds2D[activeBaseIndex][activeIndex],
        children: draggedIds2D[activeBaseIndex][activeIndex].children.filter(
          (item) => item.name !== activeFieldKey,
        ),
      };

      draggedIds2DSignal.value = [...draggedIds2D];
      formDappSignal.value = { ...formDapp };

      return;
    }

    // Case 1: Drag to the right
    if (overIsOutput || overIsABase) {
      // Case 1.1: Output does not have base block yet
      if (noBaseBlockInOutput && !(activeIsABase || activeIsABaseModule)) {
        showValidateError(
          `Please drag ${thisDapp.baseBlock.title} to the output first!`,
        );
        return;
      }

      // Case 1.2: Output already has base block and has reached the limit
      if (
        !noBaseBlockInOutput &&
        (activeIsABase || activeIsABaseModule) &&
        !canPlaceMoreBase
      ) {
        showValidateError(
          `You can only place ${thisDapp.baseBlock.placableAmount} base!`,
        );
        idBlockErrorSignal.value = activeOriginalKey;
        return;
      }

      // Case 1.3: The lego just dragged already in the output
      if (activeFromRightSide) {
        return;
      }

      // Case 1.4: The lego just dragged is a base block
      if (activeIsABase) {
        draggedIds2DSignal.value = [...draggedIds2D, []];
        draggedDappIndexesSignal.value = [
          ...draggedDappIndexesSignal.value,
          dappIndex,
        ];
        return;
      }

      // Case 1.5: The lego just dragged is a base module
      if (activeIsABaseModule) {
        const totalPlaced = draggedIds2D.length;
        // prettier-ignore
        const canPlaceMoreBaseModule = baseModuleFieldMapping[dappIndex][activeOriginalKey].placableAmount === -1 ||
          totalPlaced < baseModuleFieldMapping[dappIndex][activeOriginalKey].placableAmount;
        const composedFieldKey =
          'right-' + FieldKeyPrefix.BASE_MODULE + '-' + activeOriginalKey;

        if (!canPlaceMoreBaseModule) {
          showValidateError(
            `You can only place one ${baseModuleFieldMapping[dappIndex][activeOriginalKey].title}!`,
          );
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }

        draggedIds2D = [
          ...draggedIds2D,
          [
            {
              name: composedFieldKey,
              value: active.data.current?.value,
              parentNames: [],
              children: [],
            },
          ],
        ];

        const formKey = `${draggedIds2D.length - 1}-${
          FieldKeyPrefix.BASE_MODULE
        }-${activeOriginalKey}-0-0`;

        formDappSignal.value = {
          ...formDappSignal.value,
          [formKey]: active.data.current?.value,
        };

        draggedIds2DSignal.value = [...draggedIds2D];
        draggedDappIndexesSignal.value = [
          ...draggedDappIndexesSignal.value,
          dappIndex,
        ];

        return;
      }

      // Case 1.6: The lego just dragged is a block/single
      if ((activeIsABlock || activeIsASingle) && overIsABase) {
        const totalPlaced = activeIsABlock
          ? draggedIds2D[overBaseIndex].filter((item) =>
              item.name.startsWith(
                `right-${FieldKeyPrefix.BLOCK}-${activeOriginalKey}`,
              ),
            ).length
          : draggedIds2D[overBaseIndex].filter((item) =>
              item.name.startsWith(
                `right-${FieldKeyPrefix.SINGLE}-${activeOriginalKey}`,
              ),
            ).length;
        const canPlaceMore =
          (activeIsABlock
            ? blockFieldMapping[dappIndex][activeOriginalKey].placableAmount ===
              -1
            : singleFieldMapping[dappIndex][activeOriginalKey]
                .placableAmount === -1) ||
          totalPlaced <
            (activeIsABlock
              ? blockFieldMapping[dappIndex][activeOriginalKey].placableAmount
              : singleFieldMapping[dappIndex][activeOriginalKey]
                  .placableAmount);
        const prefix =
          'right-' +
          (activeIsABlock ? FieldKeyPrefix.BLOCK : FieldKeyPrefix.SINGLE);
        const composedFieldKey = prefix + '-' + activeOriginalKey;

        if (!canPlaceMore) {
          const title = activeIsABlock
            ? blockFieldMapping[dappIndex][activeOriginalKey].title
            : singleFieldMapping[dappIndex][activeOriginalKey].title;

          showValidateError(`You can only place one ${title}!`);
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }

        draggedIds2D[overBaseIndex] = [
          ...draggedIds2D[overBaseIndex],
          {
            name: composedFieldKey,
            value: active.data.current?.value,
            parentNames: [],
            children: [],
          },
        ];

        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      // Case 1.7: The lego just dragged is a module
      if (activeIsAModule && overIsABase) {
        const totalPlaced = draggedIds2D[overBaseIndex].filter((item) =>
          item.name.startsWith(
            `right-${FieldKeyPrefix.MODULE}-${activeOriginalKey}`,
          ),
        ).length;
        const canPlaceMore =
          totalPlaced <
            moduleFieldMapping[dappIndex][activeOriginalKey].placableAmount ||
          moduleFieldMapping[dappIndex][activeOriginalKey].placableAmount ===
            -1;
        const composedFieldKey =
          'right-' + FieldKeyPrefix.MODULE + '-' + activeOriginalKey;
        const thisField = moduleFieldMapping[dappIndex][activeOriginalKey];
        const isMultiple = thisField?.placableAmount === -1;

        if (!canPlaceMore) {
          showValidateError(
            `You can only place one ${moduleFieldMapping[dappIndex][activeOriginalKey].title}!`,
          );
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }

        if (isMultiple) {
          const draggedFieldIndex = draggedIds2D[overBaseIndex].findIndex(
            (item) => item.name === composedFieldKey,
          );
          const draggedField = draggedIds2D[overBaseIndex].find(
            (item) => item.name === composedFieldKey,
          );

          if (!draggedField) {
            const formKey = `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${draggedIds2D[overBaseIndex].length}`;
            const value = [active.data.current?.value];

            formDappSignal.value = {
              ...formDappSignal.value,
              [formKey]: value,
            };

            draggedIds2D[overBaseIndex] = [
              ...draggedIds2D[overBaseIndex],
              {
                name: composedFieldKey,
                value,
                parentNames: [],
                children: [],
              },
            ];
          } else {
            const formKey = `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${draggedFieldIndex}`;
            const alreadyExist = (draggedField.value as string[]).find(
              (value) => value === active.data.current?.value,
            );

            if (alreadyExist) {
              showValidateError('You can only place one module!');
              idBlockErrorSignal.value = activeOriginalKey;

              return;
            }

            const value = [
              ...(draggedField.value as string[]),
              active.data.current?.value,
            ];

            formDappSignal.value = {
              ...formDappSignal.value,
              [formKey]: value,
            };

            draggedField.value = value;
          }
        } else {
          const formKey = `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${draggedIds2D[overBaseIndex].length}`;

          for (const key in formDappSignal.value) {
            if (
              key.startsWith(
                `${overBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-`,
              )
            ) {
              showValidateError('You can only place one module!');
              idBlockErrorSignal.value = activeOriginalKey;

              return;
            }
          }

          formDappSignal.value = {
            ...formDappSignal.value,
            [formKey]: active.data.current?.value,
          };

          draggedIds2D[overBaseIndex] = [
            ...draggedIds2D[overBaseIndex],
            {
              name: composedFieldKey,
              value: active.data.current?.value,
              parentNames: [],
              children: [],
            },
          ];
        }

        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      return;
    }

    // Case 2: Drag to the left
    if (overIsInput) {
      if (activeFromLeftSide) {
        return;
      }

      // Case 2.1: Dragged lego is a base block
      if (activeIsABase) {
        const formDapp = formDappSignal.value;

        Object.keys(formDapp).forEach((key) => {
          if (FormDappUtil.getBaseIndex(key) === activeBaseIndex) {
            delete formDapp[key];
          } else if (FormDappUtil.getBaseIndex(key) > activeBaseIndex) {
            const remainingKey = key.split('-').slice(1).join('-');
            const currentBaseIndex = FormDappUtil.getBaseIndex(key);
            const newKey = `${currentBaseIndex - 1}-${remainingKey}`;
            formDapp[newKey] = formDapp[key];
            delete formDapp[key];
          }
        });

        draggedIds2DSignal.value = removeItemAtIndex(
          draggedIds2D,
          activeBaseIndex,
        );
        formDappSignal.value = { ...formDapp };

        return;
      }

      // Case 2.2: Dragged lego is a block
      if (activeIsABlock) {
        const formDapp = formDappSignal.value;

        Object.keys(formDapp).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDapp[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDapp[newKey] = formDapp[key];
            delete formDapp[key];
          }
        });

        formDappSignal.value = { ...formDapp };
        draggedIds2D[activeBaseIndex] = removeItemAtIndex(
          draggedIds2D[activeBaseIndex],
          Number(DragUtil.getChildIndex(activeId)),
        );
        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      // Case 2.3: Dragged lego is a single
      if (activeIsASingle) {
        const formDapp = formDappSignal.value;

        Object.keys(formDapp).forEach((key) => {
          if (
            FormDappUtil.isInSingle(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDapp[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDapp[newKey] = formDapp[key];
            delete formDapp[key];
          }
        });

        formDappSignal.value = { ...formDapp };
        draggedIds2D[activeBaseIndex] = removeItemAtIndex(
          draggedIds2D[activeBaseIndex],
          Number(DragUtil.getChildIndex(activeId)),
        );
        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      if (activeIsAModule) {
        const composedFieldKey = `right-${FieldKeyPrefix.MODULE}-${activeOriginalKey}`;
        const formDapp = formDappSignal.value;
        const isMultiple =
          moduleFieldMapping[dappIndex][activeOriginalKey]?.placableAmount ===
          -1;
        const item = draggedIds2D[activeBaseIndex].find(
          (item) => item.name === composedFieldKey,
        );
        const legoDraggingIsParent = !hasValue(active.data.current?.value);

        if (!item) return;

        if (legoDraggingIsParent) {
          Object.keys(formDapp).forEach((key) => {
            if (
              FormDappUtil.isInModule(key) &&
              FormDappUtil.getIndex(key) === activeIndex
            ) {
              delete formDapp[key];
            } else if (FormDappUtil.getIndex(key) > activeIndex) {
              const currentIndex = FormDappUtil.getIndex(key);
              const newKey = key.replace(
                `-${currentIndex}`,
                `-${currentIndex - 1}`,
              );

              formDapp[newKey] = formDapp[key];
              delete formDapp[key];
            }
          });

          draggedIds2D[activeBaseIndex] = removeItemAtIndex(
            draggedIds2D[activeBaseIndex],
            Number(DragUtil.getChildIndex(activeId)),
          );
        } else if (!isMultiple) {
          Object.keys(formDapp).forEach((key) => {
            if (
              FormDappUtil.isInModule(key) &&
              FormDappUtil.getIndex(key) === activeIndex
            ) {
              delete formDapp[key];
            } else if (FormDappUtil.getIndex(key) > activeIndex) {
              const currentIndex = FormDappUtil.getIndex(key);
              const newKey = key.replace(
                `-${currentIndex}`,
                `-${currentIndex - 1}`,
              );

              formDapp[newKey] = formDapp[key];
              delete formDapp[key];
            }
          });

          draggedIds2D[activeBaseIndex] = removeItemAtIndex(
            draggedIds2D[activeBaseIndex],
            Number(DragUtil.getChildIndex(activeId)),
          );
        } else {
          const newValue = (item.value as string[]).filter(
            (value) => value !== active.data.current?.value,
          );

          if (newValue.length === 0) {
            Object.keys(formDapp).forEach((key) => {
              if (
                FormDappUtil.isInModule(key) &&
                FormDappUtil.getIndex(key) === activeIndex
              ) {
                delete formDapp[key];
              } else if (FormDappUtil.getIndex(key) > activeIndex) {
                const currentIndex = FormDappUtil.getIndex(key);
                const newKey = key.replace(
                  `-${currentIndex}`,
                  `-${currentIndex - 1}`,
                );

                formDapp[newKey] = formDapp[key];
                delete formDapp[key];
              }
            });

            draggedIds2D[activeBaseIndex] = removeItemAtIndex(
              draggedIds2D[activeBaseIndex],
              Number(DragUtil.getChildIndex(activeId)),
            );
          } else {
            item.value = newValue;
            formDapp[
              `${activeBaseIndex}-${FieldKeyPrefix.MODULE}-${activeOriginalKey}-0-${activeIndex}`
            ] = newValue;
          }
        }

        formDappSignal.value = { ...formDapp };
        draggedIds2DSignal.value = [...draggedIds2D];

        return;
      }

      return;
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

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

  const onNodesChange = React.useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  return (
    <div
      className={`${s.container} ${isTabCode ? '' : s.explorePageContainer}`}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.left}>
              <div className={s.top_left}>
                <div
                  className={`${s.top_left_filter} ${isTabCode && s.active}`}
                  onClick={() => setTabActive(TABS.CODE)}
                >
                  <p>Studio</p>
                </div>
                <div
                  className={`${s.top_left_filter} ${!isTabCode && s.active}`}
                  onClick={() => setTabActive(TABS.EXPLORE)}
                >
                  <p>Rollups</p>
                </div>
              </div>

              {isTabCode && (
                <div className={s.left_box}>
                  <div className={s.left_box_inner}>
                    <div className={s.left_box_inner_sidebar}>
                      <SidebarV2 items={data} />
                    </div>

                    <div
                      id={'wrapper-data'}
                      className={s.left_box_inner_content}
                    >
                      <DroppableV2 id="data">
                        {data?.map((item, index) => {
                          if (item.hidden) return null;

                          const currentPrice =
                            item.options.find(
                              (opt) =>
                                opt.key === field[item.key].value &&
                                field[item.key].dragged,
                            )?.priceBVM ?? 0;

                          return (
                            <BoxOptionV3
                              key={item.key}
                              disable={item.disable}
                              label={item.title}
                              id={item.key}
                              isRequired={item.required}
                              active={field[item.key].dragged}
                              description={{
                                title: item.title,
                                content: item.tooltip,
                              }}
                            >
                              {item.options.map((option, optIdx) => {
                                // let _price = formatCurrencyV2({
                                //   amount: option.priceBVM || 0,
                                //   decimals: 0,
                                // }).replace('.00', '');
                                // let suffix =
                                //   Math.abs(option.priceBVM) > 0
                                //     ? ` (${_price} BVM)`
                                //     : '';

                                let _price = option.priceBVM;
                                let operator = '+';
                                let suffix =
                                  Math.abs(_price) > 0
                                    ? ` (${formatCurrencyV2({
                                        amount: _price,
                                        decimals: 0,
                                      })} BVM)`
                                    : '';

                                _price = option.priceBVM - currentPrice;
                                operator = _price > 0 ? '+' : '-';
                                if (item.multiChoice) operator = '';
                                suffix =
                                  Math.abs(_price) > 0
                                    ? ` (${operator}${formatCurrencyV2({
                                        amount: Math.abs(_price),
                                        decimals: 0,
                                      })} BVM)`
                                    : '';

                                if (
                                  (option.key === field[item.key].value &&
                                    field[item.key].dragged) ||
                                  item.type === 'dropdown'
                                )
                                  return null;

                                const isDisabled =
                                  !!(
                                    option.supportLayer &&
                                    option.supportLayer !== 'both' &&
                                    option.supportLayer !==
                                      field['layers']?.value
                                  ) ||
                                  !!(
                                    option.supportNetwork &&
                                    option.supportNetwork !== 'both' &&
                                    option.supportNetwork !==
                                      field['network']?.value
                                  ) ||
                                  !option.selectable;

                                if (
                                  item.multiChoice &&
                                  field[item.key].dragged
                                ) {
                                  const currentValues = field[item.key]
                                    .value as any[];

                                  if (currentValues.includes(option.key)) {
                                    return null;
                                  }
                                }

                                return (
                                  <Draggable
                                    key={item.key + '-' + option.key}
                                    id={item.key + '-' + option.key}
                                    useMask
                                    disabled={isDisabled}
                                    isLabel={true}
                                    value={{
                                      isChain: true,
                                      value: option.key,
                                    }}
                                    tooltip={option.tooltip}
                                  >
                                    <LegoV3
                                      background={item.color}
                                      zIndex={item.options.length - optIdx}
                                      disabled={isDisabled}
                                    >
                                      <Label
                                        icon={option.icon}
                                        title={option.title + suffix}
                                      />
                                    </LegoV3>
                                  </Draggable>
                                );
                              })}
                            </BoxOptionV3>
                          );
                        })}

                        {/* <div className={s.hTrigger}></div> */}
                      </DroppableV2>

                      <Droppable id="input">
                        {dapps.map((dapp, index) => {
                          return (
                            <BoxOption
                              thisDapp={dapp}
                              key={dapp.key}
                              dappIndex={index}
                            />
                          );
                        })}
                      </Droppable>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isTabCode && (
              <>
                <DragOverlay>
                  {idDragging &&
                    data?.map((item, index) => {
                      if (!idDragging.startsWith(item.key)) return null;

                      if (item.multiChoice && rightDragging) {
                        const childrenOptions = item.options.map(
                          (option, opIdx) => {
                            const optionInValues = (
                              field[item.key].value as string[]
                            ).includes(option.key);

                            if (!optionInValues) return null;

                            return (
                              <Draggable
                                useMask
                                key={item.key + '-' + option.key}
                                id={item.key + '-' + option.key}
                                value={{
                                  isChain: true,
                                  value: option.key,
                                }}
                              >
                                <LegoV3
                                  background={item.color}
                                  label={item.title}
                                  labelInLeft
                                  zIndex={item.options.length - opIdx}
                                ></LegoV3>
                              </Draggable>
                            );
                          },
                        );

                        return (
                          <Draggable
                            key={
                              item.key +
                              '-parent' +
                              (rightDragging ? '-right' : '')
                            }
                            id={
                              item.key +
                              '-parent' +
                              (rightDragging ? '-right' : '')
                            }
                            useMask
                            value={{
                              isChain: true,
                            }}
                          >
                            <DroppableV2 id={item.key}>
                              <LegoParent
                                parentOfNested
                                background={item.color}
                                label={item.title}
                                zIndex={data.length - index}
                              >
                                {childrenOptions}
                              </LegoParent>
                            </DroppableV2>
                          </Draggable>
                        );
                      }

                      return item.options.map((option, opIdx) => {
                        if (!idDragging.startsWith(item.key + '-' + option.key))
                          return null;

                        return (
                          <Draggable
                            key={
                              item.key +
                              '-' +
                              option.key +
                              (rightDragging ? '-right' : '')
                            }
                            id={
                              item.key +
                              '-' +
                              option.key +
                              (rightDragging ? '-right' : '')
                            }
                            useMask
                            value={{
                              isChain: true,
                              value: option.key,
                            }}
                          >
                            <LegoV3
                              icon={option.icon}
                              background={item.color}
                              label={option.title}
                              labelInLeft
                              zIndex={item.options.length - opIdx}
                            />
                          </Draggable>
                        );
                      });
                    })}
                </DragOverlay>
                <DragMask />

                {/* ------------- RIGHT ------------- */}
                <ReactFlowProvider>
                  <div className={s.right}>
                    <div className={s.top_right}>
                      <AddBoxButton setNodes={setNodes} />

                      <div className={s.right_box_footer}>
                        {!needContactUs && (
                          <div className={s.right_box_footer_left}>
                            <h4 className={s.right_box_footer_left_content}>
                              {formatCurrencyV2({
                                amount: priceBVM,
                                decimals: 0,
                              })}{' '}
                              BVM{'/'}month
                            </h4>
                            <h6 className={s.right_box_footer_left_title}>
                              $
                              {formatCurrencyV2({
                                amount: priceUSD,
                                decimals: 0,
                              })}
                              {'/'}month
                            </h6>
                          </div>
                        )}

                        <LaunchButton data={data} originalData={originalData} />
                      </div>
                    </div>

                    <div className={`${s.right_box}`}>
                      <div
                        // className={`${s.right_box_main} ${
                        //   isCapture ? s.right_box_main_captured : ''
                        // }`}
                        className={`${s.right_box_main}`}
                        id="imageCapture"
                      >
                        <ReactFlow
                          nodes={nodes}
                          nodeTypes={{ customBox: CustomNode }}
                          onNodesChange={onNodesChange}
                          fitView
                          // draggable={false}
                          defaultViewport={{
                            x: 0,
                            y: 0,
                            zoom: 1,
                          }}
                        />
                        {/*<Droppable id="output">*/}
                        {/*  <RightDroppable />*/}
                        {/*</Droppable>*/}
                        <DroppableMask />
                      </div>

                      {/*{!isCapture && (*/}
                      {/*  <div className={s.cta_wrapper}>*/}
                      {/*    <button*/}
                      {/*      className={`${s.reset} ${s.gray}`}*/}
                      {/*      onClick={() => setIsShowModal(true)}*/}
                      {/*    >*/}
                      {/*      <div>*/}
                      {/*        RESET*/}
                      {/*        <ImagePlaceholder*/}
                      {/*          src={'/icons/undo.svg'}*/}
                      {/*          alt={'undo'}*/}
                      {/*          width={20}*/}
                      {/*          height={20}*/}
                      {/*        />*/}
                      {/*      </div>*/}
                      {/*    </button>*/}
                      {/*    <Capture />*/}
                      {/*  </div>*/}
                      {/*)}    */}
                      {!isCapture && (
                        <div className={s.resetButton}>
                          {/*<Button element="button" type="button">*/}
                          {/*  EXPORT{' '}*/}
                          {/*  <Image*/}
                          {/*    src="/icons/ic_image_2.svg"*/}
                          {/*    alt="ic_image_2"*/}
                          {/*    width={20}*/}
                          {/*    height={20}*/}
                          {/*  />*/}
                          {/*</Button>*/}
                          <Capture />
                          <Button
                            element="button"
                            type="button"
                            onClick={() => setIsShowModal(true)}
                          >
                            RESET{' '}
                            <Image
                              src="/icons/undo.svg"
                              alt="undo"
                              width={20}
                              height={20}
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </ReactFlowProvider>
              </>
            )}
          </div>

          {!isTabCode && <ExplorePage cloneItemCallback={cloneItemCallback} />}
        </div>
      </DndContext>

      <ModalVideo
        channel="custom"
        url={
          'https://storage.googleapis.com/bvm-network/icons-tool/DragnDrop_03.mp4'
        }
        isOpen={isOpenModalVideo}
        onClose={() => {
          setIsOpenModalVideo(false);
        }}
      />

      <ErrorModal
        title="Module Reset"
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
      >
        <p className={s.resetDescription}>
          Remove all selected modules and start again.
        </p>

        <div className={s.actions}>
          <button
            onClick={() => {
              setIsShowModal(false);
            }}
            className={`${s.actions__button} ${s.actions__button__cancel}`}
          >
            Cancel
          </button>
          <button
            onClick={resetEdit}
            className={`${s.actions__button} ${s.actions__button__reset}`}
          >
            Reset
          </button>
        </div>
      </ErrorModal>
    </div>
  );
};

export default BuyPage;
