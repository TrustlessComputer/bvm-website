interface IModelOption {
  title: string;
  selectable: boolean;
  priceUSD: number;
  priceBVM: number;
  tooltip: string;
  key: string;
  icon: string;
  supportNetwork: 'both' | '' | 'testnet' | 'mainnet';
  confuseWord: boolean;
  multiChoice: boolean;
  order: number;
}

interface IModelCategory {
  title: string;
  color: string;
  key: string;
  type: '' | 'dropdown' | 'slide' | 'module';
  required: boolean;
  options: [IModelOption];
  disable: boolean;
  tooltip: string;
  order: number;
}
