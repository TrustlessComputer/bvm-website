import { DappNode as DappNodeProps } from '@/types/node';
import { NodeProps } from '@xyflow/react';
import DappRenderer from '../DappRenderer';
import Node from '../Node/Node';

const StakingNode = ({ data }: NodeProps<DappNodeProps>) => {
  // TODO: @leon
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
      // notification={{
      // }}
      content={{
        children: <DappRenderer {...data} key={data.ids.toString()} />,
      }}
    />
  );
};

export default StakingNode;
