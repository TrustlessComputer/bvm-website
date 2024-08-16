import React from 'react';

import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { ChainNode as ChainNodeProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import ChainRenderer from '../DappRenderer/ChainRenderer';
// import Node from '../Node/Node';
import Node from '../Node_v2/Node';
import { getModuleIconUrlByType } from '@/modules/blockchains/detail_v4/helper/moduleIconHelper';

const ChainNodeV2 = ({ data }: NodeProps<ChainNodeProps>) => {
  const { getBlockChainStatus, isChainLoading, isUpdateFlow } =
    useChainProvider();
  const {
    statusStr: statusMessage,
    statusColorStr: borderColor,
    borderStatusStr: headingBackground,
  } = getBlockChainStatus();

  return (
    <Node
      overlay={
        isChainLoading
          ? {
              type: 'loading',
              message: 'Please wait while chain is getting ready to work.',
            }
          : undefined
      }
      {...data}
      key={JSON.stringify(data)}
      heading={{
        title: data.title,
        status: {
          message: statusMessage,
          color: borderColor,
          // icon: getModuleIconUrlByType('Ready_To_Launch'),
        },
        backgroundColor: headingBackground,
      }}
      content={{
        children: <ChainRenderer />,
      }}
      borderColor={borderColor}
    />
  );
};

export default ChainNodeV2;
