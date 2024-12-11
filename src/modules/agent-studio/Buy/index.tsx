import { TABS } from '@/modules/agent-studio/Buy/constants';
import useCalcPrice from '@/modules/agent-studio/Buy/hooks/useCalcPrice';
import useCheckingSupported from '@/modules/agent-studio/Buy/hooks/useCheckingSupported';
import useFetchingTemplate from '@/modules/agent-studio/Buy/hooks/useFetchingTemplate';
import useFixScrollOverDrag from '@/modules/agent-studio/Buy/hooks/useFixScrollOverDrag';
import useHandleDragging from '@/modules/agent-studio/Buy/hooks/useHandleDragging';
import StudioMain from '@/modules/agent-studio/Buy/studio/Main';
import { useTabs } from '@/modules/agent-studio/Buy/studio/useTabs';
import { DndContext } from '@dnd-kit/core';
import React from 'react';
import ClearStore from './ClearStore';
import useAutoUpdateNodePosition from './hooks/useAutoUpdateNodePosition';
import useCheckNodes from './hooks/useCheckNodes';
import useGettingDappLego from './hooks/useGettingDappLego';
import useNodeFlowControl from './hooks/useNodeFlowControl';
import useOnlyFetchDapp from './hooks/useOnlyFetchDapp';
import useSetDefaultDapp from './hooks/useSetDefaultDapp';
import s from './styles_v6.module.scss';
import useLineIssueToken from '@/modules/agent-studio/Buy/hooks/useLineIssueToken';
import useCheckEdges from '@/modules/agent-studio/Buy/hooks/useCheckEdges';

const BuyPage = () => {
  const { handleDragStart, handleDragEnd, sensors } = useHandleDragging();

  // useAutoUpdateNodePosition();
  useOnlyFetchDapp();
  useFetchingTemplate();
  useCheckingSupported();
  useCalcPrice();
  useFixScrollOverDrag();
  useNodeFlowControl();
  useGettingDappLego();
  useCheckNodes();
  useSetDefaultDapp();
  useCheckEdges();

  const { tabActive } = useTabs((state) => state);
  const isTabCode = React.useMemo(() => {
    return tabActive === TABS.CODE;
  }, [tabActive]);

  return (
    <div
      className={`${s.container} ${isTabCode ? '' : s.explorePageContainer}`}
    >
      <ClearStore />
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
