import React from 'react';

import { ChainNodeAsDappNode, NodeNotificationProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import BridgeRenderer from '../DappRenderer/BridgeRenderer';
import Node from '../Node/Node';
import { useBridgesModule } from '@/modules/agent-studio/detail_v4/hook/useBridgesModule';

const BridgeNode = ({ data, id }: NodeProps<ChainNodeAsDappNode>) => {
  const { statusMapper, getBridgeTypeIconUrl } = useBridgesModule();

  const notification: NodeNotificationProps | undefined = React.useMemo(() => {
    return undefined;
  }, []);

  return (
    <Node
      {...data}
      key={JSON.stringify(data)}
      borderColor={statusMapper?.borderColorStr}
      heading={{
        title: data.title,
        status: {
          message: statusMapper?.statusStr,
          color: statusMapper?.statusColorStr,
          icon: getBridgeTypeIconUrl(),
        },
        borderColor: statusMapper?.borderColorStr,
        backgroundColor: statusMapper?.bgColorStr,
      }}
      notification={notification}
      content={{
        children: <BridgeRenderer />,
      }}
      id={id}
      mainContentStyles={{ padding: 0 }}
    />
  );
};

export default BridgeNode;
