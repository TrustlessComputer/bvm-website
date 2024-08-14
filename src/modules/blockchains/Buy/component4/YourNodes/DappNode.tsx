import React from 'react';

import { DappNode as DappNodeProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import DappRenderer from '../DappRenderer';
import Node from '../Node/Node';

const DappNode = ({ data }: NodeProps<DappNodeProps>) => {
  return (
    <Node
      heading={{
        title: data.title,
        status: {
          message: 'Running',
          onClick: () => {},
        },
      }}
      content={{
        children: <DappRenderer {...data} key={data.ids.toString()} />,
      }}
    />
  );
};

export default React.memo(DappNode);
