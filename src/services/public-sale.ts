import {
  IGenerateTOkenWithSecretCode,
  IPublicSaleDepositInfo,
  PublicSaleWalletInfo,
  PublicSaleWalletTokenDeposit,
} from '@/interfaces/vc';
import createAxiosInstance from '@/services/http-client';
import { PERP_API_URL } from '@/config';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import axios from 'axios';
import { camelCaseKeys } from '@/utils/normalize';
import {
  AlphaRunReport,
  ModularReport,
  NakaVolumeReport,
  NumberReport,
} from '@/stores/states/activities/types';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

const apiReport = createAxiosInstance({
  baseURL: '',
});

export const getPublicsaleWalletInfo = async (): Promise<
  PublicSaleWalletTokenDeposit[]
> => {
  const res = (await apiClient.get(
    `/bvm/sale/wallet`,
  )) as unknown as PublicSaleWalletTokenDeposit[];
  return res;
};

export const postPublicsaleWalletInfo =
  async (): Promise<PublicSaleWalletInfo> => {
    const res = (await apiClient.post(
      `/bvm/sale/wallet`,
    )) as unknown as PublicSaleWalletInfo;
    return res;
  };

export const postPublicsaleWalletInfoManualCheck =
  async (): Promise<PublicSaleWalletInfo> => {
    const res = (await apiClient.post(
      `/bvm/sale/manual-check`,
    )) as unknown as PublicSaleWalletInfo;
    return res;
  };

export const generateTOkenWithSecretCode = async (
  secret_code: string,
  _recaptcha: string,
): Promise<IGenerateTOkenWithSecretCode> => {
  const res = (await apiClient.post(
    `/bvm/generate-token-with-secret-code`,
    { secret_code },
    {
      headers: {
        // recaptcha,
        'user-data': JSON.stringify({
          screen: window?.location?.pathname,
          timezone: new Date().toString(),
        }),
      },
    },
  )) as unknown as IGenerateTOkenWithSecretCode;
  return res;
};

export const generateTokenWithOauth = async (
  uuid: string,
): Promise<IGenerateTOkenWithSecretCode> => {
  const res = (await apiClient.post(`/bvm/generate-token-with-oauth`, {
    token: uuid,
  })) as unknown as IGenerateTOkenWithSecretCode;
  return res;
};

export const generateTokenWithMetamask = async (params: {
  address: string;
  message: string;
  signature: string;
}): Promise<IGenerateTOkenWithSecretCode> => {
  const res = (await apiClient.post(`/bvm/generate-token-with-wallet`, {
    wallet_type: 'ethereum',
    address: params.address,
    message: params.message,
    signature: params.signature,
  })) as unknown as IGenerateTOkenWithSecretCode;
  return res;
};

export const generateTokenWithWalletBTC = async (params: {
  address: string;
  message: string;
  signature: string;
  pub_key: string;
}): Promise<IGenerateTOkenWithSecretCode> => {
  const res = (await apiClient.post(`/bvm/generate-token-with-wallet`, {
    wallet_type: 'bitcoin',
    address: params.address,
    message: params.message,
    signature: params.signature,
    pub_key: params.pub_key,
  })) as unknown as IGenerateTOkenWithSecretCode;
  return res;
};

