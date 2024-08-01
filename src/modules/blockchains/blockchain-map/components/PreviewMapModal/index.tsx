import React, { useCallback, useState } from 'react';
import s from './styles.module.scss';
import BaseModal from '@components/BaseModal';
import {
  applyEdgeChanges,
  applyNodeChanges,
  ConnectionMode,
  EdgeChange,
  MarkerType,
  NodeChange,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomEdge from './CustomEdge';
import CustomNode from '@/modules/blockchains/blockchain-map/components/PreviewMapModal/CustomNode';
import { FAKE_DATA_MAPPING } from '@/modules/blockchains/blockchain-map/components/PreviewMapModal/data';
import { EdgeBase, NodeBase } from '@xyflow/system';


const initialEdges = FAKE_DATA_MAPPING.filter(box => box.connection).map(box => {
  if(!box.connection) return;

  return box.connection.map(line => {
    return {
      type: 'custom-edge',
      source: box.id,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      ...line,
    }
  })
}).flat() as EdgeBase[]

const initialNodes: NodeBase[] = FAKE_DATA_MAPPING.map(box => {
  return {
    ...box,
    type: 'customBox',
  }
})



export default function PreviewMapModal({ ...props }): React.JSX.Element {
  const { show, onClose } = props;
  const [nodes, setNodes] = useState<NodeBase[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeBase[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      title={'Blockchain preview map'}
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // nodesDraggable={false}
        // elementsSelectable={false}
        edgeTypes={{
          'custom-edge': CustomEdge,
        }}
        nodeTypes={{ customBox: CustomNode }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
      <div className={s.overlay}></div>
    </BaseModal>
  );
}
