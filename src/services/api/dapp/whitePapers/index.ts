import CDappApiClient from '@/services/api/dapp/dapp.client';
import { setWhitePapers } from '@/stores/states/dapp/reducer';
import { useAppDispatch } from '@/stores/hooks';
import { IYoloGame, IYoloGameParams } from '@/services/api/dapp/yolo/interface';

class CWhitePaperAPI {
  private api = new CDappApiClient().api;
  private dispatch = useAppDispatch();

  private getUrl = (url: string) => {
    return `/tokens/whitepaper/${url}`;
  };

  createWhitePaper = async (token_address: string, data: any): Promise<IYoloGame> => {
    return await this.api.post(this.getUrl(`${token_address}`), data);
  };

  getWhitePaperList = async (): Promise<IYoloGame[]> => {
    const data: any = await this.api.get(this.getUrl('list'), );
    this.dispatch(setWhitePapers(data));
    return data;
  };
}

export default CWhitePaperAPI;
