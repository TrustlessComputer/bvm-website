import { Wallet } from "ethers";

export interface IWallet extends Wallet {
  address: string;
  token: string;
}

interface LoginParams {
  privateKey: string;
}

interface ImportParams {
  privateKey: string;
  password?: string;
}

interface IWalletContext {
  loading: boolean;
  isNeedCreate: boolean;
  onCreateNew: () => void;
  onLogin: (_: LoginParams) => Promise<Wallet | undefined>;
}

export type { ImportParams, IWalletContext, LoginParams };
