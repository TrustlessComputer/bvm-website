import React, { useCallback, useState } from 'react';
import s from './styles.module.scss';
import {
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
  NodeChange,
  ReactFlow,
  ReactFlowProps,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../CustomNode';
import { FAKE_DATA_MAPPING } from '../../data';
import { EdgeBase, NodeBase } from '@xyflow/system';
import { edges as initialEdges } from '../../edges';
import useLayoutNodes from '../../useLayoutNodes';
import CustomEdge from '../CustomEdge';

const initialNodes: NodeBase[] = FAKE_DATA_MAPPING.map(box => {
  return {
    ...box,
    type: 'customBox',
  };
});


export default function FlowMapping(): React.JSX.Element {
  const [nodes, setNodes] = useState<NodeBase[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeBase[]>(initialEdges);
  // const data = useChainInfor("6673a86fb7a831e3dd931465");

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );


  // useEffect(() => {
  //   const dataClean = formatData(FAKE_DATA_MAPPING, data);
  // }, []);

  return (
    <div className={s.wrapperMappingFlow}>
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          edgeTypes={{ 'custom-edge': CustomEdge, }}
          nodeTypes={{ customBox: CustomNode }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        />
      </ReactFlowProvider>
    </div>

  );
}

function Flow(props: ReactFlowProps) {
  useReactFlow();
  useLayoutNodes();

  return <ReactFlow {...props} />;
}
