interface IModelOption {
  title: string;
  selectable: boolean;
  price: number;
  tooltip: string;
  key: string,
}

interface IModelCategory {
  title: string;
  key: string,
  required: boolean;
  options: [IModelOption];
}
