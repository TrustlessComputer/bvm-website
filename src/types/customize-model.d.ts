import { Position } from '@xyflow/react';

export type DAppKeys =
  | 'blockchain' //hard code FE (only view's purpore)
  | 'create_token'
  | 'staking'
  | 'account_abstraction'
  | 'dex'
  | 'order_book'
  | 'perpetual'
  | 'btc_bridge'
  | 'eth_bridge';

interface IDappValue {
  key: string;
  value: string | number | { key: string; value: string | number }[];
}

interface IModelOption {
  title: string;
  selectable: boolean;
  updatable?: boolean;
  priceUSD: number;
  priceBVM: number;
  tooltip: string;
  key: string;
  icon: string;
  supportNetwork: 'both' | '' | 'testnet' | 'mainnet';
  supportLayer: '' | 'layer1' | 'layer2' | 'layer3' | 'both';
  supportLayers?: ('layer1' | 'layer2' | 'layer3')[];
  requiredFor: string[] | null;
  order: number;
  value: string | number | IDappValue[];
  needContactUs: boolean;
  keyDapp?: string;
  needConfig?: boolean;
  logo?: string;
  setupLogo?: string;

  valueStr?: string;
  type?: 'text' | 'number';
  disabled?: boolean;
  appTemplateUrl: string;
  needInstall?: boolean;
  inputValue?: string;
  addOnInputs?: {
    type: string;
    attrs: {
      name: string;
      value: string;
      default_value: string;
      placeholder: string;
      required: string;
      api_check_valid: string;
    };
  };
}

interface IModelCategory {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  color: string;
  key: string;
  type: '' | 'dropdown' | 'slide' | 'module' | 'input' | 'form';
  required: boolean;
  options: IModelOption[];
  disable: boolean;
  tooltip: string;
  order: number;
  confuseWord: boolean;
  confuseTitle: string;
  confuseIcon: string;
  multiChoice: boolean;

  hidden?: boolean;
  updatable?: boolean;
  whitelistAddress?: any;
  isChain: boolean;
}

interface ITemplate {
  chainInfos: ChainInfos;
  template: IModelCategory[];
}

interface ChainInfos {
  image: string;
  name: string;
  url: string;
}

interface DappField {
  key: string;
  title: string;
  type: 'input' | 'dropdown' | 'extends' | 'dynamic';
  options?: { key: string; value: string | number }[];
  dynamic?: {
    key: string;
    title: string;
    type: 'input' | 'dropdown' | 'extends';
    options?: { key: string; value: string | number }[];
    extends?: {
      key: string;
      title: string;
      type: 'input' | 'dropdown';
      options?: { key: string; value: string | number }[];
    }[];
  }[];
  extends?: {
    key: string;
    title: string;
    type: 'input' | 'dropdown';
    options?: { key: string; value: string | number }[];
  }[];
}

interface DappCategory {
  title: string;
  key: string;
  fields: DappField[];
}

interface SectionModel {
  key: string;
  icon: string;
  title: string;
  tooltip: string;
  required: boolean;
}

interface FieldModel {
  key: string;
  icon: string;
  title: string;
  value: string | number;
  type: 'input' | 'dropdown' | 'extends' | 'group' | 'datetime' | 'list' | '';
  tooltip: string;
  options: FieldModel[];
  placeholder?: string;
  level?: number;
  selectable?: boolean;
  background?: string;
  previewTitle?: string;
  inputType?: 'text' | 'number' | 'file';
  inputAccept?: 'image/*' | '.csv';
  disabled?: boolean;
}

interface BlockModel {
  key: string;
  title: string;
  icon: string;
  placableAmount: number;
  fields: FieldModel[];
  childrenFields?: FieldModel[];
  section: string;
  preview: boolean;
  background?: string;
  linkDownloadFile?: string;
}

interface DappModel {
  id: string;
  key: string;
  created_at: string;
  updated_at: string;
  title: string;
  icon: string;
  order: number;
  color: string;
  color_border?: string;
  label?: {
    title: string;
    background: string;
    color: string;
    status: string;
    actionID?: string;
  };
  color_rendered?: string;
  tooltip: string;
  baseBlock: BlockModel;
  blockFields?: BlockModel[];
  singleFields?: BlockModel[];
  moduleFields?: BlockModel[];
  baseModuleFields?: BlockModel[];
  sections: SectionModel[];
  action?: {
    title: string;
    actionMapperID: string;
    color?: string;
  };
  isDefaultDapp?: boolean;
}

interface TemplateForm {
  [key: string]: any;
  dappKey: string;
  fieldValue: Record<string, any>;
}

interface Connection {
  id: string;
  sourceHandle: string;
  targetHandle: string;
  target: string;
  label: string;
}

interface Dot {
  id: string;
  type: 'source' | 'target';
  position: Position;
}

interface BlockDiagram {
  id: string;
  dots: Dot[];
  connections: Connection[];
}

interface BlockchainMap {
  blockchain: OrderItem | null;
  dapps: DappModel[];
}

type ElkNodeStatus = 'Drafting' | 'Ready' | 'Missing' | 'Running' | 'Down';

type ElkNodeData = {
  label: string;
  positionDot: Position;
  handleType: HandleType;
  status: ElkNodeStatus;
  legoList: [];
  sourceHandles: { id: string }[];
  targetHandles: { id: string }[];
};

type ElkNode = Node<ElkNodeData, 'elk'>;
