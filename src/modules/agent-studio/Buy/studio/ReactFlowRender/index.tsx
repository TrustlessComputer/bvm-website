import CustomEdge from '@/modules/agent-studio/Buy/component4/CustomEdge';
import useLineIssueToken from '@/modules/agent-studio/Buy/hooks/useLineIssueToken';
import { useIsFirstLoadTemplateBox } from '@/modules/agent-studio/Buy/stores/useFirstLoadTemplateBoxStore';
import { signal, useSignalEffect } from '@preact/signals-react';
import { ConnectionMode, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useState } from 'react';
import ChainNodeV2 from '../../component4/YourNodes/ChainNodeV2';
import DappNode from '../../component4/YourNodes/DappNode';
import GeneralIdeaNode from '../../component4/YourNodes/GeneralIdeaNode/GeneralIdeaNode';
import NFTNode from '../../component4/YourNodes/NFTNode/NFTNode';
import { nodeKey } from '../../component4/YourNodes/node.constants';
import OrdinalsNode from '../../component4/YourNodes/OrdinalsNode/OrdinalsNode';
import TokenNode from '../../component4/YourNodes/TokenNode/TokenNode';
import { isActingSignal } from '../../signals/useFlowStatus';
import useFlowStore, { useEdges, useNodes } from '../../stores/useFlowStore';
import { useCategories } from '../../stores/useModelCategoriesStore';
import s from './styles.module.scss';

export const needReactFlowRenderSignal = signal(false);
const currentPositionSignal = signal({ x: 0, y: 0, zoom: 1 });

const ReactFlowRenderer = React.memo(() => {
  const isFirstLoadTemplateBox = useIsFirstLoadTemplateBox();

  const nodes = useNodes();
  const edges = useEdges();
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);

  const categories = useCategories();

  useLineIssueToken();

  const [currentPosition, setCurrentPosition] = useState(
    currentPositionSignal.value,
  );
  const [count, setCount] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useSignalEffect(() => {
    if (needReactFlowRenderSignal.value) {
      setCurrentPosition(currentPositionSignal.value);
      setCount(count + 1);
      needReactFlowRenderSignal.value = false;
    }
  });

  const handleActing = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    isActingSignal.value = true;

    timeoutRef.current = setTimeout(() => {
      isActingSignal.value = false;
    }, 300);
  };

  React.useEffect(() => {
    if (!isFirstLoadTemplateBox || loaded) return;

    setLoaded(true);
  }, [categories, loaded, isFirstLoadTemplateBox]);

  return (
    <>
      <ReactFlow
        key={JSON.stringify(edges) + count}
        nodes={nodes}
        nodeTypes={{
          // V1
          // [nodeKey.CUSTOM_BOX]: CustomNode,
          // [nodeKey.CHAIN_NODE]: ChainNode,
          // [nodeKey.DAPP_TEMPLATE]: DappTemplateNode,

          // V2
          [nodeKey.CHAIN_NODE]: ChainNodeV2,
          [nodeKey.DAPP_NODE]: DappNode,
          [nodeKey.GENERAL_IDEA_NODE]: GeneralIdeaNode,
          [nodeKey.NFT_ETHER_NODE]: NFTNode,
          [nodeKey.NFT_ORDINAL_BTC_NODE]: OrdinalsNode,
          [nodeKey.TOKENS_PUMP_NODE]: TokenNode,
        }}
        edgeTypes={{
          customEdge: CustomEdge,
        }}
        defaultViewport={currentPosition}
        deleteKeyCode={''}
        onViewportChange={(viewState) => {
          currentPositionSignal.value = viewState;
          handleActing();
        }}
        onEdgesChange={onEdgesChange}
        onNodesChange={(changes) => {
          onNodesChange(changes);
          handleActing();
        }}
        edgesFocusable={false}
        zoomOnDoubleClick={false}
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        fitViewOptions={{ padding: 1 }}
        className={s.reactFlow}
        onNodeDragStop={() => {
          if (!isFirstLoadTemplateBox) return;
        }}
      />
    </>
  );
});

export default ReactFlowRenderer;
