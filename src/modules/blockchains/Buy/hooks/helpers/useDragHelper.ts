import {
  useSensors,
  useSensor,
  DragStartEvent,
  DragEndEvent,
  Active,
  Over,
} from '@dnd-kit/core';
import React from 'react';
import { isTwoObjectEqual, MouseSensor } from '../../utils';
import { IModelOption } from '@/types/customize-model';
import useDndKitStore from '../../stores/useDndKitStore';
import useChainFormStore from '../../stores/useChainFormStore';

const useDragHelper = () => {
  const setDataDragging = useDndKitStore((state) => state.setDataDragging);

  const chainFields = useChainFormStore((state) => state.chainFields);
  const setChainFields = useChainFormStore((state) => state.setChainFields);
  const setChainField = useChainFormStore((state) => state.setChainField);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleChainDragEnd(active: Active, over: Over | null) {
    setDataDragging(null);

    const {
      // originalKey: activeOriginalKey,
      fromLeftSide: activeFromLeftSide,
      isParent: activeIsParent,
      category: activeCategory,
      option: activeOption,
      // isOutput: activeIsOutput = false,
      // isInput: activeIsInput = false,
    } = active.data.current;
    const {
      // originalKey: overOriginalKey = '',
      fromLeftSide: overFromLeftSide = false,
      category: overCategory,
      isParent: overIsParent = false,
      option: overOption,
      isOutput: overIsOutput = false,
      isInput: overIsInput = false,
    } = over?.data.current || {};

    const chainField = chainFields.find(
      (chainField) => chainField.category.key === activeCategory.key,
    );

    if (activeFromLeftSide && (overFromLeftSide || overIsInput)) {
      return;
    } else if (!over) {
      return;
    } else if (!chainField) {
      return;
    }

    if (!activeFromLeftSide && !overFromLeftSide) {
      // Swap active and over index

      return;
    }

    if (activeFromLeftSide && (!overFromLeftSide || overIsOutput)) {
      let overOptionsAlreadyHasSomeActiveOptions = false;
      let activeOptionExistsInOverOptions = false;

      // Check if active already exists in over options
      for (const chainField of chainFields) {
        if (activeOptionExistsInOverOptions) {
          break;
        }

        if (chainField.category.key === activeCategory.key) {
          activeOptionExistsInOverOptions = chainField.category.options.some(
            (option) => isTwoObjectEqual(option, activeOption),
          );

          overOptionsAlreadyHasSomeActiveOptions =
            chainField.category.options.length > 0;
        }
      }

      if (activeOptionExistsInOverOptions) {
        return;
      }

      if (
        overOptionsAlreadyHasSomeActiveOptions &&
        !activeCategory.isMultiChoice
      ) {
        return;
      }

      const newOptions = [...chainField.category.options, activeOption];
      setChainField(activeCategory.key, {
        dragged: true,
        category: {
          ...chainField.category,
          options: newOptions,
        },
      });

      return;
    }

    if (!activeFromLeftSide && (overFromLeftSide || overIsInput)) {
      if (activeIsParent) {
        setChainField(activeCategory.key, {
          dragged: false,
          category: {
            ...activeCategory,
            options: [],
          },
        });
        return;
      } else {
        const newOptions = chainField.category.options.filter(
          (option) => !isTwoObjectEqual(option, activeOption),
        );
        const isEmpty = newOptions?.length === 0;

        setChainField(activeCategory.key, {
          dragged: !isEmpty,
          category: {
            ...chainField.category,
            options: newOptions,
          },
        });

        return;
      }
    }
  }

  function handleDappDragEnd(active: Active, over: Over | null) {
    setDataDragging(null);

    const {
      // originalKey: activeOriginalKey,
      fromLeftSide: activeFromLeftSide,
      // isParent: activeIsParent,
      isBaseBlock: activeIsBaseBlock = false,
      option: activeOption,
      // options: activeOptions,
      // type: activeType = '',
      // isOutput: activeIsOutput = false,
      // isInput: activeIsInput = false,
    } = active.data.current;
    const {
      // originalKey: overOriginalKey = '',
      fromLeftSide: overFromLeftSide = false,
      // isParent: overIsParent = false,
      // isBaseBlock: overIsBaseBlock = false,
      // option: overOption,
      options: overOptions = [],
      // type: overType = '',
      isOutput: overIsOutput = false,
      isInput: overIsInput = false,
    } = over?.data.current || {};

    const activeIsAChildOfOver = overOptions.some((option) =>
      isTwoObjectEqual(option, activeOption),
    );

    if (activeFromLeftSide && (overFromLeftSide || overIsInput)) {
      return;
    } else if (!over) {
      return;
    }

    if (activeFromLeftSide && activeIsAChildOfOver && !overFromLeftSide) {
      // Add active option to over options
      return;
    }

    // Drag to the left side
    if ((overIsInput || overFromLeftSide) && !activeFromLeftSide) {
      if (activeIsBaseBlock) {
        // Remove entire node
        return;
      } else {
        // Remove the active option from the options
        return;
      }
    }

    // Drag to the right side
    if (activeFromLeftSide && (!overFromLeftSide || overIsOutput)) {
      if (activeIsBaseBlock) {
        // Add node

        return;
      } else {
        // Add active option to over options
        return;
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.data.current?.isChain) {
      handleChainDragEnd(active, over);
    } else {
      handleDappDragEnd(active, over);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setDataDragging(active);
  }

  return {
    handleChainDragEnd,
    handleDragEnd,
    handleDragStart,
    sensors,
  };
};

export default useDragHelper;
