import React from 'react';

import { useChainStatus } from '@/modules/blockchains/detail_v4/hook/useChainStatus';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { useAppSelector } from '@/stores/hooks';
import { isInstalledIssueTokenSelector } from '@/stores/states/dapp/selector';
import { OrderStatus } from '@/stores/states/l2services/types';
import { DappNode as DappNodeProps, NodeNotificationProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import DappRenderer from '../DappRenderer';
import Node from '../Node/Node';

const DappNode = ({ data, id }: NodeProps<DappNodeProps>) => {
  const { statusCode, statusStr } = useChainStatus();
  const { isUpdateFlow } = useChainProvider();

  const isInstalledIssueToken = useAppSelector(isInstalledIssueTokenSelector);

  // console.log('LEON TEST', data);

  const notification: NodeNotificationProps | undefined = React.useMemo(() => {
    if (isUpdateFlow && statusCode !== OrderStatus.Started) {
      return {
        label: 'IMPORTANT',
        message: 'Please wait while chain is getting ready to work.',
      };
    }

    if (!isUpdateFlow) {
      return {
        label: 'IMPORTANT',
        message: 'This module needs to be configured and completed later after the chain is deployed and the payment is confirmed',
      };
    }

    if (
      isUpdateFlow &&
      !isInstalledIssueToken &&
      data?.node === 'dapp' &&
      data?.dapp?.key !== 'create_token'
    ) {
      return {
        label: 'IMPORTANT',
        message: 'Please install issue token module to use this feature.',
      };
    }

    return undefined;
  }, [
    isUpdateFlow,
    statusCode,
    isInstalledIssueToken,
    data?.node,
    data?.dapp?.key,
  ]);

  return (
    <Node
      // overlay={{
      // }}
      {...data}
      key={JSON.stringify(data)}
      heading={{
        title: data.title,
        status: {
          message: data.statusMessage ?? 'Drafting modules',
        },
      }}
      id={id}
      notification={notification}
      content={{
        children: <DappRenderer {...data} key={data.ids.toString()} />,
      }}
    />
  );
};

export default DappNode;
