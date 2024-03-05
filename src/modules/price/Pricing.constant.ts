export const ParamsEstCostDABitcoinPolygon: IOrderBuyReq = {
  serviceType: 1,
  domain: '',
  chainId: String(1),
  chainName: '',
  description: '',
  finalizationPeriod: 7,
  blockTime: 10,
  minGasPrice: '1000000000',
  dataAvaibilityChain: 10, //10: DA_BTC_Polygon, 11: Only BTC
  isMainnet: true,
  userName: '',
  pluginIds: [30],
  nativeTokenPayingGas: 0,
  gasLimit: 30000000,
  bitcoinValidity: 0, //0: Bitcoin Ordinal, 1: Bitcoin Stamps
};

export const ParamsEstCostOnlyBitcoin: IOrderBuyReq = {
  serviceType: 1,
  domain: 'xxxx',
  chainId: String('12345'),
  chainName: 'xxxx',
  description: '',
  finalizationPeriod: 604800,
  blockTime: 10,
  minGasPrice: '1000000000',
  dataAvaibilityChain: 11,
  isMainnet: true,
  userName: '',
  pluginIds: [30],
  nativeTokenPayingGas: 0,
  gasLimit: 30000000,
  bitcoinValidity: 0, //0: Bitcoin Ordinal, 1: Bitcoin Stamps
};
