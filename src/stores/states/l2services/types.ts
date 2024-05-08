import { DALayerEnum } from '@/modules/blockchains/Buy/Buy.constanst';
import {
  HistoryStatus,
  HistoryType,
} from '@/modules/blockchains/components/BillingModal/History.types';

interface IVerifySignatureReq {
  signature: string;
  tcAddress: string;
}

interface IVerifySignatureResp {
  token: string;
  refreshToken: string;
  isVerified: boolean;
}

interface IVerifyTokenReq {
  tcAddress: string;
}

interface IVerifyTokenResp {
  isValid: boolean;
}

interface IGetNonceReq {
  tcAddress: string;
}

interface IGetNonceResp {
  nonce: string;
}

export enum OrderStatus {
  WaitingPayment,
  Processing, // 1: paid, waiting for setting up completed
  Started, // 2: set up done, layer2 has been started
  InsufficientBalance, // 3: need to pause the service, OFF batcher & proposer
  Resume, // 4: balance toped up, need to ON batcher & proposer
  Ended, // 5: end
  Rejected, // 6: admin rejected
  Canceled, // 7: user request cancel (if the status = WaitingPayment)
  Timeout, // 8: user timeout (if the status = WaitingPayment)
}

export enum EnvironmentsEnum {
  Testnet = 0,
  Mainnet = 1,
}

interface IPlugin {
  name: string;
  image: string;
  description: string;
  link: string;
}

interface OrderItemResp {
  createAt: string;
  orderId: string;
  tcAddress: string;
  serviceType: number;
  serviceFee: string;
  setupCost: string;
  instanceId: string;
  reward: string;
  isWithdrawableReward: boolean;
  domain: string;
  chainId: string;
  chainName: string;
  userName: string;
  description: string;
  finalizationPeriod: string;
  blockTime: string;
  isMainnet: boolean;
  evmVersion: string;
  minGasPrice: string;
  dataAvaibilityChain: DALayerEnum;
  monitorLink: string;
  needToTopupBalance: string;
  nextBillingAt: string;
  status: OrderStatus;
  l2BridgeContract: string;
  l2PortalContract: string;
  explorer: string;
  rpc: string;
  rollupCost: string;
  index: number;
  isConstant: boolean;
  plugins: IPlugin[];
  preMint?: number;
  preMintAddress?: string;
  PreMintAmount?: string;
  ticker?: string;
}

interface HistoryItemResp {
  created_at: string;
  id: string;
  orderId: string;
  tcAddress: string;
  type: HistoryType;
  status: HistoryStatus;
  amount: string;
  txProcess: string;
  note: string;
  instanceInfo: {
    domain: string;
    chainId: string;
    chainName: string;
    isMainnet: boolean;
  };
}

interface OrderItem extends OrderItemResp {
  rewardFormatted: string;
  setupCostFormatted: string;
  needToTopupBalanceFormatted: string;
  isNeedTopup: boolean;
  serviceFeeFormatted: string;
  rollupCostFormatted: string;
  isOwner: boolean;
}

interface AccountInfoResp {
  id: string;
  tcAddress: string;
  topUpWalletAddress: string;
  balance: string;
  withdrawableBalance: string;
  needToTopupBalance: string;
  email: string;
  emailVerified: boolean;
}

interface AccountInfo extends AccountInfoResp {
  balanceFormatted: string;
  withdrawableBalanceFormatted: string;
  isWithdrawable: boolean;
  needToTopupBalanceFormatted: string;
  isNeedTopup: boolean;
}

interface IOrderBuyReq {
  serviceType: number;
  domain: string;
  chainId: string;
  chainName: string;
  description: string;
  finalizationPeriod: number;
  blockTime: number;
  minGasPrice: string;
  dataAvaibilityChain: number;
  isMainnet: boolean;
  userName: string;
  pluginIds: number[];
  nativeTokenPayingGas: number;
  preMintAmount?: string;
  preMintAddress?: string;
  ticker?: string;
  gasLimit: number;
  twitter_id?: string | null;
  bitcoinValidity: number;
}

interface IOrderBuyEstimateRespone {
  SetupCode: string;
  OperationCost: string;
  RollupCost: string;
  TotalCost: string;
}

interface IWithdrawFundReq {
  amount: string;
}
export enum ListType {
  My,
  All,
}
export interface NetworkType {
  isMainnet: boolean;
  isTestnet: boolean;
}

export enum QuickStartTypeEnum {
  CREATE,
  FAUCET,
  ISSUE_TOKEN,
  CROWD_FUNDING,
  DAO,
  TWITTER,
  JOIN_DISCORD,
  COLLECT_REWARD,
}

interface IQuickStart {
  title: string;
  completed: boolean;
  type: QuickStartTypeEnum;
}

interface IVerifyEmail {
  token: string;
  email: string;
}

type ViewMode = 'Mainnet' | 'Testnet';

interface L2ServicesState {
  isFetching: boolean;
  isFetched: boolean;
  orderList: OrderItem[];
  isFetchingAllOrders: boolean;
  isFetchedAllOrders: boolean;
  allOrders: OrderItem[];
  orderSelected: OrderItem | undefined;

  historyList: HistoryItemResp[];

  viewMode: ViewMode;
  showOnlyMyOrder: boolean;

  accountInforL2Service: AccountInfo | undefined;
  isL2ServiceLogged: boolean;
}

export type {
  IVerifySignatureReq,
  IVerifySignatureResp,
  IVerifyTokenReq,
  IVerifyTokenResp,
  IGetNonceReq,
  IGetNonceResp,
  OrderItem,
  OrderItemResp,
  AccountInfoResp,
  AccountInfo,
  IOrderBuyReq,
  IWithdrawFundReq,
  HistoryItemResp,
  IQuickStart,
  IPlugin,
  IVerifyEmail,
  IOrderBuyEstimateRespone,
  L2ServicesState,
  ViewMode,
};
