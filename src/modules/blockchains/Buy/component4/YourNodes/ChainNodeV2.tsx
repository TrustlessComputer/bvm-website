import React from 'react';

import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { ChainNode as ChainNodeProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import ChainRenderer from '../DappRenderer/ChainRenderer';
import Node from '../Node/Node';

const ChainNodeV2 = ({ data }: NodeProps<ChainNodeProps>) => {
  const { getBlockChainStatus } = useChainProvider();
  const {
    statusStr: statusMessage,
    statusColorStr: borderColor,
    borderStatusStr: headingBackground,
  } = getBlockChainStatus();

  return (
    <Node
      // overlay={{
      // }}
      heading={{
        title: data.title,
        status: {
          message: statusMessage,
          color: borderColor,
        },
        backgroundColor: headingBackground,
      }}
      // notification={{
      // }}
      content={{
        children: <ChainRenderer />,
      }}
      borderColor={borderColor}
    />
  );
};

export default React.memo(ChainNodeV2);
