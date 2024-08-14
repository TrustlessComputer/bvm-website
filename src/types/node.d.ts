import { nodeOverlayType } from '@/modules/blockchains/Buy/component4/YourNodes/node.constants';
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

type NodeNotificationProps = {
  label?: string;
  labelColor?: string;
  message: string;
};

type NodeOnlyViewProps = {
  type: typeof nodeOverlayType.LOADING;
};

type NodeViewAndAction = {
  type: typeof nodeOverlayType.ACTION;
  action: {
    label: string;
    onClick: () => void;
  };
};

type NodeOverlayProps = NodeOnlyViewProps | NodeViewAndAction;

type NodeProps = {
  heading: NodeHeadingProps;
  content: NodeContentProps;
  notification?: NodeNotificationProps;
  overlay?: NodeOverlayProps;
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

    statusMessage?: string;
  } & BaseNodeData
>;

type ChainNode = Node<{} & BaseNodeData>;
