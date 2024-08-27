import { API_BASE_URL } from '@/config';
import { DappType } from '@/modules/blockchains/dapp/types';
import CDappApiClient from '@/services/api/dapp/dapp.client';

import { AppCode, IAppInfo, IDappConfigs, IReqDapp, ITemplate } from '@/services/api/dapp/types';
import { templateMapper } from '@/services/api/dapp/utils';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setAppInfos, setChain, setConfigs, setDappConfigs, setLoading } from '@/stores/states/dapp/reducer';
import { dappSelector } from '@/stores/states/dapp/selector';
import { OrderItem } from '@/stores/states/l2services/types';
import { capitalizeFirstLetter } from '@web3auth/ui';

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
      console.log(error);
    }
  };

  getDappConfigs = async ({
    dappURL,
  }: {
    dappURL: string;
  }): Promise<IDappConfigs | undefined> => {
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
      console.log(error);
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
      // throw error;
      return [];
    }
  };

  prepareDappParams = async (params: IReqDapp) => {
    this.dispatch(setLoading(true));

    try {
      const chain = await this.getChainByOrderID({ orderID: params.orderID });
      chain.dappURL = chain?.dappURL || (!!chain?.domain ? `https://${chain?.domain}.appstore.bvm.network` : '') || this.getDappURL(chain);

      const _chain = chain;
      // if (isLocalhost()) {
      //   _chain.chainId = '91227';
      // }

      this.dispatch(setChain({ ..._chain }));
      const tasks = [
          'create_token',
          DappType.staking,
          DappType.airdrop,
          DappType.yologame,
          DappType.orderbook,
        ].map((app) =>
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

      this.dispatch(setConfigs(configs));
      this.dispatch(setDappConfigs(dappConfigs));
      this.dispatch(setAppInfos(appInfoList));
    } catch (error) {
      console.log(error);
    } finally {
      this.dispatch(setLoading(false));
    }
  };

  updateTemplate = async (template: ITemplate, network_id: string | number) => {
    await this.http.put(`/user/template/update`, {
      template: JSON.stringify(template),
      network_id: Number(network_id),
    });
  };

  updatePosition = async (params: {
    app_code: AppCode;
    user_address: string;
    id: string | number;
    position_id: string;
    position_x: number;
    position_y: number;
  }) => {
    console.log('UPDATE POSITION', params);

    try {
      await this.http.post(`/apps/position/`, [{ ...params, chain_id: Number(this.dappState?.chain?.chainId || '0') }]);
    } catch (error) {
      console.log(error);
    }
  };
}

export default CDappAPI;
