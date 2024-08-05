import React, { useCallback, useState } from 'react';
import { useSignalEffect } from '@preact/signals-react';
import Image from 'next/image';

import Droppable from '../Droppable';
import Button from '../Button';
import DraggedItems from './DraggedItems';
import FetchedItems from './FetchedItems';
import { subScribeDropEnd } from '../../stores/useDappStore';
import { draggedIds2DSignal } from '../../signals/useDragSignal';
import { formDappSignal } from '../../signals/useFormDappsSignal';
import { useThisDapp } from '../../hooks/useThisDapp';

import { DappModel } from '@/types/customize-model';
import { useChainInfor } from '@/modules/blockchains/detail_v3/hook/useChainInfor';

import styles from './styles.module.scss';
import { applyNodeChanges, NodeChange, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import CustomNode from 'src/modules/blockchains/Buy/component4/CustomNode';
import { NodeBase } from '@xyflow/system';
import { FAKE_DATA_MAPPING } from '@/modules/blockchains/Buy/data';

// const initialNodes: NodeBase[] = FAKE_DATA_MAPPING.map((box) => {
//   return {
//     ...box,
//     type: 'customBox',
//   };
// });

const RightDroppableV2 = () => {
  const { thisDapp } = useThisDapp();
  const chain = useChainInfor('6673a86fb7a831e3dd931465');
  const [nodes, setNodes] = useState<NodeBase[]>([]);

  React.useEffect(() => {

    const newData = {
      id: `box-blockchain`,
      data: {
        status: 'Running',
        label: 'Blockchain',
        chain: chain.chainData,
        dapp: null,
      },
      type: 'customBox',
      position: { x: 200, y: 200 },
    }

    setNodes([newData])
    console.log('newData', newData);
  }, [chain])


  const refContainer = React.useRef<HTMLDivElement>(null);
  const refWrap = React.useRef<HTMLDivElement>(null);

  const handleReset = () => {
    formDappSignal.value = [];
    draggedIds2DSignal.value = [];
  };

  const onActionClick = (params: { dapp: DappModel }) => {
    console.log(params.dapp?.action);
    alert('CLICK ME');
  };

  useSignalEffect(() => {
    const isHad = subScribeDropEnd.value;

    setTimeout(() => {
      if (!refWrap.current || !refContainer.current) return;
      if (
        isHad &&
        refWrap.current.scrollHeight > refContainer.current.scrollHeight
      ) {
        const ouputEl = refWrap.current?.querySelector<HTMLElement>('#output');
        if (ouputEl) ouputEl.style.alignItems = 'flex-start';
      }
    }, 150);
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  if (!thisDapp) return null;

  return (
    <div className={styles.wrapRight} ref={refContainer}>
      <div className={styles.wrapRight_inner} ref={refWrap}>
        <ReactFlowProvider>
          <ReactFlow

            nodes={nodes}
            // edges={edges}
            // edgeTypes={{ 'custom-edge': CustomEdge }}
            nodeTypes={{ customBox: CustomNode }}
            onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            fitView
          />
          <Droppable
            id="output"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                transform: 'translateX(35%)',
              }}
            >
              <DraggedItems />
              <FetchedItems />
            </div>
          </Droppable>
        </ReactFlowProvider>

      </div>

      <div className={styles.resetButton}>
        <Button element="button" type="button" onClick={() => handleReset()}>
          EXPORT{' '}
          <Image
            src="/icons/ic_image_2.svg"
            alt="ic_image_2"
            width={20}
            height={20}
          />
        </Button>
        <Button element="button" type="button" onClick={() => handleReset()}>
          SHARE{' '}
          <Image
            src="/icons/ic_x_v2.svg"
            alt="twitter"
            width={20}
            height={20}
          />
        </Button>
        <Button element="button" type="button" onClick={() => handleReset()}>
          RESET{' '}
          <Image src="/icons/undo.svg" alt="undo" width={20} height={20} />
        </Button>
      </div>
    </div>
  );

  // return (
  //   <div className={styles.wrapRight}>
  //     <div className={styles.wrapRight_inner}>
  //       <FlowMapping />
  //     </div>
  //     <div className={styles.resetButton}>
  //       <Button
  //         element="button"
  //         type="button"
  //         onClick={() => handleReset()}

  //       >
  //         EXPORT <Image src="/icons/ic_image_2.svg" alt="ic_image_2" width={20} height={20} />
  //       </Button>
  //       <Button
  //         element="button"
  //         type="button"
  //         onClick={() => handleReset()}

  //       >
  //         SHARE <Image src="/icons/ic_x_v2.svg" alt="twitter" width={20} height={20} />
  //       </Button>
  //       <Button
  //         element="button"
  //         type="button"
  //         onClick={() => handleReset()}
  //         // className={styles.resetButton}
  //       >
  //         RESET <Image src="/icons/undo.svg" alt="undo" width={20} height={20} />
  //       </Button>
  //     </div>
  //   </div>
  // )
};

export default RightDroppableV2;
