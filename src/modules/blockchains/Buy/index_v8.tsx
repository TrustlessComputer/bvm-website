import { DndContext } from '@dnd-kit/core';
import React from 'react';
import s from './styles_v6.module.scss';
import useHandleDragging from '@/modules/blockchains/Buy/hooks/useHandleDragging';
import StudioMain from '@/modules/blockchains/Buy/studio/Main';
import useFixScrollOverDrag from '@/modules/blockchains/Buy/hooks/useFixScrollOverDrag';
import useCalcPrice from '@/modules/blockchains/Buy/hooks/useCalcPrice';
import useCheckingSupported from '@/modules/blockchains/Buy/hooks/useCheckingSupported';
import { TABS } from '@/modules/blockchains/Buy/constants';
import { useTabs } from '@/modules/blockchains/Buy/studio/useTabs';
import useFetchingTemplate from '@/modules/blockchains/Buy/hooks/useFetchingTemplate';
import useNodeFlowControl from './hooks/useNodeFlowControl';
import { useNodesState } from '@xyflow/react';

const BuyPage = () => {
  useFetchingTemplate();
  useCheckingSupported();
  useCalcPrice();
  useFixScrollOverDrag();
  useNodeFlowControl();

  const { handleDragStart, handleDragEnd, sensors } = useHandleDragging();

  const { tabActive } = useTabs((state) => state);
  const isTabCode = React.useMemo(() => {
    return tabActive === TABS.CODE;
  }, [tabActive]);

  return (
    <div
      className={`${s.container} ${isTabCode ? '' : s.explorePageContainer}`}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <StudioMain />
      </DndContext>
    </div>
  );
};

export default BuyPage;
