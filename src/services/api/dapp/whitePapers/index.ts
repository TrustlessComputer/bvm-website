import CDappApiClient from '@/services/api/dapp/dapp.client';
import { setWhitePapers } from '@/stores/states/dapp/reducer';
import { useAppDispatch } from '@/stores/hooks';
import { IYoloGame, IYoloGameParams } from '@/services/api/dapp/yolo/interface';

class CWhitePaperAPI {
  private api = new CDappApiClient().api;
  private dispatch = useAppDispatch();

  private getUrl = (url: string) => {
    return `/yolo/${url}`;
  };

  createWhitePaper = async (data: IYoloGameParams): Promise<IYoloGame> => {
    return await this.api.post(this.getUrl('create'), data);
  };

  getWhitePaperList = async (network_id: string): Promise<IYoloGame[]> => {
    const data: any = await this.api.get(this.getUrl('pools'), {params: {network_id}});

    this.dispatch(setWhitePapers(data));
    return data;
  };
}

export default CWhitePaperAPI;
