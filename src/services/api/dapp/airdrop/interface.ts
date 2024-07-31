export interface IAirdropTask {
  id: number;
  title: string;
  description: string;
  type: string;
  follow_twitter: string;
  share_post_link: string;
  amount: string;
}

export interface ITaskReceiver {
  address: string;
  amount: string;
}

export interface ITask {
  id: number;
  amount: string;
  content: string;
}

export interface IBodySetupTask {
  title: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  token_address: string;
  amount: string;
  tasks?: ITask[];
  receivers?: ITaskReceiver[];
  is_bvm_shard: boolean;
}
