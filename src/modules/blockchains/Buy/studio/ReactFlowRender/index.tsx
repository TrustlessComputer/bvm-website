import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { ReactFlow, useNodesState } from '@xyflow/react';
import React from 'react';
import useFlowStore from '../../stores/useFlowStore';
import ChainNode from '../../component4/CustomNode/ChainNode';
import s from './styles.module.scss'
const ReactFlowRenderer = React.memo(() => {
  const { nodes, setNodes, onNodesChange } = useFlowStore();

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{ customBox: CustomNode, chainNode: ChainNode }}
      onNodesChange={onNodesChange}
      zoomOnDoubleClick={false}
      fitView
      fitViewOptions={{ padding: 2 }}
      nodeOrigin={[0.5, 0]}
      className={s.reactFlow}
    />
  );
});

export default ReactFlowRenderer;
