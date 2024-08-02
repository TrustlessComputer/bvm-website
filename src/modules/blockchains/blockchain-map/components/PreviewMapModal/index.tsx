import React, { useCallback, useEffect, useState } from 'react';
import s from './styles.module.scss';
import BaseModal from '@components/BaseModal';
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
import CustomEdge from './CustomEdge';
import CustomNode from '@/modules/blockchains/blockchain-map/components/PreviewMapModal/CustomNode';
import { FAKE_DATA_MAPPING } from '@/modules/blockchains/blockchain-map/components/PreviewMapModal/data';
import { EdgeBase, NodeBase } from '@xyflow/system';
import { edges as initialEdges } from './edges';
import useLayoutNodes from './useLayoutNodes';
import { useChainInfor } from '@/modules/blockchains/detail_v3/hook/useChainInfor';
import { formatData } from '@/modules/blockchains/blockchain-map/components/PreviewMapModal/formatData';

const initialNodes: NodeBase[] = FAKE_DATA_MAPPING.map(box => {
  return {
    ...box,
    type: 'customBox',
  };
});


export default function PreviewMapModal({ ...props }): React.JSX.Element {
  const { show, onClose } = props;
  const [nodes, setNodes] = useState<NodeBase[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeBase[]>(initialEdges);
  const data = useChainInfor("6673a86fb7a831e3dd931465");

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );


  useEffect(() => {
    const dataClean = formatData(FAKE_DATA_MAPPING, data);
  }, []);

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      title={'Blockchain preview map'}
      icCloseUrl="/icons/ic-close-grey.svg"
    >
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
        <div className={s.overlay}></div>
      </ReactFlowProvider>

    </BaseModal>
  );
}

function Flow(props: ReactFlowProps) {
  useReactFlow();
  useLayoutNodes();

  return <ReactFlow {...props} />;
}
