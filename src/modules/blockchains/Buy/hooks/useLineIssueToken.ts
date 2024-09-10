import React, { useEffect } from 'react';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import { useParams } from 'next/navigation';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { Edge, MarkerType } from '@xyflow/react';

function useLineIssueToken(): void {
  const { nodes, edges, setEdges } = useFlowStore()
  const params = useParams();
  const isUpdateFlow = React.useMemo(() => !!params.id, [params.id]);
  const {  aaInstalledData, } = useAAModule();

  function addLineIssueToken() {
    if(nodes.length === 0) return;
    const newEdges: Edge[] = [];
    const nodesWithoutRoot = nodes.filter(node => node.id !== 'blockchain');
    // @ts-ignore
    const tokenNodes =  nodesWithoutRoot.filter(node => node.data?.dapp?.key === 'token_generation');
    // @ts-ignore
    const dappNodes =  nodesWithoutRoot.filter(node => node.data?.dapp?.key !== "token_generation");


    dappNodes.forEach(node => {
      const dataNode = node.data;
      // @ts-ignore
      const tokenNameOfAirdrop = dataNode?.dapp?.baseBlock?.fields.find((item: any) => item.key == 'reward_token');
      // @ts-ignore
      const tokenNameOfYOLO = dataNode?.dapp?.baseBlock?.fields.find((item: any) => item.key == 'settlement_token');
      // @ts-ignore
      const statusNode = dataNode?.status;
      tokenNodes.forEach(issueTokenNode => {
        // @ts-ignore
        const tokenNameOfIssueToken = issueTokenNode.data?.dapp?.baseBlock?.fields.find((item: any) => item.key == 'token_symbol');

        // AA Node
        // @ts-ignore
        if(node.id === 'account_abstraction' && issueTokenNode.data?.dapp?.label?.actionID === aaInstalledData?.aaPaymasterTokenID) {
          dataNode.sourceHandles.push(`account_abstraction-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(`${issueTokenNode.id}-s-account_abstraction`)
          const issueTokenToAA: Edge = {
            id: `${Math.random()}`,
            source: issueTokenNode.id,
            target: node.id,
            sourceHandle: `${issueTokenNode.id}-s-account_abstraction`,
            targetHandle: `account_abstraction-t-${issueTokenNode.id}`,
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

        // Airdrop Node
        // @ts-ignore
        if(dataNode?.dapp?.id === 'airdrop' && tokenNameOfAirdrop?.options[0].key == tokenNameOfIssueToken?.value) {
          dataNode.sourceHandles.push(`airdrop-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(`${issueTokenNode.id}-s-airdrop`)
          const issueTokenToAirdrop: Edge = {
            id: `${Math.random()}`,
            source: issueTokenNode.id,
            target: node.id,
            sourceHandle: `${issueTokenNode.id}-s-airdrop`,
            targetHandle: `airdrop-t-${issueTokenNode.id}`,
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
          };
          newEdges.push(issueTokenToAirdrop);
        }

        // Staking Node
        // @ts-ignore
        if(dataNode?.dapp?.id === 'staking' && tokenNameOfAirdrop?.options[0].key == tokenNameOfIssueToken?.value  && checkStatusNode(statusNode)) {
          dataNode.sourceHandles.push(`staking-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(`${issueTokenNode.id}-s-staking`)
          const issueTokenToStaking: Edge = {
            id: `${Math.random()}`,
            source: issueTokenNode.id,
            target: node.id,
            sourceHandle: `${issueTokenNode.id}-s-staking`,
            targetHandle: `staking-t-${issueTokenNode.id}`,
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
          };
          newEdges.push(issueTokenToStaking);
        }

        // Yolo Node
        // @ts-ignore
        if(dataNode?.dapp?.id === 'yologame' && tokenNameOfYOLO?.options[0].key == tokenNameOfIssueToken?.value  && checkStatusNode(statusNode)) {
          dataNode.sourceHandles.push(`yologame-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(`${issueTokenNode.id}-s-yologame`)
          const issueTokenToYolo: Edge = {
            id: `${Math.random()}`,
            source: issueTokenNode.id,
            target: node.id,
            sourceHandle: `${issueTokenNode.id}-s-yologame`,
            targetHandle: `yologame-t-${issueTokenNode.id}`,
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
          };
          newEdges.push(issueTokenToYolo);
        }
      })

    })

    setEdges([...edges, ...newEdges]);

  }

  function checkStatusNode(status: string) {
    const statusConnect = ['Processing', 'Running', 'Deployed'];
    return statusConnect.some(statusApprove => statusApprove === status);
  }

  useEffect(() => {
    if (!isUpdateFlow) return;
    addLineIssueToken();
  }, [nodes.length]);

}


export default useLineIssueToken;
