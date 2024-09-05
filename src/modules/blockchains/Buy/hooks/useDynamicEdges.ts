import { MarkerType, useStoreApi } from '@xyflow/react';
import useFlowStore, { AppNode } from '@/modules/blockchains/Buy/stores/useFlowStore';
import useNodeFlowControl from '@/modules/blockchains/Buy/hooks/useNodeFlowControl';
import handleStatusEdges from '@utils/helpers';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { needReactFlowRenderSignal } from '@/modules/blockchains/Buy/studio/ReactFlowRender';


function useDynamicEdges() {
  const store = useStoreApi();
  const { setEdges, setNodes, edges } = useFlowStore()
  const { nodeLookup } = store.getState();
  const nodes = Array.from(nodeLookup).map(([, node]) => node);
  const { lineAAStatus } = useAAModule();


  const getRootNode = ()  => {
    return nodes.find((node) => node.id === 'blockchain');
  };

  const removeRootNode = () => {
    return nodes.filter((node) => node.id !== 'blockchain');
  };

  const updateSrouceHandle = (node: AppNode, srouceID: string): void =>{
    const nodeFormat = nodes.filter(nodeOld => nodeOld.id !== node.id)
    const edgeFormat = edges.filter(edgeOld => edgeOld.target !== node.id || edgeOld.sourceHandle !== node.id)
    node.data.sourceHandles.push(srouceID);
    nodeFormat.push(node)
    if(node.id !== 'blockchain') {
      const rootNode = getRootNode();
      (rootNode?.data.targetHandles as string[])?.push(`blockchain-t-${node.id}`);
    }
    setEdges([
      {
        // id: `${edges.length + 1}`,
        id: `${Math.random()}`,
        source: node.id,
        sourceHandle: srouceID,
        // target: `${newNodeId}`,
        target: `blockchain`,
        targetHandle: `blockchain-t-${node.id}`,
        type: 'customEdge',
        selectable: false,
        selected: false,
        focusable: false,
        label: handleStatusEdges('', lineAAStatus, node.id)
          .icon,
        animated: handleStatusEdges('', lineAAStatus, node.id)
          .animate,
        markerStart: {
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
    setNodes(nodeFormat);
    needReactFlowRenderSignal.value = true;
  }


  const handleGetPositionNode = (node: AppNode) => {
    const getPositionRootNode = getRootNode()?.position;
    if (!getPositionRootNode) return;

    if (node.id === 'blockchain') {
      for (let i = 0; i < removeRootNode().length; i++) {
        const targetNode = removeRootNode()[i];
        if (targetNode.position.x > node.position.x) {
          // Node position right
          console.log('Node position right');
        } else {
          console.log('Node position left');
        }
      }

    } else {
      if (getPositionRootNode.x < node.position.x) {
        // Node position right
        console.log('Node position right');
      } else {
        updateSrouceHandle(node, `${node.id}-s-blockchain`);
        console.log('Node position left');
      }
    }
  };

  return {
    handleGetPositionNode,
  };
}


export default useDynamicEdges;
