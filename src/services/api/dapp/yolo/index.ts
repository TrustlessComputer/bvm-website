import CDappApiClient from '@/services/api/dapp/dapp.client';
import { setYoloGames } from '@/stores/states/dapp/reducer';
import { useAppDispatch } from '@/stores/hooks';
import { IYoloGame } from '@/services/api/dapp/yolo/interface';

class CYoloGameAPI {
  private api = new CDappApiClient().api;
  private dispatch = useAppDispatch();

  private getUrl = (url: string) => {
    return `/yolo/${url}`;
  };

  createYoloGame = async (data: any): Promise<IYoloGame> => {
    return await this.api.post(this.getUrl('create'), data);
  };

  getYoloGameList = async (network_id: string): Promise<IYoloGame[]> => {
    const data: any = await this.api.get(this.getUrl('pools'), {params: {network_id}});

    this.dispatch(setYoloGames(data));
    return data;
  };
}

export default CYoloGameAPI;
