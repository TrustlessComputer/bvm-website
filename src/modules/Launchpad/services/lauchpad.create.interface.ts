export interface ILaunchpadSetupTask {
  id?: number;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
  point_type?: string;
  input_fileds?: ILaunchpadSetupTaskInputFiled[];
}

export interface ILaunchpadSetupTaskInputFiled {
  key?: string;
  value?: string;
  name?: string;
  description?: string;
}

export interface ILaunchpadBodyTask {
  task_id?: number;
  input_values?: { key: string; value: string }[];
}
