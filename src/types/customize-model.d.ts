interface IDappValue {
  key: string,
  value: string | string[]
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
  value: string | number;
  needContactUs: boolean;
}

interface IModelCategory {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  color: string;
  key: string;
  type: '' | 'dropdown' | 'slide' | 'module';
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
  key: string,
  title: string,
  type: 'input' | 'dropdown' | 'extends' | 'dynamic',
  options?: { key: string, value: string | number }[],
  dynamic?: {
    key: string,
    title: string,
    type: 'input' | 'dropdown' | 'extends',
    options?: { key: string, value: string | number }[],
    extends?: {
      key: string,
      title: string,
      type: 'input' | 'dropdown',
      options?: { key: string, value: string | number }[],
    }[]
  }[],
  extends?: {
    key: string,
    title: string,
    type: 'input' | 'dropdown',
    options?: { key: string, value: string | number }[],
  }[]
}

interface DappCategory {
  title: string,
  key: string,
  fields: DappField[]
}
