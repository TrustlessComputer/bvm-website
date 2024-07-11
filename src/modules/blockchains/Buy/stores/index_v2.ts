import { create, StateCreator } from 'zustand';
import { BuyBuilderSelectState } from '../Buy.types';
import { DALayerEnum, NetworkEnum } from '../Buy.constanst';

export const ORDER_FIELD = {
  CHAIN_NAME: 'chainName',
  NETWORK: 'network',
  DATA_AVAILABILITY_CHAIN: 'defi_app',
  GAS_LIMIT: 'block_gas_limit',
  WITHDRAW_PERIOD: 'withdrawal_time',
  HARDWARE: 'hardware',
  SETTLEMENT: 'settlement',
  COMPUTE: 'compute',
  STORAGE: 'storage',
  ZK_PROVER: 'zk_prover',
  DEGEN_APPS: 'degen_apps',
  GAMING_APPS: 'gaming_apps',
} as const;

type ChainNameSlice = {
  chainName: BuyBuilderSelectState['chainName'];
  setChainName: (chainName: BuyBuilderSelectState['chainName']) => void;
};

type NetworkSlice = {
  network: BuyBuilderSelectState['network'] | NetworkEnum;
  setNetwork: (network: BuyBuilderSelectState['network']) => void;

  isNetworkDragged: boolean;
  setNetworkDragged: (isNetworkDragged: boolean) => void;
};

type DataAvailabilityChainSlice = {
  dataAvaibilityChain: BuyBuilderSelectState['dataAvaibilityChain'];
  setDataAvaibilityChain: (
    dataAvaibilityChain: BuyBuilderSelectState['dataAvaibilityChain'],
  ) => void;

  isDataAvailabilityChainDragged: boolean;
  setDataAvailabilityChainDragged: (
    isDataAvailabilityChainDragged: boolean,
  ) => void;
};

type GasLimitSlice = {
  gasLimit: BuyBuilderSelectState['gasLimit'] | string;
  setGasLimit: (gasLimit: BuyBuilderSelectState['gasLimit']) => void;

  isGasLimitDragged: boolean;
  setGasLimitDragged: (isGasLimitDragged: boolean) => void;
};

type WithdrawPeriodSlice = {
  withdrawPeriod: BuyBuilderSelectState['withdrawPeriod'];
  setWithdrawPeriod: (
    withdrawPeriod: BuyBuilderSelectState['withdrawPeriod'],
  ) => void;

  isWithdrawPeriodDragged: boolean;
  setWithdrawPeriodDragged: (isWithdrawPeriodDragged: boolean) => void;
};

type HardwareSlice = {
  hardware: any;
  setHardware: (hardware: any) => void;

  isHardwareDragged: boolean;
  setHardwareDragged: (isHardwareDragged: boolean) => void;
};

type SettlementSlice = {
  settlement: any;
  setSettlement: (settlement: any) => void;

  isSettlementDragged: boolean;
  setSettlementDragged: (isSettlementDragged: boolean) => void;
};

type ComputeSlice = {
  compute: any;
  setCompute: (compute: any) => void;

  isComputeDragged: boolean;
  setComputeDragged: (isComputeDragged: boolean) => void;
};

type StorageSlice = {
  storage: any;
  setStorage: (storage: any) => void;

  isStorageDragged: boolean;
  setStorageDragged: (isStorageDragged: boolean) => void;
};

type ZkProverSlice = {
  zkProver: any;
  setZkProver: (zkProver: any) => void;

  isZkProverDragged: boolean;
  setZkProverDragged: (isZkProverDragged: boolean) => void;
};

type DegenAppsSlice = {
  degenApps: any;
  setDegenApps: (degenApps: any) => void;

  isDegenAppsDragged: boolean;
  setDegenAppsDragged: (isDegenAppsDragged: boolean) => void;
};

type GamingAppsSlice = {
  gamingApps: any;
  setGamingApps: (gamingApps: any) => void;

  isGamingAppsDragged: boolean;
  setGamingAppsDragged: (isGamingAppsDragged: boolean) => void;
};

const chainNameSlice: StateCreator<ChainNameSlice> = (set) => ({
  chainName: '',
  setChainName: (chainName) => set({ chainName }),
});

