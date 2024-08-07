import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { ReactFlow, useNodesState } from '@xyflow/react';
import React from 'react';

const ReactFlowRenderer = React.memo(() => {
  const [nodes, onNodesChange] = useNodesState<any>([]);

  console.log('render', nodes);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{ customBox: CustomNode }}
      onNodesChange={onNodesChange}
      key={nodes.length.toString()}
      fitView
      fitViewOptions={{ padding: 2 }}
      nodeOrigin={[0.5, 0]}
    />
  );
});

export default ReactFlowRenderer;
