export const MIN_GAS_PRICE = 1; // 1 gweis
export const GAS_LITMIT = 1000000000; //
export const GAS_PRICE = 1000000000; //
export const MIN_GAS_LIMIT = 10000000; //
export const MAX_GAS_LIMIT = 30000000; //
export const STEP_GAS_LIMIT = 1000000; //

export const WITHDRAWAL_PERIOD = 7; // 7 days
export const WITHDRAWAL_PERIOD_BOOTSTRAP = 6; // 6 hours
export const WITHDRAWAL_PERIOD_DEFAULT = 6; // 6  hours

// ------------------------------------------------------------------------------------
export enum NetworkEnum {
  Network_Testnet = 1,
  Network_Mainnet = 2,
}

export const NetworkEnumMap = {
  [NetworkEnum.Network_Testnet]: 'Testnet',
  [NetworkEnum.Network_Mainnet]: 'Mainnet',
};

// ------------------------------------------------------------------------------------

export enum DALayerEnum {
  DALayer_UNKNOW = 0,
  DALayer_PLG = 10,
  DALayer_BTC = 11,
  DALayer_Goerli = 12,
  DALayer_Celestia = 13,
  DALayer_Eigen = 14,
  DALayer_NearDa = 15,
  DALayer_IPFS = 16,
  DALayer_ARWEAVE = 17,
  DALayer_AVAIL = 18,
  DALayer_JACKAL = 19,
  DALayer_SYSCOIN = 20,
  DALayer_FILECOIN = 21,
}

// export const DALayerEnumMap = {
//   [DALayerEnum.DALayer_UNKNOW]: 'Unknow',
//   [DALayerEnum.DALayer_PLG]: 'Bitcoin + Polygon',
//   [DALayerEnum.DALayer_BTC]: 'Bitcoin Only',
//   [DALayerEnum.DALayer_Goerli]: 'Bitcoin + Ethereum (Goerli)',
//   [DALayerEnum.DALayer_Celestia]: 'Bitcoin + Celestia',
//   [DALayerEnum.DALayer_Eigen]: 'Bitcoin + Eigen',
//   [DALayerEnum.DALayer_NearDa]: 'Near',

//   [DALayerEnum.DALayer_IPFS]: 'Bitcoin + IPFS',
//   [DALayerEnum.DALayer_ARWEAVE]: 'Bitcoin + Arweave',
//   [DALayerEnum.DALayer_AVAIL]: 'Bitcoin + Avail',
//   [DALayerEnum.DALayer_JACKAL]: 'Bitcoin + Jackal',

//   [DALayerEnum.DALayer_SYSCOIN]: 'Bitcoin + Syscoin',
//   [DALayerEnum.DALayer_FILECOIN]: 'Bitcoin + Filecoin"',
// };

export const DALayerEnumMap = {
  [DALayerEnum.DALayer_UNKNOW]: 'Unknow',
  [DALayerEnum.DALayer_PLG]: 'Polygon',
  [DALayerEnum.DALayer_BTC]: 'Bitcoin Only',
  [DALayerEnum.DALayer_Goerli]: 'Ethereum (Goerli)',
  [DALayerEnum.DALayer_Celestia]: 'Celestia',
  [DALayerEnum.DALayer_Eigen]: 'Eigen',
  [DALayerEnum.DALayer_NearDa]: 'Near',

  [DALayerEnum.DALayer_IPFS]: 'IPFS',
  [DALayerEnum.DALayer_ARWEAVE]: 'Arweave',
  [DALayerEnum.DALayer_AVAIL]: 'Avail',
  [DALayerEnum.DALayer_JACKAL]: 'Jackal',

  [DALayerEnum.DALayer_SYSCOIN]: 'Syscoin',
  [DALayerEnum.DALayer_FILECOIN]: 'Filecoin"',
};

// ------------------------------------------------------------------------------------

export enum RollupEnum {
  Rollup_OpStack_OLD = 1,
  Rollup_OpStack = 20,
  Rollup_ZK = 21,
}

export enum BitcoinValidityEnum {
  BitcoinValidity_Ordinals = 0,
  BitcoinValidity_Stamps = 1,
}

export const BitcoinValidityEnumMap = {
  [BitcoinValidityEnum.BitcoinValidity_Ordinals]: 'Bitcoin Oridinal',
  [BitcoinValidityEnum.BitcoinValidity_Stamps]: 'Bitcoin Stamps',
};

export const RollupEnumMap = {
  [RollupEnum.Rollup_OpStack_OLD]: 'Optimistic',
  [RollupEnum.Rollup_OpStack]: 'Optimistic',
  [RollupEnum.Rollup_ZK]: 'ZK',
};

// ------------------------------------------------------------------------------------

export enum IntervalChargeTimeEnum {
  IntervalChargeTime_Monthly = 1000,
  IntervalChargeTime_Daily = 1001,
}

export const IntervalChargeTimeEnumMap = {
  [IntervalChargeTimeEnum.IntervalChargeTime_Monthly]: 'BVM per month',
  [IntervalChargeTimeEnum.IntervalChargeTime_Daily]: 'BVM per day',
};

// ------------------------------------------------------------------------------------

export enum PluginEnum {
  Plugin_Bridge = 30,
  Plugin_Dex = 31,
  Plugin_NFTMarketplace = 32,
  Plugin_DAO = 33,
}

export const PluginEnumMap = {
  [PluginEnum.Plugin_Bridge]: 'Bridge',
  [PluginEnum.Plugin_Dex]: 'Exchange',
  [PluginEnum.Plugin_NFTMarketplace]: 'NFT Marketplace',
  [PluginEnum.Plugin_DAO]: 'DAO',
};

