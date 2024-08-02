import { Position } from '@xyflow/react';
import { StringKeyframeTrack } from 'three';

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
  type: 'input' | 'dropdown' | 'extends' | 'group' | 'datetime' | '';
  tooltip: string;
  options: FieldModel[];
  placeholder?: string;
  level?: number;
  selectable?: boolean;
  background?: string;
  previewTitle?: string;
  inputType?: 'text' | 'number' | 'file',
  inputAccept?: 'image/*' | '.csv'
  disabled?: boolean
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
}

interface TemplateForm {
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
