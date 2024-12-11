import { API_BASE_URL } from '@/config';
import { DappType } from '@/modules/agent-studio/dapp/types';
import CDappApiClient from '@/services/api/dapp/dapp.client';
import CTokenGenerationAPI from '@/services/api/dapp/token_generation';
import { IAppInfo, IDappConfigs, IReqDapp } from '@/services/api/dapp/types';
import { templateMapper } from '@/services/api/dapp/utils';
import { OrderItem } from '@/stores/states/l2services/types';
import { capitalizeFirstLetter } from '@web3auth/ui';

class DappAPI {
  private L2_URL = `${API_BASE_URL}/api`;
  private http = new CDappApiClient().api;

  getChainByOrderID = async (params: {
    orderID: string;
  }): Promise<OrderItem | null> => {
    try {
      const chain = (await this.http.get(
        `${this.L2_URL}/order/detail/${params.orderID}`,
      )) as OrderItem;

      return chain;
    } catch (error) {
      console.log('[DappAPI] getChainByOrderID -> error :: ', error);
      return null;
    }
  };

  getDappURL = (chain: OrderItem): string => {
    try {
      const dapp =
        chain.dApps?.find((item) => item?.appURL || '')?.appURL || '';
      const url = new URL(dapp?.includes('https://') ? dapp : `https://${dapp}`)
        ?.origin;

      return url;
    } catch (error) {
      console.log('[DappAPI] getDappURL -> error :: ', error);
      return '';
    }
  };

  getDappConfig = async (params: {
    appName: string;
    network_id: string;
    address: string;
  }) => {
    try {
      const app = (await this.http.get(
        `/apps/detail-by-code/${params.appName}?network_id=${params.network_id}&address=${params.address}`,
      )) as any;

      return app?.fe_component;
    } catch (error) {
      console.log('[DappAPI] getDappConfig -> error :: ', error);
    }
  };

  getDappConfigs = async ({
    dappURL,
  }: {
    dappURL: string;
  }): Promise<IDappConfigs | null> => {
    try {
      let configs = (await this.http.get(`${dappURL}/api/configs`)) as any;

      configs = {
        ...configs,
        app_name: capitalizeFirstLetter(
          configs?.app_name || configs?.bvm_domain || '',
        ),
      };
      configs = {
        ...configs,
        template: templateMapper(configs),
      };

      return configs;
    } catch (error) {
      console.log('[DappAPI] getDappConfigs -> error :: ', error);
      return null;
    }
  };

  getAppInfoList = async ({
    dappURL,
  }: {
    dappURL: string;
  }): Promise<IAppInfo[]> => {
    try {
      const rs: any = await this.http.get(`${dappURL}/api/apps/menu`);
      return rs;
    } catch (error) {
      console.log('[DappAPI] getAppInfoList -> error :: ', error);
      return [];
    }
  };

  prepareDappParams = async (params: IReqDapp) => {
    try {
      const chain = await this.getChainByOrderID({ orderID: params.orderID });

      if (!chain) {
        return;
      }

      chain.dappURL = chain?.dappURL || this.getDappURL(chain);

      const _chain = chain;
      // if (isLocalhost()) {
      //   _chain.chainId = '91227';
      // }

      const tasks =
        ['create_token', DappType.staking, DappType.airdrop].map((app) =>
          this.getDappConfig({
            appName: app,
            network_id: chain.chainId,
            address: chain.tcAddress,
          }),
        ) || ([] as any[]);
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
      const [dappConfigs, appInfoList] = await Promise.all([
        await this.getDappConfigs({ dappURL: chain.dappURL }),
        await this.getAppInfoList({ dappURL: chain.dappURL }),
      ]);
    } catch (error) {
      console.log('[DappAPI] prepareDappParams -> error :: ', error);
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

      return vestings;
    } catch (error) {
      console.log('[DappAPI] getListToken -> error :: ', error);
      return [];
    }
  };

  // updateTemplate = async (template: ITemplate, network_id: string | number) => {
  //   await this.http.put(`/user/template/update`, {
  //     template: JSON.stringify(template),
  //     network_id: Number(network_id),
  //   });
  // };
}

export default DappAPI;
