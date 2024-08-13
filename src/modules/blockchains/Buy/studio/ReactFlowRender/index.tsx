import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { ReactFlow } from '@xyflow/react';
import React from 'react';
import '@xyflow/react/dist/style.css';
import useFlowStore from '../../stores/useFlowStore';
import ChainNode from '../../component4/CustomNode/ChainNode';
import s from './styles.module.scss';
import DappTemplateNode from '../../component4/CustomNode/DappTemplateNode';
import CustomEdge from '@/modules/blockchains/Buy/component4/CustomEdge';

const ReactFlowRenderer = React.memo(() => {
  const { nodes, onNodesChange, edges, onEdgesChange } = useFlowStore();

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{
        customBox: CustomNode,
        chainNode: ChainNode,
        dappTemplate: DappTemplateNode,
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
