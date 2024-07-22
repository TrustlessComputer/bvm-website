import { OrderItem } from '@/stores/states/l2services/types';
import { API_BASE_URL } from '@/config';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setChain, setLoading } from '@/stores/states/dapp/reducer';
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

  prepareDappParams = async (params: IReqDapp) => {
    this.dispatch(setLoading(true))
    const chain = await this.getChainByOrderID({ orderID: params.orderID });
    this.dispatch(setChain(chain));
    this.dispatch(setLoading(false))
  }
}

export default CDappAPI;
