import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { ReactFlow, useNodesState } from '@xyflow/react';
import React from 'react';
import '@xyflow/react/dist/style.css';
import useFlowStore from '../../stores/useFlowStore';
import ChainNode from '../../component4/CustomNode/ChainNode';
import s from './styles.module.scss';
import DappTemplateNode from '../../component4/CustomNode/DappTemplateNode';
import CustomEdge from '@/modules/blockchains/Buy/component4/CustomEdge';
const ReactFlowRenderer = React.memo(() => {
  const { nodes, setNodes, onNodesChange, edges } = useFlowStore();

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{
        customBox: CustomNode,
        chainNode: ChainNode,
        dappTemplate: DappTemplateNode,
      }}
      edgeTypes={{
        'custom-edge': CustomEdge,
      }}
      onNodesChange={onNodesChange}
      zoomOnDoubleClick={false}
      edges={edges}
      // fitView
      fitViewOptions={{ padding: 2 }}
      // nodeOrigin={[0.5, 0]}
      className={s.reactFlow}
    />
  );
});

export default ReactFlowRenderer;
