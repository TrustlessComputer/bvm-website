import { CurrentBestPNL, TopWinner } from '@/services/interfaces/activities';

export interface IDaySecond {
  topWinners: TopWinner[],
  bestPNL?: CurrentBestPNL
}

export interface ModularReport {
  total_owner: number;
  total_model: number;
}

export interface AlphaRunReport {
  total_circle: number;
  total_twitter_id: number;
  total_distance: number;
  reward_per_km: number;
  total_reward: number;
  total_reward_running: number;
  total_reward_donation: number;
}

export interface NakaVolumeReport {
  volume: string;
  usd_volume: string;
}

export interface GameReport {
  total_txs: number;
  total_game: number;
}

export interface AIReport {
  total_model: number;
  total_challenge: number;
}

export interface NumberReport {
  modular: ModularReport;
  alphaRun: AlphaRunReport;
  nakaVolume: NakaVolumeReport;
  gameReport: GameReport;
  aiReport: AIReport;
}

export interface ActivitiesState {
  daySecond: IDaySecond;
  numberReport?: NumberReport;
}