// ------------------------------------------------------------------------------------
export enum PluginTypeEnum {
  PluginType_Bridge = 40,
  PluginType_Exchange = 41,
  PluginType_Marketplace = 42,
  PluginType_DAO = 43,
}

export const PluginTypeEnumMap = {
  [PluginTypeEnum.PluginType_Bridge]: 'Bridge',
  [PluginTypeEnum.PluginType_Exchange]: 'Exchange',
  [PluginTypeEnum.PluginType_Marketplace]: 'NFT Marketplace',
  [PluginTypeEnum.PluginType_DAO]: 'DAO',
};

export enum Layer1Enum {
  Bitcoin = 2000,
  Ethereum = 2001,
}

export const Layer1EnumMap = {
  [Layer1Enum.Bitcoin]: 'Bitcoin',
  [Layer1Enum.Ethereum]: 'Ethereum',
};

//
//  Native token for paying transaction gas
//

export enum NativeTokenPayingGasEnum {
  NativeTokenPayingGas_BVM = 0, // Default
  NativeTokenPayingGas_PreMint = 1,
  NativeTokenPayingGas_BTC = 2, // NEW
}

export const NativeTokenPayingGasMap = {
  [NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM]: 'BVM',
  [NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint]: 'Customized',
  [NativeTokenPayingGasEnum.NativeTokenPayingGas_BTC]: 'BTC',
};

export enum FormFields {
  NETWORK = 'NETWORK',
  COMPUTER_NAME = 'COMPUTER_NAME',
  DESCRIPTION = 'DESCRIPTION',
  PROJECT_X = 'PROJECT_X',
  PROJECT_WEBSITE = 'PROJECT_WEBSITE',
  YOUR_X_ACC = 'YOUR_X_ACC',
  YOUR_TELEGRAM = 'YOUR_Telegram_ACC',
  MIN_GAS_PRICE = 'MIN_GAS_PRICE',
  BLOCK_GAS_LIMIT = 'BLOCK_GAS_LIMIT',
  TICKER = 'TICKER',
  TOTAL_SUPPLY = 'TOTAL_SUPPLY',
  RECEIVING_ADDRESS = 'RECEIVING_ADDRESS',
  PROVER = 'PROVER',
}

export const FormFieldsErrorMessage = {
  [FormFields.NETWORK]: 'Network is required.',
  [FormFields.COMPUTER_NAME]: 'Name is required.',
  [FormFields.PROJECT_WEBSITE]: 'Project website name is required.',
  [FormFields.DESCRIPTION]: 'Description is required.',
  [FormFields.PROJECT_X]: 'Project X account is required.',
  [FormFields.YOUR_X_ACC]: 'Your X handle is required.',
  [FormFields.MIN_GAS_PRICE]: 'Min gas price is required.',
  [FormFields.BLOCK_GAS_LIMIT]: 'Gas limit is required.',
  [FormFields.YOUR_TELEGRAM]: 'Your telegram is required.',
  [FormFields.TICKER]: 'Ticker is required.',
  [FormFields.TOTAL_SUPPLY]: 'Total supply is required.',
  [FormFields.RECEIVING_ADDRESS]: 'Receiving address is required.',
};

export enum BlockTimeEnum {
  BlockTime_1s = 1,
  BlockTime_2s = 2,
  BlockTime_5s = 5,
  BlockTime_10s = 10,
}

export const BlockTimeEnumMap = {
  [BlockTimeEnum.BlockTime_1s]: '1 seconds',
  [BlockTimeEnum.BlockTime_2s]: '2 seconds',
  [BlockTimeEnum.BlockTime_5s]: '5 seconds',
  [BlockTimeEnum.BlockTime_10s]: '10 seconds',
};

export enum ServiceTypeEnum {
  DEFAULT = 1,
}

export enum PriceType {
  FREE,
  ESSENTIALS,
  PROFESSIONAL,
  ENTERPRISE,
  HEAD,
}

export const PriceTypeList = [
  PriceType.FREE,
  PriceType.ESSENTIALS,
  PriceType.PROFESSIONAL,
  PriceType.ENTERPRISE,
];

export enum ConfigurationOptionEnum {
  Standard = 0,
  Advanced = 1,
}

export const ConfigurationOptionEnumMap = {
  [ConfigurationOptionEnum.Standard]: 'Standard',
  [ConfigurationOptionEnum.Advanced]: 'Advanced',
};

export const STANDARD_VALUES = {
  rollupProtocol: RollupEnum.Rollup_OpStack,
  bitcoinValidity: BitcoinValidityEnum.BitcoinValidity_Ordinals,
  dataAvailability: DALayerEnum.DALayer_Celestia,
  blockTime: BlockTimeEnum.BlockTime_10s,
  minGasPrice: MIN_GAS_PRICE,
  blockGasLimit: GAS_LITMIT,
  withdrawalPeriod: WITHDRAWAL_PERIOD,
  nativeTokenPayingGas: NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM,
};

export const ADVANCED_VALUES = {};

export enum ProverEnum {
  NO = 0,
  YES = 1,
}

export const ProverEnumMap = {
  [ProverEnum.NO]: 'No',
  [ProverEnum.YES]: 'Yes',
};

export const HardwareBootstrap = {
  cpuCore: 8,
  memory: 16,
  storage: 320,
};

export const HardwareGrowth = {
  cpuCore: 32,
  memory: 64,
  storage: 650,
};
