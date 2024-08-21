'use client';


import { FieldKeyPrefix } from '@/modules/blockchains/Buy/contants';
import useDapps from '@/modules/blockchains/Buy/hooks/useDapps';
import {
  blockDraggingSignal,
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  idBlockErrorSignal,
} from '@/modules/blockchains/Buy/signals/useDragSignal';
import { formDappSignal } from '@/modules/blockchains/Buy/signals/useFormDappsSignal';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import {
  subScribeDropEnd,
  useTemplateFormStore,
} from '@/modules/blockchains/Buy/stores/useDappStore';
import useDragMask from '@/modules/blockchains/Buy/stores/useDragMask';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import {
  cloneDeep,
  DragUtil,
  FormDappUtil,
  hasValue,
  MouseSensor,
} from '@/modules/blockchains/Buy/utils';
import { removeItemAtIndex } from '@/modules/blockchains/dapp/utils';
import { FieldModel } from '@/types/customize-model';
import { showValidateError } from '@components/toast';
import { useSensor, useSensors } from '@dnd-kit/core';
import toast from 'react-hot-toast';
import { useChainProvider } from '../../detail_v4/provider/ChainProvider.hook';
import useFlowStore, { AppState } from '../stores/useFlowStore';
import useOverlappingChainLegoStore from '../stores/useOverlappingChainLegoStore';
import {
  useOptionInputStore,
} from '@/modules/blockchains/Buy/component4/DappRenderer/OptionInputValue/useOptionInputStore';
import { needReactFlowRenderSignal } from '@/modules/blockchains/Buy/studio/ReactFlowRender';
import { isShakeLego } from '@/modules/blockchains/Buy/components3/Draggable';

