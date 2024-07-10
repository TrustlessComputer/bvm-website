import { create, StateCreator } from 'zustand';
import { BuyBuilderSelectState } from '../Buy.types';
import { DALayerEnum, NetworkEnum } from '../Buy.constanst';

export const ORDER_FIELD = {
  CHAIN_NAME: 'chainName',
  NETWORK: 'network',
  DATA_AVAILABILITY_CHAIN: 'dataAvaibilityChain',
  GAS_LIMIT: 'gasLimit',
  WITHDRAW_PERIOD: 'withdrawPeriod',
} as const;

type ChainNameSlice = {
  chainName: BuyBuilderSelectState['chainName'];
  setChainName: (chainName: BuyBuilderSelectState['chainName']) => void;
};

type NetworkSlice = {
  network: BuyBuilderSelectState['network'];
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
  gasLimit: BuyBuilderSelectState['gasLimit'];
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

const chainNameSlice: StateCreator<ChainNameSlice> = (set) => ({
  chainName: '',
  setChainName: (chainName) => set({ chainName }),
});

const networkSlice: StateCreator<NetworkSlice> = (set) => ({
  network: NetworkEnum.Network_Mainnet,
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

type FormOrder = ChainNameSlice &
  NetworkSlice &
  DataAvailabilityChainSlice &
  GasLimitSlice &
  WithdrawPeriodSlice;

export const useOrderFormStore = create<FormOrder>((...set) => ({
  ...chainNameSlice(...set),
  ...networkSlice(...set),
  ...dataAvailabilityChainSlice(...set),
  ...gasLimitSlice(...set),
  ...withdrawPeriodSlice(...set),
}));
