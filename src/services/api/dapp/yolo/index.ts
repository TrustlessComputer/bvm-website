import CDappApiClient from '@/services/api/dapp/dapp.client';

class CYoloGameAPI {
  private api = new CDappApiClient().api;

  private getUrl = (url: string) => {
    return `/yolo/${url}`;
  };

  createYoloGame = async (data: any): Promise<any> => {
    return await this.api.post(this.getUrl('create'), data);
  };
}

export default CYoloGameAPI;
