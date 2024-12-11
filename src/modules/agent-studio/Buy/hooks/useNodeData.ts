import { useNodesState } from '@xyflow/react';

export default function useNodeData() {

  const [nodes, onNodesChange, setNodes] = useNodesState<any>([]);

  return {
    nodes, onNodesChange, setNodes,
  };
}
