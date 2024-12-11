import React, { useEffect } from 'react';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import { useParams } from 'next/navigation';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { Edge, MarkerType } from '@xyflow/react';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import handleStatusEdges from '@utils/helpers';

function useLineIssueToken(): void {
  const { nodes, edges, setEdges } = useFlowStore();
  const params = useParams();
  const isUpdateFlow = React.useMemo(() => !!params.id, [params.id]);
  const { aaInstalledData } = useAAModule();
  const { getAAStatus } = useChainProvider();
  const { lineAAStatus } = useAAModule();
  function addLineIssueToken() {
    if (nodes.length === 0) return;
    const newEdges: Edge[] = [];
    const nodesWithoutRoot = nodes.filter((node) => node.id !== 'blockchain');
    // @ts-ignore
    const tokenNodes = nodesWithoutRoot.filter(
      (node) => node.data?.dapp?.key === 'token_generation',
    );
    // @ts-ignore
    const dappNodes = nodesWithoutRoot.filter(
      (node) => node.data?.dapp?.key !== 'token_generation',
    );

    dappNodes.forEach((node) => {
      const dataNode = node.data;
      // @ts-ignore
      const tokenNameOfAirdrop = dataNode?.dapp?.baseBlock?.fields.find(
        (item: any) => item.key == 'reward_token',
      );
      // @ts-ignore
      const tokenNameOfYOLO = dataNode?.dapp?.baseBlock?.fields.find(
        (item: any) => item.key == 'settlement_token',
      );
      // @ts-ignore
      const statusNode = dataNode?.status;
      tokenNodes.forEach((issueTokenNode) => {
        // @ts-ignore
        const tokenNameOfIssueToken =
          issueTokenNode.data?.dapp?.baseBlock?.fields.find(
            (item: any) => item.key == 'token_symbol',
          );

        // AA Node
        // @ts-ignore
        if (
          node.id === 'general_idea' &&
          issueTokenNode.data?.dapp?.label?.actionID ===
            aaInstalledData?.aaPaymasterTokenID
        ) {
          dataNode.sourceHandles.push(`general_idea-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(
            `${issueTokenNode.id}-s-general_idea`,
          );
          const issueTokenToAA: Edge = {
            id: `${Math.random()}`,
            source: issueTokenNode.id,
            target: node.id,
            sourceHandle: `${issueTokenNode.id}-s-general_idea`,
            targetHandle: `general_idea-t-${issueTokenNode.id}`,
            label: handleStatusEdges('', lineAAStatus, 'general_idea').icon,
            animated: handleStatusEdges('', lineAAStatus, 'general_idea')
              .animate,
            type: 'customEdge',
            selectable: false,
            selected: false,
            focusable: false,
            markerEnd: {
              type: MarkerType.Arrow,
              width: 20,
              height: 20,
              strokeWidth: 1,
              color: '#FA9984',
            },
            style: {
              stroke: '#FA9984',
              strokeWidth: 2,
            },
          };
          newEdges.push(issueTokenToAA);
        }

        // Airdrop Node
        // @ts-ignore
        if (
          dataNode?.dapp?.id === 'airdrop' &&
          tokenNameOfAirdrop?.options[0].key == tokenNameOfIssueToken?.value &&
          checkStatusNode(statusNode)
        ) {
          dataNode.sourceHandles.push(`airdrop-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(
            `${issueTokenNode.id}-s-airdrop`,
          );
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
              width: 20,
              height: 20,
              strokeWidth: 1,
              color: '#FA9984',
            },
            style: {
              stroke: '#FA9984',
              strokeWidth: 2,
            },
          };
          newEdges.push(issueTokenToAirdrop);
        }

        // Staking Node
        // @ts-ignore
        if (
          dataNode?.dapp?.id === 'staking' &&
          tokenNameOfAirdrop?.options[0].key == tokenNameOfIssueToken?.value &&
          checkStatusNode(statusNode)
        ) {
          dataNode.sourceHandles.push(`staking-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(
            `${issueTokenNode.id}-s-staking`,
          );
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
              width: 20,
              height: 20,
              strokeWidth: 1,
              color: '#FA9984',
            },
            style: {
              stroke: '#FA9984',
              strokeWidth: 2,
            },
          };
          newEdges.push(issueTokenToStaking);
        }

        // Yolo Node
        // @ts-ignore
        if (
          dataNode?.dapp?.id === 'yologame' &&
          tokenNameOfYOLO?.options[0].key == tokenNameOfIssueToken?.value &&
          checkStatusNode(statusNode)
        ) {
          dataNode.sourceHandles.push(`yologame-t-${issueTokenNode.id}`);
          issueTokenNode.data.sourceHandles.push(
            `${issueTokenNode.id}-s-yologame`,
          );
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
              width: 20,
              height: 20,
              strokeWidth: 1,
              color: '#FA9984',
            },
            style: {
              stroke: '#FA9984',
              strokeWidth: 2,
            },
          };
          newEdges.push(issueTokenToYolo);
        }
      });
    });

    setEdges([...edges, ...newEdges]);
  }

  function checkStatusNode(status: string) {
    const statusConnect = ['Processing', 'Running', 'Deployed'];
    return statusConnect.some((statusApprove) => statusApprove === status);
  }

  useEffect(() => {
    if (!isUpdateFlow) return;
    addLineIssueToken();
  }, [nodes.length]);
}

export default useLineIssueToken;
