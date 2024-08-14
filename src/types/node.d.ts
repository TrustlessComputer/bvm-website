import { Field } from '@/modules/blockchains/Buy/signals/useDragSignal';
import { Node } from '@xyflow/react';
import { DappModel } from './customize-model';

type NodeHeadingProps = {
  title: string;
  status?: {
    message: string;
    color?: string;
    icon?: string;
    onClick?: () => void;
  };
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
};

type NodeContentProps = {
  children?: React.ReactNode;
};

type NodeProps = {
  heading: NodeHeadingProps;
  content: NodeContentProps;
  borderColor?: string;
};

type BaseNodeData = {
  sourceHandles: string[];
  targetHandles: string[];
};

type DappNode = Node<
  {
    title: string;
    dapp: DappModel;
    ids: Field[];
    baseIndex: number;
    categoryOption: IModelOption;
  } & BaseNodeData
>;

type ChainNode = Node<{} & BaseNodeData>;
