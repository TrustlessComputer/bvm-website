import useCalcPrice from '@/modules/agent-studio/Buy/hooks/useCalcPrice';
import useCheckEdges from '@/modules/agent-studio/Buy/hooks/useCheckEdges';
import useCheckingSupported from '@/modules/agent-studio/Buy/hooks/useCheckingSupported';
import useFetchingTemplate from '@/modules/agent-studio/Buy/hooks/useFetchingTemplate';
import useFixScrollOverDrag from '@/modules/agent-studio/Buy/hooks/useFixScrollOverDrag';
import useHandleDragging from '@/modules/agent-studio/Buy/hooks/useHandleDragging';
import StudioMain from '@/modules/agent-studio/Buy/studio/Main';
import { useIsTabCode } from '@/modules/agent-studio/Buy/studio/useTabs';
import { DndContext } from '@dnd-kit/core';
import ClearStore from './ClearStore';
import useCheckNodes from './hooks/useCheckNodes';
import useGettingDappLego from './hooks/useGettingDappLego';
import useNodeFlowControl from './hooks/useNodeFlowControl';
import useOnlyFetchDapp from './hooks/useOnlyFetchDapp';
import useSetDefaultDapp from './hooks/useSetDefaultDapp';
import s from './styles.module.scss';

const BuyPage = () => {
  const { handleDragStart, handleDragEnd, sensors } = useHandleDragging();

  useFixScrollOverDrag();

  useOnlyFetchDapp();
  useFetchingTemplate();

  useCheckingSupported();
  useCalcPrice();

  useNodeFlowControl();
  useGettingDappLego();
  useCheckNodes();
  useSetDefaultDapp();
  useCheckEdges();

  const isTabCode = useIsTabCode();

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
