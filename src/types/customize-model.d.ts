interface IModelOption {
  title: string;
  selectable: boolean;
  price: number;
  tooltip: string;
  key: string;
  icon?: string;
  supportNetwork: 'both' | '' | 'testnet' | 'main';
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
}
