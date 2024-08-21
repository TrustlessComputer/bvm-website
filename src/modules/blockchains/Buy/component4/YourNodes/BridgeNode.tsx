import React from 'react';

import { ChainNodeAsDappNode, NodeNotificationProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import BridgeRenderer from '../DappRenderer/BridgeRenderer';
import Node from '../Node/Node';

const BridgeNode = ({ data }: NodeProps<ChainNodeAsDappNode>) => {
  console.log('BridgeNode render', data);

  const notification: NodeNotificationProps | undefined = React.useMemo(() => {
    return undefined;
  }, []);

  return (
    <Node
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
        children: <BridgeRenderer />,
      }}
    />
  );
};

export default BridgeNode;
