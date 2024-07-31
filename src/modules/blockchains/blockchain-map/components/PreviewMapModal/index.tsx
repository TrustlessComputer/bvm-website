import React, { useCallback, useState } from 'react';
import s from './styles.module.scss';
import BaseModal from '@components/BaseModal';
import { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomEdge from './CustomEdge';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Blockchain' },
    position: { x: 100, y: 25 },
  },

  {
    id: '2',
    data: { label: <>
        <div>Staking apps</div>
        <div>Staking apps</div>
        <div>Staking apps</div>
      </>
    },
    position: { x: 350, y: 25 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Degen apps' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Gaming apps' },
    position: { x: 450, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-3', source: '1', target: '3', className: `${s.line}` , label: 'Output 1', labelShowBg: false,   markerEnd: {
      type: MarkerType.Arrow,
    }, },
  { id: 'e2-2', source: '1', target: '2', label: 'Output 2', labelShowBg: false,    markerEnd: {
      type: MarkerType.Arrow,
    }, },
  { id: 'e1-4', source: '1', target: '4', label: 'Output 2', labelShowBg: false,    markerEnd: {
      type: MarkerType.Arrow,
    }, },
];

const edgeTypes = {
  'custom-edge': CustomEdge,
};


export default function PreviewMapModal({...props}): React.JSX.Element {
  const { show, onClose } = props;
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="extra"
      title={'Blockchain preview map'}
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      />
    </BaseModal>
  );
}
