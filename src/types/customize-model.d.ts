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
  type?: 'text' | 'number';
}

interface IModelCategory {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  color: string;
  key: string;
  type: '' | 'dropdown' | 'slide' | 'module' | 'form';
  required: boolean;
  options: IModelOption[];
  disable: boolean;
  tooltip: string;
  order: number;
  confuseWord: boolean;
  confuseTitle: string;
  confuseIcon: string;
  multiChoice: boolean;
  hidden: boolean;
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
