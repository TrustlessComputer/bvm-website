/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import { SignatureStatus } from '@/interfaces/whitelist';
import CApiClient from '@/services/apiClient';
import { isProduction } from '@/utils/commons';
import queryString from 'query-string';
import {
  ILaunchpad,
  ILaunchpadClaimParams,
  ILaunchpadCreateBody,
  ILaunchpadFeeOption,
  IPagingParams,
  IPreLaunchpadTask,
  WalletTokenDeposit,
} from './launchpad.interfaces';
import {
  ILaunchpadBodyTask,
  ILaunchpadSetupTask,
} from './lauchpad.create.interface';

class CLaunchpadAPI {
  private apiClient = new CApiClient().api;
  private prefix = `/api/launchpad`;

  public getLaunchpadOptions = async (): Promise<ILaunchpadFeeOption[]> => {
    try {
      const rs: any = this.apiClient.get(`${this.prefix}/options`);
      return rs;
    } catch (error) {
      throw error;
    }
  };

  public createLaunchpad = async (
    body: ILaunchpadCreateBody,
  ): Promise<ILaunchpad> => {
    try {
      const rs: any = this.apiClient.post(`${this.prefix}/create`, body);
      return rs;
    } catch (error) {
      throw error;
    }
  };

  public getListLaunchpad = async (
    params: { status?: string } & IPagingParams,
  ): Promise<ILaunchpad[]> => {
    try {
      const qs = '?' + queryString.stringify(params);
      const res = (await this.apiClient.get(
        `${this.prefix}/list${qs}`,
      )) as ILaunchpad[];
      return res;
    } catch (error) {
      throw error;
    }
  };

  public getDetailLaunchpad = async (id: number): Promise<ILaunchpad> => {
    try {
      const res = (await this.apiClient.get(
        `${this.prefix}/detail/${id}`,
      )) as ILaunchpad;
      return res;
    } catch (error) {
      throw error;
    }
  };

