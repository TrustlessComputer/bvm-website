import { OrderItem } from '@/stores/states/l2services/types';
import { API_BASE_URL } from '@/config';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setChain, setConfigs, setLoading } from '@/stores/states/dapp/reducer';
import { IReqDapp } from '@/services/api/dapp/types';
import { dappSelector } from '@/stores/states/dapp/selector';
import CDappApiClient from '@/services/api/dapp/dapp.client';


class CDappAPI {
  private dappState = useAppSelector(dappSelector)
  private L2_URL = `${API_BASE_URL}/api`;

  private dispatch = useAppDispatch();
  private http = new CDappApiClient().api;

  getChainByOrderID = async (params: { orderID: string }): Promise<OrderItem> => {
    const chain = await this.http.get(`${this.L2_URL}/order/detail/${params.orderID}`) as OrderItem;
    return chain;
  };

  getDappConfig = async (params: { appName: string }) => {
    try {
      const app = await this.http.get(`/apps/detail-by-code/${params.appName}`) as any;
      return app?.fe_component
    } catch (error) {
      console.log(error);
    }
  }

  prepareDappParams = async (params: IReqDapp) => {
    this.dispatch(setLoading(true));

    try {
      const chain = await this.getChainByOrderID({ orderID: params.orderID });
      this.dispatch(setChain(chain));
      const tasks = (chain?.dApps?.map(app => this.getDappConfig({ appName: app.appCode })) || []) as any[]
      const configs = (await Promise.all(tasks))?.map(item => {
        try {
          const parsed = JSON.parse(item)
          return parsed
        } catch (error) {
          return undefined
        }
      }).filter(item => !!item);
      this.dispatch(setConfigs(configs))
    } catch (error) {
      console.log(error);
    } finally {
      this.dispatch(setLoading(false))
    }
  }
}

export default CDappAPI;
