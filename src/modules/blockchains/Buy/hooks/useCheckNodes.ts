import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import { DappNode } from '@/types/node';
import { MarkerType } from '@xyflow/react';
import { useEffect } from 'react';
import { removeItemAtIndex } from '../../dapp/utils';
import { dappKeyToNodeKey } from '../component4/YourNodes/node.constants';
import { bridgesAsADapp } from '../mockup_3';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import useFormChain from './useFormChain';

export default function useCheckNodes() {
  const { field } = useOrderFormStoreV3();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const { getCurrentFieldFromChain } = useFormChain();

  useEffect(() => {
    if (!getCurrentFieldFromChain('bridge_apps')) {
      const nodeIndex = nodes.findIndex((node) => node.id == 'bridge_apps');
      const dappIndex = draggedDappIndexesSignal.value.findIndex(
        (i) => i === 1,
      );

      if (nodeIndex != -1) {
        nodes.splice(nodeIndex, 1);
        setNodes(removeItemAtIndex(nodes, nodeIndex));

        removeItemAtIndex(draggedDappIndexesSignal.value, dappIndex);
        removeItemAtIndex(draggedIds2DSignal.value, dappIndex);
      }
    } else {
      const nodeIndex = nodes.findIndex((node) => node.id == 'bridge_apps');

      if (nodeIndex === -1) {
        const rootNode = 'blockchain';
        const thisDapp = bridgesAsADapp;
        let nodesData = nodes;
        const newNodeId = 'bridge_apps';
        const newNode: DappNode = {
          id: newNodeId,
          type: dappKeyToNodeKey(thisDapp.key),
          dragHandle: '.drag-handle-area',
          position: { x: 0, y: 0 },
          data: {
            node: 'dapp',
            title: thisDapp.title,
            dapp: thisDapp,
            baseIndex: -1,
            categoryOption: {},
            ids: [],
            targetHandles: [`bridge_apps-t-${rootNode}`],
            sourceHandles: [],
          },
        };

        setNodes([...nodesData, newNode]);
        setEdges([
          ...edges,
          {
            id: `${Math.random()}`,
            source: rootNode,
            sourceHandle: `${rootNode}-s-bridge_apps`,
            target: `bridge_apps`,
            targetHandle: `bridge_apps-t-${rootNode}`,
            type: 'customEdge',
            label: '',
            markerEnd: {
              type: MarkerType.Arrow,
              width: 25,
              height: 25,
              strokeWidth: 1,
              color: '#AAAAAA',
            },
            style: {
              stroke: '#AAAAAA',
              strokeWidth: 2,
            },
          },
        ]);
        needReactFlowRenderSignal.value = true;
      }
    }
  }, [field['bridge_apps']]);
}
