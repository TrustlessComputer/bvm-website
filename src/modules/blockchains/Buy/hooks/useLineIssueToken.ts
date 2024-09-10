import React, { useEffect } from 'react';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import { useParams } from 'next/navigation';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { Edge, MarkerType } from '@xyflow/react';
import { needReactFlowRenderSignal } from '@/modules/blockchains/Buy/studio/ReactFlowRender';


function useLineIssueToken(): void {
  const { nodes, edges, setEdges } = useFlowStore()
  const params = useParams();
  const isUpdateFlow = React.useMemo(() => !!params.id, [params.id]);
  const {  aaInstalledData, } = useAAModule();

  function addLineIssueToken() {
    if(nodes.length === 0) return;
    const newEdges: Edge[] = [];
    // @ts-ignore
    const tokenNodes =  nodes.filter(node => node.type === 'dappTemplate');
    const dappNodes =  nodes.filter(node => node.type !== 'dappTemplate');

    for (let i = 0; i < tokenNodes.length; i++) {
      const dataNodeDapp = tokenNodes[i].data;
      for (let j = 0; j < dappNodes.length; j++) {
        console.log('dappNodes', dappNodes);
        // @ts-ignore
        if(dappNodes[j].id === 'account_abstraction' && dataNodeDapp?.dapp?.label?.actionID === aaInstalledData?.aaPaymasterTokenID) {
          tokenNodes[i].data.sourceHandles.push(`${tokenNodes[i].id}-s-account_abstraction`);
          dappNodes[j].data.sourceHandles.push(`account_abstraction-t-${tokenNodes[i].id}`)
          const issueTokenToAA: Edge = {
            id: `${Math.random()}`,
            source: tokenNodes[i].id,
            target: dappNodes[j].id,
            sourceHandle: `${tokenNodes[i].id}-s-account_abstraction`,
            targetHandle: `account_abstraction-t-${tokenNodes[i].id}`,
            label: '',
            animated: false,
            type: 'customEdge',
            selectable: false,
            selected: false,
            focusable: false,
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
          }
          newEdges.push(issueTokenToAA);
        }
        //   label: handleStatusEdges('', lineAAStatus, 'account_abstraction')
        //   .icon,
        //   animated: handleStatusEdges('', lineAAStatus, 'account_abstraction')
        //   .animate,
      }
    }

    setEdges([...edges, ...newEdges]);

    needReactFlowRenderSignal.value = true;
  }

  useEffect(() => {
    if (!isUpdateFlow) return;
    addLineIssueToken();
    needReactFlowRenderSignal.value = false;
  }, [nodes.length]);

}


export default useLineIssueToken;
