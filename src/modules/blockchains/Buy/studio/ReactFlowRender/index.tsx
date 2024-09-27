import CustomEdge from '@/modules/blockchains/Buy/component4/CustomEdge';
import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import useHandleReloadNode from '@/modules/blockchains/Buy/hooks/useHandleReloadNode';
import useStoreFirstLoadTemplateBox from '@/modules/blockchains/Buy/stores/useFirstLoadTemplateBoxStore';
import { signal, useSignalEffect } from '@preact/signals-react';
import { ConnectionMode, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import DappTemplateNode from '../../component4/CustomNode/DappTemplateNode';
import AANode from '../../component4/YourNodes/AANode';
import BridgeNode from '../../component4/YourNodes/BridgeNode';
import ChainNodeV2 from '../../component4/YourNodes/ChainNodeV2';
import DappNode from '../../component4/YourNodes/DappNode';
import GamingAppsNode from '../../component4/YourNodes/GamingAppsNode';
import { nodeKey } from '../../component4/YourNodes/node.constants';
import { restoreLocal } from '../../signals/useDragSignal';
import useFlowStore from '../../stores/useFlowStore';
import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
import s from './styles.module.scss';
import useLineIssueToken from '@/modules/blockchains/Buy/hooks/useLineIssueToken';
import { isActingSignal } from '../../signals/useFlowStatus';

export const needReactFlowRenderSignal = signal(false);
const currentPositionSignal = signal({ x: 0, y: 0, zoom: 1 });

const ReactFlowRenderer = React.memo(() => {
  const { nodes, onNodesChange, edges, onEdgesChange } = useFlowStore();
  const { setRfInstance, onRestore, rfInstance, onSave, haveOldData } =
    useHandleReloadNode();
  const { isFirstLoadTemplateBox } = useStoreFirstLoadTemplateBox();
  const path = usePathname();
  const { categories } = useModelCategoriesStore();
  const searchParamm = useSearchParams();
  useLineIssueToken();

  const [currentPosition, setCurrentPosition] = useState(
    currentPositionSignal.value,
  );
  const [count, setCount] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  console.log('[ReactFlowRenderer] ', {
    nodes,
    edges,
  });

  useSignalEffect(() => {
    if (needReactFlowRenderSignal.value) {
      setCurrentPosition(currentPositionSignal.value);
      setCount(count + 1);
      needReactFlowRenderSignal.value = false;
    }
  });

  const handleActing = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    isActingSignal.value = true;

    timeoutRef.current = setTimeout(() => {
      isActingSignal.value = false;
    }, 300);
  };

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
          [nodeKey.GAMING_APPS_NODE]: GamingAppsNode,
        }}
        edgeTypes={{
          customEdge: CustomEdge,
        }}
        defaultViewport={currentPosition}
        deleteKeyCode={''}
        onViewportChange={(viewState) => {
          currentPositionSignal.value = viewState;
          handleActing();
        }}
        onEdgesChange={onEdgesChange}
        onNodesChange={(changes) => {
          onNodesChange(changes);
          handleActing();
        }}
        edgesFocusable={false}
        onInit={setRfInstance}
        zoomOnDoubleClick={false}
        connectionMode={ConnectionMode.Loose}
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
