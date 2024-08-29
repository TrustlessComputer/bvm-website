export interface IBlock {
  id: number;
  // token: INFTToken;
  token_id: number;
  description: string;
  meta_data: string;
  image_url: string;
  owner_address: string;
  contract_address: string;
  release_tx_hash: string;
  release_at: string;
  release_batch: string;
  active: boolean;
}
