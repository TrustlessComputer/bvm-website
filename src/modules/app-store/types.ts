interface IAppInfo {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  modes: IModeInstall[];
}

interface IModeInstall {
  id: number;
  title: string;
  price: string;
}
