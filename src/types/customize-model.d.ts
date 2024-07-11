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
  type: '' | 'dropdown';
  required: boolean;
  options: [IModelOption];
}
