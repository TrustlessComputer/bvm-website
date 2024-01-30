import { CurrentBestPNL, TopWinner } from '@/services/interfaces/activities';

export interface IDaySecond {
  topWinners: TopWinner[],
  bestPNL?: CurrentBestPNL
}

export interface ActivitiesState {
  daySecond: IDaySecond
}
