import React from 'react';

import { ChainNodeAsDappNode, NodeNotificationProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import GamingAppsRenderer from '../DappRenderer/GamingAppsRenderer';
import Node from '../Node/Node';
import { useGameModule } from '@/modules/blockchains/detail_v4/hook/useGameModule';

const GamingAppsNode = ({ data }: NodeProps<ChainNodeAsDappNode>) => {
  const { statusMapper, getGameTypeIconUrl } = useGameModule();

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
          icon: getGameTypeIconUrl(),
        },
        borderColor: statusMapper?.borderColorStr,
        backgroundColor: statusMapper?.bgColorStr,
      }}
      notification={notification}
      content={{
        children: <GamingAppsRenderer />,
      }}
    />
  );
};

export default GamingAppsNode;