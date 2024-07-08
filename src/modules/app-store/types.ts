interface IAppInfo {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  modes: IAppPackage[];
  num_installed: number;
}

interface IAppPackage {
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
