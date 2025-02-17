import create from 'zustand';
import { BridgeNetwork, BridgeToken } from '@/modules/Bridge/types';
import { ConfigTokens } from '@/modules/Bridge/constant';
import uniqBy from 'lodash.uniqby';

interface IProps {
  tokens: BridgeToken[];
  networks: BridgeNetwork[];
}

const useBridgeStore = create<IProps, any>((set, get) => ({
  tokens: ConfigTokens,
  networks: uniqBy(ConfigTokens.map((token) => token.network), 'name'),
}));

export default useBridgeStore;
