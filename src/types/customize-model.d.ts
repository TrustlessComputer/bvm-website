interface IDappValue {
  key: string;
  value: string | number | { key: string; value: string | number }[];
}

interface IModelOption {
  title: string;
  selectable: boolean;
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
}

interface IModelCategory {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  color: string;
  key: string;
  type: '' | 'dropdown' | 'slide' | 'module' | 'input';
  required: boolean;
  options: IModelOption[];
  disable: boolean;
  tooltip: string;
  order: number;
  confuseWord: boolean;
  confuseTitle: string;
  confuseIcon: string;
  multiChoice: boolean;
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
  type: 'input' | 'dropdown' | 'extends' | 'group' | '';
  tooltip: string;
  options: FieldModel[];
  placeholder?: string;
  level?: number;
  selectable?: boolean;
}

interface BlockModel {
  key: string;
  title: string;
  icon: string;
  placableAmount: number;
  fields: FieldModel[];
  section: string;
  preview: boolean;

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
  color_rendered?:string;
  tooltip: string;
  baseBlock: BlockModel;
  blockFields?: BlockModel[];
  singleFields?: BlockModel[];
  moduleFields?: BlockModel[];
  sections: SectionModel[];
}

interface TemplateForm {
  dappKey: string;
  fieldValue: Record<string, any>;
}
