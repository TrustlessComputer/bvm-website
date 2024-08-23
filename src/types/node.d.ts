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
  iconUrl?: string;
  message?: string;
};

type NodeViewAndAction = {
  type: typeof nodeOverlayType.ACTION;
  iconUrl?: string;
  message?: string;
  action: {
    label: string;
    textColor?: string;
    bgColor?: string;
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
  sourceHandles: string[];
  targetHandles: string[];
};

type BaseNodeData = {
  title: string;
  itemId?: string;
  positionId?: string;
  node: 'chain' | 'dapp' | 'template';
  statusMessage?: string;
  sourceHandles: string[];
  targetHandles: string[];
};

type DappNode = Node<
  {
    dapp: DappModel;
    ids: Field[];
    baseIndex: number;
    categoryOption: IModelOption;
  } & BaseNodeData
>;

type ChainNode = Node<{} & BaseNodeData>;
type ChainNodeAsDappNode = Node<{} & BaseNodeData>;
