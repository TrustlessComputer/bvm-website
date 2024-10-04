import { DndContext } from '@dnd-kit/core';
import styles from './styles_v6.module.scss';
import React from 'react';
import { useTabs } from './studio/useTabs';
import { TABS } from './constants';
import useDragHelper from './hooks/helpers/useDragHelper';
import cn from 'classnames';
const BuyPageV9 = () => {
  const isTabCode = useTabs((state) => state.tabActive === TABS.CODE);

  const { handleDragStart, handleDragEnd, sensors } = useDragHelper();

  return (
    <div
      className={cn(styles.container, {
        [styles.explorePageContainer]: isTabCode,
      })}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      ></DndContext>
    </div>
  );
};

export default BuyPageV9;
