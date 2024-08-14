import CustomEdge from '@/modules/blockchains/Buy/component4/CustomEdge';
import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';
import ChainNode from '../../component4/CustomNode/ChainNode';
import DappTemplateNode from '../../component4/CustomNode/DappTemplateNode';
import DappNode from '../../component4/YourNodes/DappNode';
import { nodeKey } from '../../component4/YourNodes/node.constants';
import useFlowStore from '../../stores/useFlowStore';
import s from './styles.module.scss';

const ReactFlowRenderer = React.memo(() => {
  const { nodes, onNodesChange, edges, onEdgesChange } = useFlowStore();

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{
        // V1
        [nodeKey.CUSTOM_BOX]: CustomNode,
        [nodeKey.CHAIN_NODE]: ChainNode,
        [nodeKey.DAPP_TEMPLATE]: DappTemplateNode,

        // V2
        [nodeKey.DAPP_NODE]: DappNode,
      }}
      edgeTypes={{
        customEdge: CustomEdge,
      }}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      zoomOnDoubleClick={false}
      edges={edges}
      fitViewOptions={{ padding: 2 }}
      className={s.reactFlow}
    />
  );
});

export default ReactFlowRenderer;
