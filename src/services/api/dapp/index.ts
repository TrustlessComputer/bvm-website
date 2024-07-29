import { OrderItem } from '@/stores/states/l2services/types';
import { API_BASE_URL } from '@/config';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  setChain,
  setConfigs,
  setLoading,
  setTokens,
} from '@/stores/states/dapp/reducer';
import { IReqDapp } from '@/services/api/dapp/types';
import { dappSelector } from '@/stores/states/dapp/selector';
import CDappApiClient from '@/services/api/dapp/dapp.client';
import CTokenGenerationAPI from '@/services/api/dapp/token_generation';

class CDappAPI {
  private dappState = useAppSelector(dappSelector);
  private L2_URL = `${API_BASE_URL}/api`;

  private dispatch = useAppDispatch();
  private http = new CDappApiClient().api;

  getChainByOrderID = async (params: {
    orderID: string;
  }): Promise<OrderItem> => {
    const chain = (await this.http.get(
      `${this.L2_URL}/order/detail/${params.orderID}`,
    )) as OrderItem;
    return chain;
  };

  getDappURL = (chain: OrderItem) => {
    try {
      const dapp =
        chain.dApps?.find((item) => item?.appURL || '')?.appURL || '';
      const url = new URL(dapp?.includes('https://') ? dapp : `https://${dapp}`)
        ?.origin;
      return url;
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  getDappConfig = async (params: { appName: string }) => {
    try {
      const app = (await this.http.get(
        `/apps/detail-by-code/${params.appName}`,
      )) as any;
      return app?.fe_component;
    } catch (error) {
      console.log(error);
    }
  };

  prepareDappParams = async (params: IReqDapp) => {
    this.dispatch(setLoading(true));

    try {
      const chain = await this.getChainByOrderID({ orderID: params.orderID });
      chain.dappURL = this.getDappURL(chain);

      this.dispatch(setChain({ ...chain, chainId: '91227' }));
      const tasks = (chain?.dApps?.map((app) =>
        this.getDappConfig({ appName: app.appCode }),
      ) || []) as any[];
      const configs = (await Promise.all(tasks))
        ?.map((item) => {
          try {
            const parsed = JSON.parse(item);
            return parsed;
          } catch (error) {
            return undefined;
          }
        })
        .filter((item) => !!item);
      this.dispatch(setConfigs(configs));
    } catch (error) {
      console.log(error);
    } finally {
      this.dispatch(setLoading(false));
    }
  };

  getListToken = async (network_id: string) => {
    try {
      const api = new CTokenGenerationAPI();
      const tokens = await api.tokenList(network_id);
      const tasks = tokens?.map((t) =>
        api.tokenVesting({
          token_address: t.contract_address as string,
          network_id: network_id,
        }),
      );
      const vestings = await Promise.all(tasks);

      const ts = tokens?.map((t, i) => ({ ...t, vestings: vestings[i] }));
      this.dispatch(setTokens(ts));
      return vestings;
    } catch (error) {
      console.log('error', error);
    } finally {
    }
  };
}

export default CDappAPI;
