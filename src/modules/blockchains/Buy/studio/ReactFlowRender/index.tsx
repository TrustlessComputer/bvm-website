import CustomEdge from '@/modules/blockchains/Buy/component4/CustomEdge';
import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import useHandleReloadNode from '@/modules/blockchains/Buy/hooks/useHandleReloadNode';
import MModal from '@/modules/blockchains/dapp/components/Modal';
import { signal, useSignalEffect } from '@preact/signals-react';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import DappTemplateNode from '../../component4/CustomNode/DappTemplateNode';
import AANode from '../../component4/YourNodes/AANode';
import BridgeNode from '../../component4/YourNodes/BridgeNode';
import ChainNodeV2 from '../../component4/YourNodes/ChainNodeV2';
import DappNode from '../../component4/YourNodes/DappNode';
import { nodeKey } from '../../component4/YourNodes/node.constants';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  restoreLocal,
} from '../../signals/useDragSignal';
import useFlowStore from '../../stores/useFlowStore';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import s from './styles.module.scss';
import useStoreFirstLoadTemplateBox from '@/modules/blockchains/Buy/stores/useFirstLoadTemplateBoxStore';
import { formDappSignal } from '@/modules/blockchains/Buy/signals/useFormDappsSignal';

export const needReactFlowRenderSignal = signal(false);
const currentPositionSignal = signal({ x: 0, y: 0, zoom: 1 });

const ReactFlowRenderer = React.memo(() => {
  const { nodes, onNodesChange, edges, onEdgesChange } = useFlowStore();
  const { setRfInstance, onRestore, rfInstance, onSave, haveOldData } =
    useHandleReloadNode();
  const [currentPosition, setCurrentPosition] = useState(
    currentPositionSignal.value,
  );
  const { isFirstLoadTemplateBox } = useStoreFirstLoadTemplateBox();
  const [count, setCount] = React.useState(0);
  const path = usePathname();
  const { categories } = useModelCategoriesStore();

  const [loaded, setLoaded] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // const confirmLoad = () => {
  //   onRestore();
  //   setShowModal(false);
  // };

  useSignalEffect(() => {
    if (needReactFlowRenderSignal.value) {
      setCurrentPosition(currentPositionSignal.value);
      setCount(count + 1);
      needReactFlowRenderSignal.value = false;
    }
  });

  console.log('[ReactFlowRenderer]', {
    nodes,
    draggedDappIndexesSignal: draggedDappIndexesSignal.value,
    draggedIds2DSignal: draggedIds2DSignal.value,
    formDappSignal: formDappSignal.value,
  });

  React.useEffect(() => {
    if (!isFirstLoadTemplateBox) return;
    if (loaded) return;

    if (categories && categories.length > 0) {
      if (haveOldData) {
        onRestore().then(() => {
          restoreLocal.value = true;
        });
      } else {
        restoreLocal.value = true;
      }
      setLoaded(true);
    }
  }, [haveOldData, categories, loaded, rfInstance, isFirstLoadTemplateBox]);

  return (
    <>
      <ReactFlow
        key={JSON.stringify(edges) + count}
        nodes={nodes}
        nodeTypes={{
          // V1
          [nodeKey.CUSTOM_BOX]: CustomNode,
          // [nodeKey.CHAIN_NODE]: ChainNode,
          [nodeKey.DAPP_TEMPLATE]: DappTemplateNode,

          // V2
          [nodeKey.DAPP_NODE]: DappNode,
          [nodeKey.CHAIN_NODE]: ChainNodeV2,
          [nodeKey.ACCOUNT_ABSTRACTION_NODE]: AANode,
          [nodeKey.BRIDGE_NODE]: BridgeNode,
        }}
        edgeTypes={{
          customEdge: CustomEdge,
        }}
        defaultViewport={currentPosition}
        deleteKeyCode={''}
        onViewportChange={(viewState) => {
          currentPositionSignal.value = viewState;
        }}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        edgesFocusable={false}
        onInit={setRfInstance}
        zoomOnDoubleClick={false}
        edges={edges}
        fitViewOptions={{ padding: 1 }}
        className={s.reactFlow}
        onNodeDragStop={() => {
          if (!isFirstLoadTemplateBox) return;
          if (path === '/studio') {
            onSave();
          }
        }}
      />

      {/*<MModal*/}
      {/*  title="Do you want to load the last saved flow?"*/}
      {/*  okText="Load"*/}
      {/*  closeText="Cancel"*/}
      {/*  show={showModal}*/}
      {/*  onHide={() => setShowModal(false)}*/}
      {/*  onOk={() => confirmLoad()}*/}
      {/*  className={s.modal}*/}
      {/*/>*/}
    </>
  );
});

export default ReactFlowRenderer;
