interface IAirdrop {
  id?: number;
  address?: string;
  balance?: string;
  type?: number;
  claimed?: boolean;
  claimeable_at?: Date;
  vested_amount: string;
  claimed_amount: string;
  receiver_address: string;
}

export interface CommonState {
  airdrops: IAirdrop[];
}
