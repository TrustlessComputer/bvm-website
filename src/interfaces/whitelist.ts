export interface SignatureStatus {
  id: string | number,
  address: string,
  num_txs: string,
  btc_fee: string,
  gas_point: string,
  status: "pending" | "unclaimed" | "done",
}
