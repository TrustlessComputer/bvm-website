export const INITIAL_BALANCE = {
  isLoaded: false,
  amount: '0',
  amountFormated: '0',
  amountBTC: '0',
  amountBTCFormatted: '0',
};

export interface IAssetsContext {
  balance: {
    isLoaded: boolean;
    amount: string;
    amountFormated: string;
    amountBTC: string;
    amountBTCFormatted: string;
  };
  isFetchedBalance: boolean;
}
