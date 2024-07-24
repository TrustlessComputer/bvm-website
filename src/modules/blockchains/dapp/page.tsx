import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Image from 'next/image';

import {
  compareKeyInFormDappAndDrag,
  DragUtil,
  FormDappUtil,
  MouseSensor,
  removeItemAtIndex,
} from './utils';
import { dappMockupData } from './mockup_3';
import { FieldKeyPrefix } from './contants';
import LeftDroppable from './components/LeftDroppable';
import RightDroppable from './components/RightDroppable';
import DragMask from './components/DragMask';
import LaunchButton from './components/LaunchButton';
import Button from './components/Button';
import useDappsStore, {
  subScribeDropEnd,
  useFormDappsStore,
} from './stores/useDappStore';
import { draggedIds2DSignal, draggedIdsSignal } from './signals/useDragSignal';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappToggleSignal,
} from './signals/useFormDappsSignal';

import styles from './styles.module.scss';
import s from '@/modules/blockchains/Buy/styles_v6.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';

const RollupsDappPage = () => {
  const { dapps, setDapps, currentIndexDapp, setCurrentIndexDapp } =
    useDappsStore();
  const dappState = useAppSelector(dappSelector);

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const blockFieldMapping = React.useMemo(() => {
    const mapping: Record<
      string,
      {
        key: string;
        title: string;
        icon: string;
        fields: FieldModel[];
      }
    > = {};

    (thisDapp?.blockFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const singleFieldMapping = React.useMemo(() => {
    const mapping: Record<
      string,
      {
        key: string;
        title: string;
        icon: string;
        fields: FieldModel[];
      }
    > = {};

    (thisDapp?.singleFields || []).forEach((item) => {
      mapping[item.key] = item;
    });

    return mapping;
  }, [thisDapp]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    subScribeDropEnd.value += 1;
  };

  // prettier-ignore
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    subScribeDropEnd.value += 1;

    console.log("🚀 -> file: page.tsx:46 -> handleDragEnd -> over, active ::", over, active)

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const draggedIds2D = draggedIds2DSignal.value;
    const noBaseBlockInOutput = draggedIds2D.length === 0;
    const canPlaceMoreBase = Number(thisDapp.baseBlock.placableAmount) > draggedIds2D.length || thisDapp.baseBlock.placableAmount === -1;

    const overIsInput = over.id === 'input';
    const overIsOutput = over.id === 'output';
    const overIsABase = DragUtil.idDraggingIsABase(overId);
    const overBaseIndex = Number(DragUtil.getBaseIndex(overId));

    const activeFromRightSide = DragUtil.isRightSide(activeId);
    const activeIsAChild = DragUtil.idDraggingIsAField(activeId);
    const activeIsABase = DragUtil.idDraggingIsABase(activeId);
    const activeBaseIndex = Number(DragUtil.getBaseIndex(activeId));
    const activeIsABlock = DragUtil.idDraggingIsABlock(activeId);
    const activeIsASingle = DragUtil.idDraggingIsASingle(activeId);
    const activeIndex = Number(DragUtil.getChildIndex(activeId));

    // Case 1: Drag to the right
    if (overIsOutput || overIsABase) {
      // Case 1.1: Output does not have base block yet
      if (noBaseBlockInOutput && !activeIsABase) {
        alert(`Please drag ${thisDapp.baseBlock.title} to the output first!`);
        return;
      }

      // Case 1.2: Output already has base block and has reached the limit
      if (!noBaseBlockInOutput && activeIsABase && !canPlaceMoreBase) {
        alert(`You can only place ${thisDapp.baseBlock.placableAmount} base!`);
        return;
      }

      // Case 1.3: The lego just dragged already in the output
      if (activeFromRightSide) {
        return;
      }


      // Case 1.4: The lego just dragged is a base block
      if (activeIsABase) {
        draggedIds2DSignal.value = [...draggedIds2D, []];
        return;
      }

      // Case 1.5: The lego just dragged is a block/single
      if ((activeIsABlock || activeIsASingle) && overIsABase) {
        const prefix = "right-" + (activeIsABlock ? FieldKeyPrefix.BLOCK : FieldKeyPrefix.SINGLE);

        draggedIds2D[overBaseIndex] = [...draggedIds2D[overBaseIndex], {
          name: prefix + "-" + DragUtil.getOriginalKey(activeId),
          value: '',
          parentNames: [],
        }];
        draggedIds2DSignal.value = [...draggedIds2D];
        return;
      }

      return;
    }

    // Case 2: Drag to the left
    if (overIsInput) {
      // Case 2.1: Dragged lego is a base block
      if (activeIsABase) {
        draggedIds2DSignal.value = removeItemAtIndex(draggedIds2D, activeBaseIndex);
        return;
      }

      // Case 2.2: Dragged lego is a block
      if (activeIsABlock) {
        const formDappInput = formDappInputSignal.value
        const formDappDropdown = formDappDropdownSignal.value
        const formDappToggle = formDappToggleSignal.value

        Object.keys(formDappInput).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDappInput[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );
            formDappInput[newKey] = formDappInput[key];
            delete formDappInput[key];
          }
        });

        Object.keys(formDappDropdown).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDappDropdown[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDappDropdown[newKey] = formDappDropdown[key];
            delete formDappDropdown[key];
          }
        });

        Object.keys(formDappToggle).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDappToggle[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDappToggle[newKey] = formDappToggle[key];
            delete formDappToggle[key];
          }
        });

        formDappInputSignal.value = { ...formDappInput };
        formDappDropdownSignal.value = { ...formDappDropdown };
        formDappToggleSignal.value = { ...formDappToggle };
        draggedIds2D[activeBaseIndex] = removeItemAtIndex(draggedIds2D[activeBaseIndex], Number(DragUtil.getChildIndex(activeId)));
        draggedIds2DSignal.value = [...draggedIds2D];
        return;
      }

      // // Case 2.3: Dragged lego is a single
      if (activeIsASingle) {
        const formDappDropdown = formDappDropdownSignal.value;
        const formDappInput = formDappInputSignal.value;
        const formDappToggle = formDappToggleSignal.value;

        Object.keys(formDappInput).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDappInput[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );
            formDappInput[newKey] = formDappInput[key];
            delete formDappInput[key];
          }
        });

        Object.keys(formDappDropdown).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDappDropdown[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDappDropdown[newKey] = formDappDropdown[key];
            delete formDappDropdown[key];
          }
        });

        Object.keys(formDappToggle).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === activeIndex
          ) {
            delete formDappToggle[key];
          } else if (FormDappUtil.getIndex(key) > activeIndex) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDappToggle[newKey] = formDappToggle[key];
            delete formDappToggle[key];
          }
        });

        draggedIds2D[activeBaseIndex] = removeItemAtIndex(draggedIds2D[activeBaseIndex], Number(DragUtil.getChildIndex(activeId)));
        formDappInputSignal.value = { ...formDappInput };
        formDappDropdownSignal.value = { ...formDappDropdown };
        formDappToggleSignal.value = { ...formDappToggle };
        draggedIds2DSignal.value = [...draggedIds2D];
        return;
      }

      return;
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const fetchData = async () => {
    // const dapps = dappState.configs;
    const dapps = dappMockupData;
    const sortedDapps = dapps.sort((a, b) => a.order - b.order);

    setDapps(sortedDapps);
  };

  const changeDapp = (index: number) => {
    formDappInputSignal.value = JSON.parse(JSON.stringify({}));
    formDappDropdownSignal.value = JSON.parse(JSON.stringify({}));
    formDappToggleSignal.value = JSON.parse(JSON.stringify({}));
    draggedIds2DSignal.value = draggedIds2DSignal.value
      // .map(() => null)
      .filter((x) => x !== null);
    setCurrentIndexDapp(index);
  };

  React.useEffect(() => {
    fetchData();
  }, [dappState]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image
            src={'/bvmstudio_logo.png'}
            alt={'bvmstudio_logo'}
            width={549}
            height={88}
          />
        </div>
        <p className={styles.content_text}>
          Drag and drop modules to start new blockchains, new dapps, and new
          economies.
        </p>
      </div>

      <div className={styles.container__header}>
        <div></div>
        <div>
          <LaunchButton />
        </div>
      </div>

      <div className={styles.container__content}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            className={styles.container__content__droppable}
            id="left-droppable"
          >
            <LeftDroppable />
          </div>

          <DragMask />

          <div className={styles.container__content__droppable}>
            <RightDroppable />
          </div>

          <div className={styles.container__content__sidebar}>
            <div className={styles.container__content__sidebar__header}>
              {dapps.map((dapp, index) => {
                return (
                  <Button
                    element="button"
                    type="button"
                    color="transparent"
                    onClick={() => changeDapp(index)}
                    className={styles.resetButton}
                  >
                    <div>
                      {dapp.icon && (
                        <Image
                          src={dapp.icon}
                          width={16}
                          height={16}
                          alt="icon"
                        />
                      )}{' '}
                      {dapp.title}
                    </div>
                    <div />
                  </Button>
                );
              })}
            </div>

            <div className={styles.container__content__sidebar__footer}>
              <Button
                element="button"
                type="button"
                onClick={() => {}}
                className={styles.resetButton}
              >
                EXPORT
              </Button>
              <Button
                element="button"
                type="button"
                onClick={() => {}}
                className={styles.resetButton}
              >
                SHARE
              </Button>
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default RollupsDappPage;
