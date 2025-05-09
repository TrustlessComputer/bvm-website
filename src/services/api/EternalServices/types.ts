export enum UserContestType {
  NORMAL = 0,
  COMPETITION = 1,
  COMPETITION_2 = 2,
}
export type IContestProblem = {
  id: string;
  created_at: string;
  updated_at: string;
  code: string;
  contract_address: string;
  submitted_at: string;
  contract_block_time: string;
  duration: number;
  status: 'pending' | 'marked' | 'processing';
  point: number;
  error_msg: string;
  gas_used: number;
};
export type IUserContest = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_address: string;
  total_point: number;
  total_duration: number;
  total_gas_used: number;
  register?: boolean;
  email?: string;
  team?: string;
  university?: string;
  contest_problems?: IContestProblem[];
  name: string;
  user: {
    profile_image: string;
    name: string;
    twitter_username: string;
    email: string;
  };
  rank: number;
  contest_type: UserContestType;
};
export type IGetListLeaderboardResponse = {
  total_records: number;
  user_contests: IUserContest[];
};

export type ISubmitProblemResponse = {
  id?: string;
  message?: string;
};

export type IContestStats = {
  total_register: number;
  total_user_involved: number;
};
