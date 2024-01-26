export interface SignatureStatus {
  id: string | number,
  address: string,
  num_txs: string,
  btc_fee: string,
  gas_point: string,
  blast_amount: string,
  blast_point: string,
  status: "pending" | "unclaimed" | "done",
  base_point: string,
  arb_point: string,
  base_amount: string,
  arb_amount: string,
  eigenlayer_point: string,
  eigenlayer_amount: string,
  polygon_point: string,
  polygon_amount: string,
  manta_amount: string;
  manta_point: string;
}
