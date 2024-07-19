export interface IUserSignerWallet {
  network?: string;
  address?: string;
  message?: string;
  signature?: string;
}

export interface IRefundFee {
  symbol: string;
  token_address: string;
  total_fee: number;
  refunded_fee: number;
  remain: number;
  refund_fee: number;
}
