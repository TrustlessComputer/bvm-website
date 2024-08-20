import React from 'react';

import { useChainStatus } from '@/modules/blockchains/detail_v4/hook/useChainStatus';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { OrderStatus } from '@/stores/states/l2services/types';
import { DappNode as DappNodeProps, NodeNotificationProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import DappRenderer from '../DappRenderer';
import Node from '../Node/Node';

const DappNode = ({ data }: NodeProps<DappNodeProps>) => {
  const { statusCode, statusStr } = useChainStatus();
  const { isUpdateFlow } = useChainProvider();

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
        message: 'Chain is not available at the moment.',
      };
    }

    return undefined;
  }, [isUpdateFlow, statusCode]);

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
      notification={notification}
      content={{
        children: <DappRenderer {...data} key={data.ids.toString()} />,
      }}
    />
  );
};

export default DappNode;