export const getPublicSaleLeaderBoards = async (params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<any> => {
  const res = await apiClient.get(`/bvm/sale/leaderboards`, { params });
  return res;
};

export const getPublicSaleTop = async (params: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  const res = await apiClient.get(`/bvm/sale/top`, { params });
  return { data: res };
};

export const getPublicSaleSummary =
  async (): Promise<IPublicSaleDepositInfo> => {
    const res = (await apiClient.get(
      `/bvm/sale/summary`,
    )) as unknown as IPublicSaleDepositInfo;
    return res;
  };

export const getPublicSaleContributionLatest = async (): Promise<
  ILeaderBoardPoint[]
> => {
  const res = (await apiClient.get(
    `/bvm/sale/latest`,
  )) as unknown as ILeaderBoardPoint[];
  return res;
};

export const saleManualCheck = async (recaptcha: string): Promise<any> => {
  const res = (await apiClient.post(
    `/bvm/sale/manual-check`,
    {},
    {
      headers: {
        recaptcha,
        'user-data': JSON.stringify({
          screen: window?.location?.pathname,
          timezone: new Date().toString(),
        }),
      },
    },
  )) as unknown as any;
  return res;
};

export const getLocation = async (): Promise<any> => {
  const res = (await axios.get(
    `https://api.bvm.network/api/ip-country`,
  )) as unknown as any;
  return res;
};

export interface IPublicSalePrograme {
  id: number;
  title: string;
  description: string;
  button_name: string;
  link: string;
  image: string;
  reward: string;
  start_date: string;
  end_date: string;
  sub_title: string;
}

export const getPublicSaleProgram = async (): Promise<IPublicSalePrograme> => {
  const res = (await apiClient.get(
    `/bvm/sale-raffle/programes`,
  )) as unknown as IPublicSalePrograme;
  return res;
};

export const getRaffleJoinProgame = async (id: number): Promise<any> => {
  try {
    const res = await apiClient.get(`/bvm/sale-raffle/join?program_id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const joinRafflePrograme = async (id: number): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/sale-raffle/join?program_id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export interface IPublicSaleDailyReward {
  id: number;
  twitter_id: string;
  twitter_username: string;
  twitter_name: string;
  twitter_avatar: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
  day7: string;
  claimed: string;
  total: string;
  pending: string;
}

export const getPublicSaleDailyReward =
  async (): Promise<IPublicSaleDailyReward | null> => {
    try {
      const res = (await apiClient.get(
        `/bvm/user/halving`,
      )) as unknown as IPublicSaleDailyReward;
      return res;
    } catch (error) {
      console.log(error);
    }

    return null;
  };

export const claimPublicSaleDailyReward = async (): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/user/halving`);
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getBlockReward = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`/bvm/user/halving`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const claimRewardDailyWithPost = async (
  uuid: string,
  link?: string,
): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/user/halving/claim`, {
      secret_code: uuid,
      link: link,
    });
    return Object(camelCaseKeys(res));
  } catch (error) {
    throw error;
    // console.log(error);
  }
  return;
};

export const requestRewardDailyShareCode = async (): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/user/halving/request-code`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return;
};

export interface IPublicSaleLuckyMoney {
  id: number;
  created_at: string;
  bvm_amount: string;
  share_code: string;
  is_claimed?: boolean;
}

export const getPublicSaleLuckyMoney = async (): Promise<
  IPublicSaleLuckyMoney[]
> => {
  try {
    const res = (await apiClient.get(
      `/bvm/lucky/current`,
    )) as unknown as IPublicSaleLuckyMoney[];
    return res;
  } catch (error) {
    console.log(error);
  }

  return [];
};

export const claimPublicSaleLuckyMoney = async (id: number): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/lucky/claim/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getActivitiesReport = async (): Promise<
  NumberReport | undefined
> => {
  try {
    const [modular, alphaRun, nakaVolume, gameReport] =
      (await Promise.allSettled([
        apiReport.get(
          'https://generative.xyz/generative/api/modular-workshop/statistic',
        ),
        apiReport.get(
          'https://stag-perp-api.fprotocol.io/api/run-together/statistics',
        ),
        apiReport.get('https://api.bvm.network/api/future/report'),
        apiReport.get('https://game-state.bitcoinarcade.xyz/api/network-stats'),
      ])) as any[];

    return {
      modular: modular?.value,
      alphaRun: alphaRun?.value,
      nakaVolume: nakaVolume?.value,
      gameReport: gameReport?.value,
    };
  } catch (error) {
    return undefined;
  }
};

export type LuckyMoneyWinner = {
  bvm_amount: number;
  created_at: string;
  id: number;
  share_code: string;
  updated_at: string;
  user: {
    alpha_point: number;
    arb_balance: string;
    arb_point: number;
    arbeth_balance: number;
    base_point: number;
    baseeth_balance: string;
    blast_point: number;
    boost: string;
    btc_balance: string;
    bvm_balance: string;
    bvm_balance_not_boost: string;
    bvm_percent: string;
    bvm_point: number;
    celestia_point: number;
    coin_balances: null;
    content_point: number;
    deposit_id: number;
    deposited_at: string;
    eco_point: number;
    eigenlayer_point: number;
    eth_balance: string;
    game_point: number;
    gas_point: number;
    gmx_point: number;
    id: number;
    manta_point: number;
    naka_point: number;
    need_active: false;
    network: string;
    num_like: number;
    num_post: number;
    num_quote: number;
    num_retweet: number;
    num_view: number;
    op_balance: string;
    opeth_balance: string;
    optimism_point: number;
    ordi_balance: string;
    point: number;
    polygon_point: number;
    ranking: number;
    refer_point: number;
    referral_at: string;
    referral_code: string;
    referrer_code: string;
    referrer_twitter_id: string;
    sats_balance: string;
    tia_balance: string;
    twitter_avatar: string;
    twitter_id: string;
    twitter_name: string;
    twitter_username: string;
    type: string;
    usdc_balance: string;
    usdt_balance: string;
    usdt_value: string;
    view_boost: string;
  };
};

export const getLuckyMoneyLastWinner = async (): Promise<LuckyMoneyWinner> => {
  try {
    const res = await apiClient.get(`/bvm/lucky/lastest-winer`);
    return res as any;
  } catch (error) {
    throw error;
  }
};

export const getLuckyMoneyShare = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`/bvm/lucky-share/share`);
    return res as any;
  } catch (error) {
    throw error;
  }
};

export const claimLuckyMoneyShare = async (): Promise<any> => {
  try {
    const res = await apiClient.post(`/bvm/lucky-share/share`);
    return res as any;
  } catch (error) {
    throw error;
  }
};
