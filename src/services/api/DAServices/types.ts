export const DA_CODES = {
  create_token: 'create_token',
  staking: 'staking',
  account_abstraction: 'account_abstraction',
  bridge: 'bridge',
  dex: 'dex',
  order_book: 'order_book',
  perpetual: 'perpetual',
};

export const DA_PACKAGES = {
  free: 'free',
  basic: 'basic',
  advance: 'advance',
};

export interface IDApp {
  id: number;
  name: string;
  code: keyof typeof DA_CODES;
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
  package: keyof typeof DA_PACKAGES;
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
