interface IAirdrop {
  id?: number;
  address?: string;
  balance?: string;
  type?: number;
  claimed?: boolean;
  claimeable_at?: Date;
}

export interface CommonState {
  airdrops: IAirdrop[];
}
