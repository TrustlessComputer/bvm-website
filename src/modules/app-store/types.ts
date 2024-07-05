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
  description: string;
  price_usd: string;
  price_bvm: string;
  includes: IInclude[];
}

interface IInclude {
  title: string;
  is_include: boolean;
}
