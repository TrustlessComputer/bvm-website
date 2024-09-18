import CDappApiClient from '@/services/api/dapp/dapp.client';
import { setWhitePapers } from '@/stores/states/dapp/reducer';
import { useAppDispatch } from '@/stores/hooks';
import { IWhitePaper } from '@/services/api/dapp/whitePapers/interface';

class CWhitePaperAPI {
  private api = new CDappApiClient().api;
  private dispatch = useAppDispatch();

  private getUrl = (url: string) => {
    return `/tokens/whitepaper/${url}`;
  };

  createWhitePaper = async (token_address: string, data: any): Promise<IWhitePaper> => {
    return await this.api.post(this.getUrl(`${token_address}`), data);
  };

  getWhitePaperList = async (): Promise<IWhitePaper[]> => {
    const data: any = await this.api.get(this.getUrl('list'), );
    this.dispatch(setWhitePapers(data));
    return data;
  };

  reCreateWhitePaper = async (token_address: string): Promise<IWhitePaper> => {
    return await this.api.post(this.getUrl(`refresh/${token_address}`), {});
  };

  getWhitePaperDetail = async (id: string): Promise<IWhitePaper> => {
    const data: any = await this.api.get(this.getUrl(`detail/${id}`));
    return data;
  };
}

export default CWhitePaperAPI;
