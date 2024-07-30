export type IContestProblem = {
  id: string;
  created_at: string;
  updated_at: string;
  code: string;
  contract_address: string;
  submitted_at: string;
  contract_block_time: string;
  duration: number;
  status: 'pending' | 'marked';
  point: null;
  error_msg: string;
};
export type IUserContest = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_address: string;
  total_point: number;
  total_duration: number;
  contest_problems: IContestProblem[];
  user: {
    profile_image: string;
    name: string;
  };
};
export type IGetListLeaderboardResponse = {
  total_records: number;
  user_contests: IUserContest[];
};

export type ISubmitProblemResponse = {
  id: string;
};
