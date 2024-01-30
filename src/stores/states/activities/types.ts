import { TopWinner } from '@/services/interfaces/activities';

export interface IDaySecond {
  topWinners: TopWinner[]
}

export interface ActivitiesState {
  daySecond: IDaySecond
}
