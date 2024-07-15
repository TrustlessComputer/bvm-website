import { IRefundFee, IUserSignerWallet } from './interface';
import { API_NAKA_URL } from '@/config';
import { IUserReferralInfo } from '@/interfaces/referral';
import CApiClient from '@/services/apiClient';

class CReferralAPI {
  private api = new CApiClient().api;

  private prefix = (url: string) => `https://general.appstore.dev.bvm.network/api/user/${url}`;

  setReferralCode = async (params: {
    referral_code: string;
    // signature: string;
  }): Promise<any> => {
    try {
      const res = await this.api.put(this.prefix("update-referrer"), {
        ...params,
      });
      return res;
    } catch (error) {
      //
    }
  };

  public userFaucetBVM = async (): Promise<any> => {
    try {
      const response = await this.api.get(this.prefix(`faucet-bvm`));

      return response;
    } catch (error) {
      throw error;
    }
  };

  public getUserReferralInfo = async (params: {
    address?: string;
  }): Promise<IUserReferralInfo> => {
    const res: IUserReferralInfo = await this.api.get(
      this.prefix(`profile`),
      {
        params: { ...params, network: "rune" },
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
      this.prefix(`update-referral-code?network=rune&address=${address}`),
      params
    );
    return res;
  };

  // export const setReferralCode = async (address: string, params: {
  //   referral_code: string;
  //   signature: string;
  // }): Promise<any> => {
  //   const res: any = await apiClient.put(
  //     `/users/referrer?network=naka&address=${address}`,
  //     params,
  //   );
  //   return res;
  // };

  public getListReferred = async (): Promise<any> => {
    const res: any = await this.api.get(this.prefix(`referral/referee`));
    return res;
  };

  public getSignatureForClaim = async (): Promise<any> => {
    const res: any = await this.api.get(this.prefix(`referral/signature`));
    return res;
  };

  public getRefundFee = async (): Promise<IRefundFee[]> => {
    const res: any = await this.api.get(this.prefix(`get-refund-fee`), {
      params: {
        address: "",
      },
    });
    return res;
  };

  public claimRefundFee = async (): Promise<IRefundFee[]> => {
    const res: any = await this.api.post(
      this.prefix(`claim-refund-fee`),
      {},
      {
        params: {
          address: "",
        },
      }
    );
    return res;
  };
}

export default CReferralAPI;