export default function useHandleDragging() {
  const { setOverlappingId } = useOverlappingChainLegoStore();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const { setIdDragging, rightDragging, setRightDragging } = useDragMask();
  const { draggedFields, setDraggedFields } = useDragStore();
  const { field, setField } = useOrderFormStoreV3();
  const { parsedCategories, categories, categoryMapping } =
    useModelCategoriesStore();
  const {
    dapps,
    baseModuleFieldMapping,
    blockFieldMapping,
    moduleFieldMapping,
    singleFieldMapping,
  } = useDapps();
  const { selectedCategoryMapping, isUpdateFlow } = useChainProvider();
  const { templateDapps } = useTemplateFormStore();
  const { deleteValue: deleteValueOptionInputStore } = useOptionInputStore();

  // console.log('useHandleDragging -> field :: ', field);

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

  const handleChainDragEnd = (event: any) => {
    setIdDragging('');
    setRightDragging(false);

    const { over, active } = event;
    console.log('over, active', { over, active });

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
      parsedCategories?.find((item) => item.key === overKey)?.multiChoice;
    const activeIsParent =
      parsedCategories?.find((item) => item.key === activeKey)?.multiChoice &&
      activeSuffix1 === 'parent';
    const isMultiChoice = parsedCategories?.find(
      (item) => item.key === activeKey,
    )?.multiChoice;
    const activeIsNotAChainField = !categories?.find(
      (item) => item.key === activeKey,
    )?.isChain;
    // const selectedCategory = selectedCategoryMapping?.[activeKey];
    const category = categoryMapping?.[activeKey];

    if (!rightDragging && !overIsFinalDroppable) {
      return;
    }

    if (rightDragging && !overIsFinalDroppable && overSuffix1 === 'right') {
      // swap activeKey, overKey in draggedFields
      const _draggedFields = cloneDeep(draggedFields);
      const activeIndex = draggedFields.indexOf(activeKey);
      const overIndex = draggedFields.indexOf(overKey);

      if (activeIndex === -1 || overIndex === -1) return;

      const temp = _draggedFields[activeIndex];
      _draggedFields[activeIndex] = _draggedFields[overIndex];
      _draggedFields[overIndex] = temp;

      setDraggedFields(_draggedFields);

      return;
    }

    if (activeIsNotAChainField && activeKey !== 'bridge_apps') {
      return;
    }

    if (!category?.updatable && isUpdateFlow) {
      // TODO: Notify if needed

      return;
    }

    if (!isMultiChoice) {
      // Error case
      if (
        active.data.current.value !== field[activeKey].value &&
        field[activeKey].dragged
      ) {
        setOverlappingId(field[activeKey].value as string);

        const currentField = parsedCategories?.find(
          (item) => item.key === activeKey,
        );
        const currentOption = currentField?.options.find(
          (option) => option.key === field[activeKey].value,
        );
        const msg = `You have already chosen ${currentOption?.title} as your ${currentField?.title}. Please remove it before selecting again.`;
        isShakeLego.value = currentOption?.value as string;
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
          // setShowShadow('');
          setOverlappingId('');
        }, 500);
        return;
      }

      const isHidden = parsedCategories?.find(
        (item) => item.key === activeKey,
      )?.hidden;
      if (isHidden) return;

      // Normal case
      if (
        over &&
        (overIsFinalDroppable ||
          (!overIsFinalDroppable && overSuffix1 === 'right')) // Each lego in right side is wrapped by droppable
      ) {
        setField(activeKey, active.data.current.value, true);

        if (field[activeKey].dragged) return;
        setDraggedFields([...draggedFields, activeKey]);
      } else {
        if (over && overIsParentDroppable) return;

        const optionKey = active.data.current.value;
        // setValueOptionInputStore(optionKey, '');
        deleteValueOptionInputStore(optionKey);

        setField(activeKey, active.data.current.value, false);
        setDraggedFields(draggedFields.filter((field) => field !== activeKey));
      }

      return;
    }

    // Active is parent and drag to the left side
    if (
      activeIsParent &&
      (!over || (over && !overIsFinalDroppable && !overIsParentDroppable))
    ) {

      const currentValues = (field[activeKey].value || []) as string[];
      currentValues.forEach(optionKey => {
        // setValueOptionInputStore(optionKey, '');
        deleteValueOptionInputStore(optionKey);
      });

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

      const optionKeyRemove = currentValues.filter(
        (value) => value === active.data.current.value,
      );
      const isEmpty = newValue.length === 0;

      optionKeyRemove.forEach((optionKey) => {
        // setValueOptionInputStore(optionKey, '');
        deleteValueOptionInputStore(optionKey);
      });

      setField(activeKey, newValue, !isEmpty);
      isEmpty &&
        setDraggedFields(draggedFields.filter((field) => field !== activeKey));
    }
  };

  const handleDappDragEnd = (event: any) => {
    const { over, active } = event;
    subScribeDropEnd.value += 1;
    blockDraggingSignal.value = {
      id: '',
      title: '',
      icon: '',
      background: '',
      dappIndex: -1,
    };

    if (!over) return;

    const dappIndex = active.data.current?.dappIndex;
    const thisDapp = dapps[dappIndex];
    const activeId = active.id.toString();
    const overId = over.id.toString();

    let draggedIds2D = cloneDeep(draggedIds2DSignal.value);
    const noBaseBlockInOutput = draggedIds2D.length === 0;
    const canPlaceMoreBase =
      Number(thisDapp.baseBlock.placableAmount) >
        draggedDappIndexesSignal.value.filter((index) => index === dappIndex)
          .length || thisDapp.baseBlock.placableAmount === -1;
    // const canPlaceMoreBase =
    //   Number(thisDapp.baseBlock.placableAmount) > draggedIds2D.length ||
    //   thisDapp.baseBlock.placableAmount === -1;
    // const canPlaceMoreBase = draggedIds2D.length === 0;

    const overIsInput = over.id === 'input';
    const overIsOutput =
      over.id === 'output' ||
      over.id.split('-').some((key: string) => key === 'droppable');
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
    const activeBaseIndex = Number(DragUtil.getBaseIndex(activeId));
    const activeIndex = Number(DragUtil.getChildIndex(activeId));
    const activeOriginalKey = DragUtil.getOriginalKey(activeId);
    const activeFieldKey = active.data.current?.fieldKey;

    const activeIsABase = DragUtil.idDraggingIsABase(activeId);
    const activeIsAModule = DragUtil.idDraggingIsAModule(activeId);
    const activeIsABlock = DragUtil.idDraggingIsABlock(activeId);
    const activeIsASingle = DragUtil.idDraggingIsASingle(activeId);
    const activeIsABaseModule = DragUtil.idDraggingIsABaseModule(activeId);
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

    // Case 0.3: Drag to nested children of the module
    if (!overIsABase && overIsABlock && overOriginalKey) {
      const dappIndexOfOver = draggedDappIndexesSignal.value[overBaseIndex];

      if (JSON.stringify(dappIndexOfOver) !== JSON.stringify(dappIndex)) {
        showValidateError('This lego is not belong to this module!');
        idBlockErrorSignal.value = activeOriginalKey;

        return;
      }

      // Case 0.3.1: The lego just dragged is a type module
      if (activeIsAModule) {
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

      // Case 0.3.2: The lego just dragged is a type block
      if (activeIsABlock) {
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
            ? blockFieldMapping[dappIndex][activeOriginalKey]
                ?.placableAmount === -1
            : singleFieldMapping[dappIndex][activeOriginalKey]
                ?.placableAmount === -1) ||
          totalPlaced <
            (activeIsABlock
              ? blockFieldMapping[dappIndex][activeOriginalKey]?.placableAmount
              : singleFieldMapping[dappIndex][activeOriginalKey]
                  ?.placableAmount);

        const prefix =
          'right-' +
          (activeIsABlock ? FieldKeyPrefix.BLOCK : FieldKeyPrefix.SINGLE);
        const composedFieldKey = prefix + '-' + activeOriginalKey;

        if (!canPlaceMore) {
          const title = activeIsABlock
            ? blockFieldMapping[dappIndex][activeOriginalKey]?.title
            : singleFieldMapping[dappIndex][activeOriginalKey]?.title;

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

      // Case 0.3.3: The lego just dragged is a type base block
      if (activeIsABase) {
        draggedIds2DSignal.value = [...draggedIds2D, []];
        draggedDappIndexesSignal.value = [
          ...draggedDappIndexesSignal.value,
          dappIndex,
        ];
        // mouseDroppedPositionSignal.value = {
        //   ...mousePositionRef.current,
        // };

        return;
      }

      // Case 0.3.4: The lego just dragged is a type base module
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

        // mouseDroppedPositionSignal.value = {
        //   ...mousePositionRef.current,
        // };
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

      // Drag lego outside the box
      if (!overIsABase && !(activeIsABase || activeIsABaseModule)) {
        showValidateError(`Please drag to the ${thisDapp.title} box!`);
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
        // mouseDroppedPositionSignal.value = {
        //   ...mousePositionRef.current,
        // };

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

        // mouseDroppedPositionSignal.value = {
        //   ...mousePositionRef.current,
        // };
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
        const dappIndexOfOver = draggedDappIndexesSignal.value[overBaseIndex];

        if (JSON.stringify(dappIndexOfOver) !== JSON.stringify(dappIndex)) {
          showValidateError('This lego is not belong to this module!');
          idBlockErrorSignal.value = activeOriginalKey;

          return;
        }
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
        const totalTemplateDapps = (templateDapps || []).length;
        const removeIndex = activeBaseIndex + 1 + totalTemplateDapps;
        const rootNode = 'blockchain';

        const newEdges = edges.filter(
          (item) => item.target !== nodes[removeIndex].id,
        );
        let newNodes = removeItemAtIndex(nodes, removeIndex);

        let getHandleNodeBlockChain = nodes.find(
          (item) => item.id === rootNode,
        );

        let countSourceHandle = 0;

        for (let i = 0; i < edges.length; i++) {
          if (edges[i].sourceHandle === `${rootNode}-s-${thisDapp.title}`) {
            countSourceHandle += 1;
          }
        }

        if (countSourceHandle == 1) {
          const newSourceHandles =
            getHandleNodeBlockChain?.data.sourceHandles?.filter(
              (item) => item !== `${rootNode}-s-${thisDapp.title}`,
            );
          const data = {
            ...getHandleNodeBlockChain,
            data: {
              ...getHandleNodeBlockChain?.data,
              sourceHandles: newSourceHandles,
            },
          };
          newNodes = newNodes.map((item) =>
            item.id === rootNode ? data : item,
          ) as AppState['nodes'];
        }

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
        draggedDappIndexesSignal.value = removeItemAtIndex(
          draggedDappIndexesSignal.value,
          activeBaseIndex,
        );

        newNodes = newNodes.map((node, index) => {
          if (node.data.node !== 'dapp') return node;

          const realIndex = index - 1 - totalTemplateDapps;

          return {
            ...node,
            data: {
              ...node.data,
              ids: draggedIds2DSignal.value[realIndex],
              baseIndex: realIndex,
            },
          };
        });

        //Drag remove node
        setNodes(newNodes);
        setEdges(newEdges);
        needReactFlowRenderSignal.value = true;

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
  };

  const handleDragEnd = (event: any) => {
    if (event.active.data.current.isChain) {
      handleChainDragEnd(event);
      return;
    }

    handleDappDragEnd(event);
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

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  return {
    handleDragStart,
    handleDragEnd,
    sensors,
  };
}
