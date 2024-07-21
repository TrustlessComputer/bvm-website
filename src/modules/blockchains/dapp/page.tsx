import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { MouseSensor } from './utils';
import { dappMockupData } from './mockup';
import LeftDroppable from './components/LeftDroppable';
import RightDroppable from './components/RightDroppable';
import DragMask from './components/DragMask';
import useDappsStore from './stores/useDappStore';

import styles from './styles.module.scss';
import { draggedIdsSignal } from './signals/useDragSignal';

const RollupsDappPage = () => {
  const { dapps, setDapps } = useDappsStore();

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[0];
  }, [dapps]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    const draggedIds = (draggedIdsSignal.value || []) as string[];
    const baseBlockNotInOutput = !draggedIds[0] || draggedIds[0] !== 'base';
    const onlyAllowOneBase = true; // Fake data
    const overIsInput = over?.id === 'input';
    const overIsOutput = over?.id === 'output';
    const activeIsRequiredField = active.id === 'base';

    // Case 1: Drag to the right
    if (overIsOutput) {
      // Case 1.1: Output does not have base block yet
      if (baseBlockNotInOutput && !activeIsRequiredField) {
        alert(`Please drag ${thisDapp.baseBlock.title} to the output first!`);
        return;
        // Case 1.2: Output already has base block and only allow 1
      } else if (
        !baseBlockNotInOutput &&
        activeIsRequiredField &&
        onlyAllowOneBase
      ) {
        alert(`Only 1 base block is allowed!`);
        return;
      }

      draggedIdsSignal.value = [...draggedIds, active.id] as string[];

      return;
    }

    // Case 2: Drag to the left
    if (overIsInput) {
      draggedIdsSignal.value = draggedIds.filter((id) => id !== active.id);

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
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.container__droppable} id="left-droppable">
          <LeftDroppable />
        </div>

        <DragMask />

        <div className={styles.container__droppable}>
          <RightDroppable />
        </div>
      </DndContext>
    </div>
  );
};

export default RollupsDappPage;
