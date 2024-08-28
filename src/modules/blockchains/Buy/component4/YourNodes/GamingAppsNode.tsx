import React from 'react';

import { ChainNodeAsDappNode, NodeNotificationProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import GamingAppsRenderer from '../DappRenderer/GamingAppsRenderer';
import Node from '../Node/Node';
import { useBridgesModule } from '@/modules/blockchains/detail_v4/hook/useBridgesModule';

const GamingAppsNode = ({ data }: NodeProps<ChainNodeAsDappNode>) => {
  const notification: NodeNotificationProps | undefined = React.useMemo(() => {
    return undefined;
  }, []);

  return (
    <Node
      {...data}
      key={JSON.stringify(data)}
      // borderColor={statusMapper?.borderColorStr}
      heading={{
        title: data.title,
        status: {
          message: 'Drafting Module',
          // color: statusMapper?.statusColorStr,
          // icon: getBridgeTypeIconUrl(),
        },
        // borderColor: statusMapper?.borderColorStr,
        // backgroundColor: statusMapper?.bgColorStr,
      }}
      notification={notification}
      content={{
        children: <GamingAppsRenderer />,
      }}
    />
  );
};

export default GamingAppsNode;
