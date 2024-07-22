import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Image from 'next/image';

import { FormDappUtil, MouseSensor, removeItemAtIndex } from './utils';
import { dappMockupData } from './mockup_3';
import { FieldKeyPrefix } from './contants';
import LeftDroppable from './components/LeftDroppable';
import RightDroppable from './components/RightDroppable';
import DragMask from './components/DragMask';
import LaunchButton from './components/LaunchButton';
import Button from './components/Button';
import useDappsStore, { useFormDappsStore } from './stores/useDappStore';
import { draggedIdsSignal } from './signals/useDragSignal';
import {
  formDappDropdownSignal,
  formDappInputSignal,
} from './signals/useFormDappsSignal';

import styles from './styles.module.scss';

const RollupsDappPage = () => {
  const { dapps, setDapps, currentIndexDapp, setCurrentIndexDapp } =
    useDappsStore();

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    const draggedIds = (draggedIdsSignal.value || []) as string[];
    const baseBlockNotInOutput =
      !draggedIds[0] || draggedIds[0] !== FieldKeyPrefix.BASE;
    const onlyAllowOneBase = true; // Fake data
    const overIsInput = over?.id === 'input';
    const overIsOutput = over?.id === 'output';
    const activeIsABaseBlock = active.id === FieldKeyPrefix.BASE;
    const activeIsABlock =
      active.id.toString().split('-')[0] === FieldKeyPrefix.BLOCK;
    const activeIsASingle =
      active.id.toString().split('-')[0] === FieldKeyPrefix.SINGLE;
    const indexOfField = Number(active.id.toString().split('-')[2]);

    // Case 1: Drag to the right
    if (overIsOutput) {
      // Case 1.1: Output does not have base block yet
      if (baseBlockNotInOutput && !activeIsABaseBlock) {
        alert(`Please drag ${thisDapp.baseBlock.title} to the output first!`);
        return;
      }

      // Case 1.2: Output already has base block and only allow 1
      if (!baseBlockNotInOutput && activeIsABaseBlock && onlyAllowOneBase) {
        alert(`Only 1 base block is allowed!`);
        return;
      }

      // Case 1.3: The lego just dragged is already in the output
      if (!!indexOfField) {
        return;
      }

      draggedIdsSignal.value = [...draggedIds, active.id] as string[];

      return;
    }

    // Case 2: Drag to the left
    if (overIsInput) {
      // Case 2.1
      if (activeIsABaseBlock) {
      }

      // Case 2.2
      if (activeIsABlock) {
        const formDappInput = JSON.parse(
          JSON.stringify(formDappInputSignal.value),
        ) as Record<string, any>;
        const formDappDropdown = JSON.parse(
          JSON.stringify(formDappDropdownSignal.value),
        ) as Record<string, any>;

        Object.keys(formDappInput).forEach((key) => {
          if (
            FormDappUtil.isInBlock(key) &&
            FormDappUtil.getIndex(key) === indexOfField
          ) {
            delete formDappInput[key];
          } else if (FormDappUtil.getIndex(key) > indexOfField) {
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
            FormDappUtil.getIndex(key) === indexOfField
          ) {
            delete formDappDropdown[key];
          } else if (FormDappUtil.getIndex(key) > indexOfField) {
            const currentIndex = FormDappUtil.getIndex(key);
            const newKey = key.replace(
              `-${currentIndex}`,
              `-${currentIndex - 1}`,
            );

            formDappDropdown[newKey] = formDappDropdown[key];
            delete formDappDropdown[key];
          }
        });

        formDappInputSignal.value = formDappInput;
        formDappDropdownSignal.value = formDappDropdown;
      }

      // Case 2.3
      if (activeIsASingle) {
      }

      draggedIdsSignal.value = removeItemAtIndex(draggedIds, indexOfField + 1);

      return;
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const fetchData = async () => {
    const dapps = dappMockupData;
    const sortedDapps = dapps.sort((a, b) => a.order - b.order);

    setDapps(sortedDapps);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
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
                    onClick={() => setCurrentIndexDapp(index)}
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
