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
  status: string;
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
  address: string; // User Address (TC address)
  network_id: string; //Install for Chain (Chain ID Ex: 12345)
  dAppID: number | string; // dAPP detail ID
  inputs?: { [key: string]: any }[]; // inputs optional
}
