export interface IDApp {
  id: number;
  name: string;
  code: string;
  description: string;
  image_url: string;
  installed: number;
  details: IDAppDetails[];
  inputs: {
    [key: string]: any;
  }[];
  user_package: string;
}

export interface IDAppDetails {
  id: number;
  network_id: number;
  name: string;
  description: string;
  image_url: string;
  package: string;
  price_usd: string;
  price_bvm: string;
  includes: {
    name: string;
    valid: string;
  }[];
}

///

export interface InstallDAByParams {
  address: string;
  dAppID: number | string;
  inputs?: { [key: string]: any }[];
  networkId?: string;
}
