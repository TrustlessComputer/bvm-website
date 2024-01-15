export interface SignatureStatus {
  address: string,
  num_txs: string,
  btc_fee: string,
  gas_point: string,
  status: "pending" | "done"
}
