interface IModelOption {
  title: string;
  selectable: boolean;
  price: number;
  tooltip: string;
  key: string;
}

interface IModelCategory {
  title: string;
  color: string;
  key: string;
  type: '' | 'dropdown' | 'slide' | 'module';
  required: boolean;
  options: [IModelOption];
  disabled: boolean
}
