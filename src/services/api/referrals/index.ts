import { DA_SERVICE_URL } from '@/config';
import { IUserReferralInfo } from '@/interfaces/referral';
import CApiClient from '@/services/apiClientV2';

class CReferralAPI {
  private api = new CApiClient().api;

  private prefix = (url: string) => `${DA_SERVICE_URL}/api/user/${url}`;

  setReferrerCode = async (params: {
    referral_code: string;
    address: string;
  }): Promise<any> => {
    try {
      const res = await this.api.post(this.prefix(`referral/?address=${params.address}`), {
        ...params,
      });
      return res;
    } catch (error) {
      //
    }
  };

  public getUserReferralInfo = async (params: {
    address?: string;
  }): Promise<IUserReferralInfo> => {
    const res: IUserReferralInfo = await this.api.get(
      this.prefix(`profile`),
      {
        params: { ...params },
      }
    );

    return res;
  };

  public checkExitReferralCode = async (params: {
    referral_code?: string;
  }): Promise<boolean> => {
    const res: boolean = await this.api.get(
      this.prefix(`validate-referral-code`),
      {
        params: { ...params },
      }
    );

    return res;
  };

  public createReferralCode = async (
    address: string,
    params: {
      referral_code: string;
      signature: string;
    }
  ): Promise<any> => {
    const res: any = await this.api.put(
      this.prefix(`update-referral-code?address=${address}`),
      params
    );
    return res;
  };

  public getListReferred = async (referral_code: string): Promise<any> => {
    const res: any = await this.api.get(this.prefix(`referral/referee?referral_code=${referral_code}`));
    return res;
  };

  public claimReferralReward = async (address: string): Promise<any> => {
    const res: any = await this.api.post(
      this.prefix(`referral/claim`),
      {receiver_address: address},
    );
    return res;
  };
}

export default CReferralAPI;
