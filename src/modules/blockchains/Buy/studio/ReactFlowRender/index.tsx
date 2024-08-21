import CustomEdge from '@/modules/blockchains/Buy/component4/CustomEdge';
import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { signal, useSignalEffect } from '@preact/signals-react';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useState } from 'react';
import DappTemplateNode from '../../component4/CustomNode/DappTemplateNode';
import AANode from '../../component4/YourNodes/AANode';
import BridgeNode from '../../component4/YourNodes/BridgeNode';
import ChainNodeV2 from '../../component4/YourNodes/ChainNodeV2';
import DappNode from '../../component4/YourNodes/DappNode';
import { nodeKey } from '../../component4/YourNodes/node.constants';
import useFlowStore from '../../stores/useFlowStore';
import s from './styles.module.scss';

export const needReactFlowRenderSignal = signal(false);
const currentPositionSignal = signal({ x: 0, y: 0, zoom: 1 });

const ReactFlowRenderer = React.memo(() => {
  const { nodes, onNodesChange, edges, onEdgesChange } = useFlowStore();
  const [currentPosition, setCurrentPosition] = useState(
    currentPositionSignal.value,
  );
  const [count, setCount] = React.useState(0);

  useSignalEffect(() => {
    if (needReactFlowRenderSignal.value) {
      setCurrentPosition(currentPositionSignal.value);
      setCount(count + 1);
      needReactFlowRenderSignal.value = false;
    }
  });

  return (
    <ReactFlow
      key={JSON.stringify(edges) + count}
      nodes={nodes}
      nodeTypes={{
        // V1
        [nodeKey.CUSTOM_BOX]: CustomNode,
        // [nodeKey.CHAIN_NODE]: ChainNode,
        [nodeKey.DAPP_TEMPLATE]: DappTemplateNode,

        // V2
        [nodeKey.DAPP_NODE]: DappNode,
        [nodeKey.CHAIN_NODE]: ChainNodeV2,
        [nodeKey.ACCOUNT_ABSTRACTION_NODE]: AANode,
        [nodeKey.BRIDGE_NODE]: BridgeNode,
      }}
      edgeTypes={{
        customEdge: CustomEdge,
      }}
      defaultViewport={currentPosition}
      deleteKeyCode={''}
      onViewportChange={(viewState) => {
        currentPositionSignal.value = viewState;
      }}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      zoomOnDoubleClick={false}
      edges={edges}
      fitViewOptions={{ padding: 1 }}
      className={s.reactFlow}
    />
  );
});

export default ReactFlowRenderer;