const networkSlice: StateCreator<NetworkSlice> = (set) => ({
  network: NetworkEnum.Network_Testnet,
  setNetwork: (network) => set({ network }),

  isNetworkDragged: false,
  setNetworkDragged: (isNetworkDragged) => set({ isNetworkDragged }),
});

const dataAvailabilityChainSlice: StateCreator<DataAvailabilityChainSlice> = (
  set,
) => ({
  dataAvaibilityChain: DALayerEnum.DALayer_PLG,
  setDataAvaibilityChain: (dataAvaibilityChain) => set({ dataAvaibilityChain }),

  isDataAvailabilityChainDragged: false,
  setDataAvailabilityChainDragged: (isDataAvailabilityChainDragged) =>
    set({ isDataAvailabilityChainDragged }),
});

const gasLimitSlice: StateCreator<GasLimitSlice> = (set) => ({
  gasLimit: '0',
  setGasLimit: (gasLimit) => set({ gasLimit }),

  isGasLimitDragged: false,
  setGasLimitDragged: (isGasLimitDragged) => set({ isGasLimitDragged }),
});

const withdrawPeriodSlice: StateCreator<WithdrawPeriodSlice> = (set) => ({
  withdrawPeriod: 1,
  setWithdrawPeriod: (withdrawPeriod) => set({ withdrawPeriod }),

  isWithdrawPeriodDragged: false,
  setWithdrawPeriodDragged: (isWithdrawPeriodDragged) =>
    set({ isWithdrawPeriodDragged }),
});

const hardwareSlice: StateCreator<HardwareSlice> = (set) => ({
  hardware: {},
  setHardware: (hardware) => set({ hardware }),

  isHardwareDragged: false,
  setHardwareDragged: (isHardwareDragged) => set({ isHardwareDragged }),
});

const settlementSlice: StateCreator<SettlementSlice> = (set) => ({
  settlement: {},
  setSettlement: (settlement) => set({ settlement }),

  isSettlementDragged: false,
  setSettlementDragged: (isSettlementDragged) => set({ isSettlementDragged }),
});

const computeSlice: StateCreator<ComputeSlice> = (set) => ({
  compute: {},
  setCompute: (compute) => set({ compute }),

  isComputeDragged: false,
  setComputeDragged: (isComputeDragged) => set({ isComputeDragged }),
});

const storageSlice: StateCreator<StorageSlice> = (set) => ({
  storage: {},
  setStorage: (storage) => set({ storage }),

  isStorageDragged: false,
  setStorageDragged: (isStorageDragged) => set({ isStorageDragged }),
});

const zkProverSlice: StateCreator<ZkProverSlice> = (set) => ({
  zkProver: {},
  setZkProver: (zkProver) => set({ zkProver }),

  isZkProverDragged: false,
  setZkProverDragged: (isZkProverDragged) => set({ isZkProverDragged }),
});

const degenAppsSlice: StateCreator<DegenAppsSlice> = (set) => ({
  degenApps: {},
  setDegenApps: (degenApps) => set({ degenApps }),

  isDegenAppsDragged: false,
  setDegenAppsDragged: (isDegenAppsDragged) => set({ isDegenAppsDragged }),
});

const gamingAppsSlice: StateCreator<GamingAppsSlice> = (set) => ({
  gamingApps: {},
  setGamingApps: (gamingApps) => set({ gamingApps }),

  isGamingAppsDragged: false,
  setGamingAppsDragged: (isGamingAppsDragged) => set({ isGamingAppsDragged }),
});

type FormOrder = ChainNameSlice &
  NetworkSlice &
  DataAvailabilityChainSlice &
  GasLimitSlice &
  WithdrawPeriodSlice &
  HardwareSlice &
  SettlementSlice &
  ComputeSlice &
  StorageSlice &
  ZkProverSlice &
  DegenAppsSlice &
  GamingAppsSlice;

export const useOrderFormStore = create<FormOrder>((...set) => ({
  ...chainNameSlice(...set),
  ...networkSlice(...set),
  ...dataAvailabilityChainSlice(...set),
  ...gasLimitSlice(...set),
  ...withdrawPeriodSlice(...set),
  ...hardwareSlice(...set),
  ...settlementSlice(...set),
  ...computeSlice(...set),
  ...storageSlice(...set),
  ...zkProverSlice(...set),
  ...degenAppsSlice(...set),
  ...gamingAppsSlice(...set),
}));
