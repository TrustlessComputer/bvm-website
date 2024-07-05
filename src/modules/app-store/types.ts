interface IAppInfo {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  modes: IModeInstall[];
  num_installed: number;
}

interface IModeInstall {
  id: number;
  title: string;
  price: string;
}
