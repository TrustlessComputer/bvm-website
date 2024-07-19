import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import {
  DALayerEnum,
  RollupEnum,
} from '@/modules/blockchains/Buy/Buy.constanst';
import { IAvailableList } from '@/modules/blockchains/Buy/Buy.types';
import {
  HistoryStatus,
  HistoryType,
} from '@/modules/blockchains/components/BillingModal/History.types';
import { IDApp } from '@/services/api/DAServices/types';
import { IExploreItem } from '@/services/api/l2services/types';

export type DappInstalledStatus =
  | 'new'
  | 'done'
  | 'processing'
  | 'requested_cancel'
  | 'removed';
interface IDAppInstalled {
  orderID: string;
  userAddress: string;
  appID: number;
  appURL: string;
  appCode: string;
  appName: string;
  appDescription: string;
  appImageURL: string;
  status: string;
  statusJob: number;
  priceUsd: number;
  priceBvm: number;
  aaPaymasterTokenID: string;
  aaTokenGas: string;
  aaPaymasterContract: string;
}

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
  serviceType: RollupEnum;
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
  finalizationPeriod: string | number;
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
  bridgeStatus?: number;
  thumb?: string;
  needToTopupBalanceUSD?: string;
  package?: number;
  prover?: number;
  cpuCore?: number;
  memory?: number;
  storage?: number;
  gasLimit?: number;
  packagePrice?: number;
  packagePriceUSD?: number;
  logoURL?: string;

  //
  dApps?: IDAppInstalled[] | undefined;
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
  needToTopupBalanceUSD?: string;

  dApps?: IDAppInstalled[];
  selectedOptions?: IModelCategory[];
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
  balanceUSD: string;
  twitterUsername?: string;
  twitterID?: string;
}

interface AccountInfo extends AccountInfoResp {
  balanceFormatted: string;
  withdrawableBalanceFormatted: string;
  isWithdrawable: boolean;
  needToTopupBalanceFormatted: string;
  isNeedTopup: boolean;
  balanceUSDFormatted: string;
}

interface IOrderBuyReq {
  serviceType: RollupEnum;
  domain: string;
  chainId: string;
  chainName: string;
  description: string;
  finalizationPeriod: number;
  blockTime: number;
  minGasPrice: string;
  dataAvaibilityChain: number;
  isMainnet: boolean;
  userName?: string;
  pluginIds: number[];
  nativeTokenPayingGas: number;
  preMintAmount?: string;
  preMintAddress?: string;
  ticker?: string;
  gasLimit: number;
  twitter_id?: string | null;
  bitcoinValidity: number;
  email?: string;
  cpuCore?: number;
  memory?: number;
  storage?: number;
  package?: PRICING_PACKGE;
  rollupProtocol?: number;
  prover?: number;
  bridgeStatus?: number;
}

interface IOrderBuyReq_V3 {
  //Required
  domain: string;
  chainId: string;
  chainName: string;
  nodeConfigs: IModelCategory[];

  //Optionals
  serviceType?: RollupEnum;
  description?: string;
  finalizationPeriod?: number;
  blockTime?: number;
  minGasPrice?: string;
  dataAvaibilityChain?: number;
  isMainnet?: boolean;
  userName?: string;
  pluginIds?: number[];
  nativeTokenPayingGas?: number;
  preMintAmount?: string;
  preMintAddress?: string;
  ticker?: string;
  gasLimit?: number;
  twitter_id?: string | null;
  bitcoinValidity?: number;
  email?: string;
  cpuCore?: number;
  memory?: number;
  storage?: number;
  package?: PRICING_PACKGE;
  rollupProtocol?: number;
  prover?: number;
  bridgeStatus?: number;
}

interface IOrderUpdate {
  chainName: string;
  description: string;
  thumb?: string;
  logoURL?: string;
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
type ViewPage = 'Biiling' | 'ManageChains';
type MonitorViewPage = 'OP' | 'ZK';

interface L2ServicesState {
  //My Order List
  isMyOrderListFetching: boolean;
  isMyOrderListFetched: boolean;
  orderList: OrderItem[];

  isFetchingAllOrders: boolean;
  isFetchedAllOrders: boolean;
  allOrders: OrderItem[];

  isFetchingAllOrdersV2: boolean;
  isFetchedAllOrdersV2: boolean;
  allOrdersV2: OrderItem[];

  orderSelected: OrderItem | undefined;

  historyList: HistoryItemResp[];

  viewMode: ViewMode;
  showOnlyMyOrder: boolean;
  showAllChain: boolean;
  viewPage: ViewPage;
  monitorViewPage: MonitorViewPage;

  //Account Infor
  isAccountInforFetching: boolean;
  isAccountInforFetched: boolean;
  accountInforL2Service: AccountInfo | undefined;
  isL2ServiceLogged: boolean;

  availableListFetching: boolean;
  availableListFetched: boolean;
  availableList?: IAvailableList;

  // Install Dapps
  dAppSelected?: IDApp;

  // DA
  isDAListFetching: boolean;
  isDAListFetched: boolean;
  daList?: IDApp[];

  //Template
  isTempalteFetching: boolean;
  isTempalteFetched: boolean;
  templateList?: IExploreItem[];
}

type MetaConfig = {
  favIconUrl: string;
  tabTitle: string;
  tabDesc: string;
  thumbImgUrl: string;
};

type ThemeConfig = {
  mode?: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
};

type WebsiteConfig = {
  metaConfig: MetaConfig;
  themeConfig: ThemeConfig;
  networkName: string;
  orderId: string;
};

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
  ViewPage,
  MetaConfig,
  ThemeConfig,
  WebsiteConfig,
  IOrderUpdate,
  MonitorViewPage,
  IOrderBuyReq_V3,
  IDAppInstalled,
};
