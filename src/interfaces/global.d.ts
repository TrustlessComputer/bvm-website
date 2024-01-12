interface IUniSat {
  requestAccounts: () => Promise<string[]>;
  getAccounts: () => Promise<string[]>;
  getNetwork: () => Promise<'livenet' | 'testnet'>;
  getPublicKey: () => Promise<string>;
  signMessage: (_: string, __: string) => Promise<string>;
}

declare global {
  interface Window {
    unisat: IUniSat;
  }
}
