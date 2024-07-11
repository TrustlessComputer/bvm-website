interface IModelOption {
  title: string;
  selectable: boolean;
  price: number;
  tooltip: string;
  key: string;
  icon?: string;
}

interface IModelCategory {
  title: string;
  color: string;
  key: string;
  type: '' | 'dropdown' | 'slide' | 'module';
  required: boolean;
  options: [IModelOption];
  disable: boolean;
  supportNetwork: 'both' | '' | 'testnet' | 'main';
  tooltip: string;
}
