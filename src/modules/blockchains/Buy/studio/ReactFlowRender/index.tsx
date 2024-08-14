import CustomEdge from '@/modules/blockchains/Buy/component4/CustomEdge';
import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';
import ChainNode from '../../component4/CustomNode/ChainNode';
import DappTemplateNode from '../../component4/CustomNode/DappTemplateNode';
import DappNode from '../../component4/YourNodes/DappNode';
import useFlowStore from '../../stores/useFlowStore';
import s from './styles.module.scss';

const ReactFlowRenderer = React.memo(() => {
  const { nodes, onNodesChange, edges, onEdgesChange } = useFlowStore();

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{
        customBox: CustomNode,
        chainNode: ChainNode,
        dappTemplate: DappTemplateNode,
        dappNode: DappNode,
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