  public getSummaryLaunchpad = async (id: number): Promise<any> => {
    try {
      const res = await this.apiClient.get(`${this.prefix}/summary/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  public getPrelaunchLeaderBoards = async (
    id: number,
    params: {
      page?: number;
      limit?: number;
    },
  ): Promise<any> => {
    const res: ILeaderBoardPoint[] = await this.apiClient.get(
      `${this.prefix}/prelaunch/leaderboards/${id}`,
      {
        params,
      },
    );

    return res;
  };

  public getTopLeaderBoards = async (
    id: number,
    params: {
      page?: number;
      limit?: number;
    },
  ): Promise<any> => {
    const res: ILeaderBoardPoint[] = await this.apiClient.get(
      `${this.prefix}/leaderboards/${id}`,
      {
        params,
      },
    );

    return res;
  };

  public getClaimedTickets = async (
    id: number,
    params: {
      page?: number;
      limit?: number;
    },
  ): Promise<any> => {
    const res: any = await this.apiClient.get(`${this.prefix}/tickets/${id}`, {
      params,
    });

    return res;
  };

  public getLaunchpadSummary = async (id: number): Promise<any> => {
    const res: ILeaderBoardPoint[] = await this.apiClient.get(
      `${this.prefix}/summary/${id}`,
    );

    return res;
  };

  public getLaunchpadEternalAiSummary = async (): Promise<any> => {
    const res: ILeaderBoardPoint[] = await this.apiClient.get(
      `https://api-dojo.eternalai.org/api/other/stats`,
    );

    return res;
  };

  public verifyBTCSignature = async (params: {
    address: string;
    message: string;
    signature: string;
    pubKey: string;
    launchpadId: number;
    network: string;
    type: string;
  }) => {
    const res = (await this.apiClient.post(`${this.prefix}/verify/`, {
      address: params.address,
      message: params.message,
      signature: params.signature,
      pub_key: params.pubKey,
      launchpad_id: params.launchpadId,
      network: params.network,
      type: params.type,
    })) as any;
    return res;
  };

  public getAllowBTCStatus = async (params: {
    launchpad_id: number;
    network: string;
    type: string;
  }): Promise<SignatureStatus[]> => {
    const res = (await this.apiClient.get(`${this.prefix}/verify/`, {
      params,
    })) as SignatureStatus[];
    return res;
  };

  public requestClaimBTCPoint = async (status: SignatureStatus[]) => {
    for (let i = 0; i < status.length; i++) {
      try {
        const item = status[i];
        if (item && item.status === 'unclaimed') {
          await this.apiClient.post(`${this.prefix}/verify/claim/${item.id}`);
        }
      } catch (error) {
        // TODO: handle error
      }
    }
  };

  public requestClaimBVM = async (
    body: ILaunchpadClaimParams,
    launchpad_id: number,
  ): Promise<ILaunchpad> => {
    try {
      const rs: any = this.apiClient.post(
        `${this.prefix}/claim-reward/${launchpad_id}`,
        body,
      );
      return rs;
    } catch (error) {
      throw error;
    }
  };

  public updateHashForStakeBVM = async (
    launchpad_id: number,
    tx_hash: string,
  ): Promise<ILaunchpad> => {
    try {
      const rs: any = this.apiClient.post(
        `${this.prefix}/scan-stake-hash/${launchpad_id}`,
        {},
        {
          params: {
            tx_hash,
          },
        },
      );
      return rs;
    } catch (error) {
      throw error;
    }
  };

  public getLaunchpadIDOAirdrop = async (id: number): Promise<any> => {
    try {
      const res = (await this.apiClient.get(
        `${this.prefix}/airdrop/${id}`,
      )) as any;
      return res;
    } catch (error) {
      throw error;
    }
  };

  public getLaunchpadEAIAirdrop = async (params: {
    twitter_username: string;
  }): Promise<any> => {
    const url = isProduction()
      ? `https://api-dojo.eternalai.org/api/other/get-airdrop-count`
      : `https://api-dojo.dev2.eternalai.org/api/other/get-airdrop-count`;
    const res = (await this.apiClient.get(url, {
      params,
    })) as any;
    return res;
  };

  public requestClaimFollow = async (
    launchpad_id: number,
    params?: any,
  ): Promise<any> => {
    try {
      const rs: any = this.apiClient.post(
        `${this.prefix}/verify/claim-follow/${launchpad_id}`,
        {},
        {
          params,
        },
      );
      return rs;
    } catch (error) {
      throw error;
    }
  };

  public verifyAirdropSignature = async (params: {
    address: string;
    message: string;
    signature: string;
    pubKey: string;
    launchpadId: number;
    network: string;
    type: string;
  }) => {
    const res = (await this.apiClient.post(`${this.prefix}/verify/airdrop`, {
      address: params.address,
      message: params.message,
      signature: params.signature,
      pub_key: params.pubKey,
      launchpad_id: params.launchpadId,
      network: params.network,
      type: params.type,
    })) as any;
    return res;
  };

  public getAirdropStatus = async (params: {
    launchpad_id: number;
    network: string;
    type: string;
  }): Promise<SignatureStatus[]> => {
    const res = (await this.apiClient.get(`${this.prefix}/verify/airdrop`, {
      params,
    })) as SignatureStatus[];
    return res;
  };

  public requestClaimAirdrop = async (status: SignatureStatus[]) => {
    for (let i = 0; i < status.length; i++) {
      try {
        const item = status[i];
        if (item && item.status === 'unclaimed') {
          await this.apiClient.post(
            `${this.prefix}/verify/airdrop/claim/${item.id}`,
          );
        }
      } catch (error) {
        // TODO: handle error
      }
    }
  };

  getPublicSaleWalletInfo = async (): Promise<WalletTokenDeposit[]> => {
    // const res = (await this.apiClient.get(
    //   `/api/eternal-ai/sale/wallet`,
    // )) as unknown as WalletTokenDeposit[];
    // return res;
    return [
      {
        address: '0x7156916594bca9933db68cf85c239f8b54560ec9',
        coin: 'ETH',
        network: ['ethereum', 'arbitrum', 'optimism', 'base', 'alpha'],
      },
      {
        address: '1K6KoYC69NnafWJ7YgtrpwJxBLiijWqwa6',
        coin: 'BTC',
        network: ['bitcoin'],
      },
      {
        address: '0x7156916594bca9933db68cf85c239f8b54560ec9',
        coin: 'USDT',
        network: ['ethereum'],
      },
      {
        address: '0x7156916594bca9933db68cf85c239f8b54560ec9',
        coin: 'USDC',
        network: ['ethereum'],
      },
      {
        address: '0x7156916594bca9933db68cf85c239f8b54560ec9',
        coin: 'OP',
        network: ['optimism'],
      },
      {
        address: '0x7156916594bca9933db68cf85c239f8b54560ec9',
        coin: 'ARB',
        network: ['arbitrum'],
      },
      {
        address:
          'bc1pfga8evq6zu2h8a5nhrewfwll4puf5z7cshkzx9g29kpqhkxhx6vqqzwtru',
        coin: 'ORDI',
        network: ['bitcoin'],
      },
      {
        address:
          'bc1pfga8evq6zu2h8a5nhrewfwll4puf5z7cshkzx9g29kpqhkxhx6vqqzwtru',
        coin: 'SATS',
        network: ['bitcoin'],
      },
    ];
  };

  public getPreLaunchpadTasks = async (): Promise<ILaunchpadSetupTask[]> => {
    try {
      const rs: ILaunchpadSetupTask[] = await this.apiClient.get(
        `${this.prefix}/prelaunch/list-task`,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };

  public postPreLaunchpadTasks = async (
    launchpad_id: number,
    tasks: ILaunchpadBodyTask[],
  ) => {
    try {
      const rs = await this.apiClient.post(
        `${this.prefix}/prelaunch/tasks/${launchpad_id}`,
        tasks,
      );
      return rs;
    } catch (error) {
      return [];
    }
  };

  public getPreLaunchpadTasksById = async (
    launchpad_id: number,
  ): Promise<IPreLaunchpadTask[]> => {
    try {
      const rs = await this.apiClient.get(
        `${this.prefix}/prelaunch/tasks/${launchpad_id}`,
      );
      return rs as unknown as IPreLaunchpadTask[];
    } catch (error) {
      return [];
    }
  };
}

export default CLaunchpadAPI;
