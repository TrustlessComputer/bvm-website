export type ModuleTypeIcon =
  | 'Drafting'
  | 'Running'
  | 'Ready_To_Launch'
  | 'Insufficient_Balance'
  | 'Updating'
  | 'Setting_Up'
  | 'Waiting_Payment'
  | 'Resuming'
  | 'Ended'
  | 'Rejected'
  | 'Down';

export const getModuleIconUrlByType = (type: ModuleTypeIcon) => {
  let iconUrl = '';
  switch (type) {
    case 'Drafting':
      iconUrl = '/icons/studio-module/drafting.svg';
      break;
    case 'Ready_To_Launch':
      iconUrl = '/icons/studio-module/ready-to-launch.svg';
      break;
    case 'Insufficient_Balance':
      iconUrl = '/icons/studio-module/insufficient-balance.svg';
      break;
    case 'Updating':
      iconUrl = '/icons/studio-module/insufficient-balance.svg';
      break;
    case 'Setting_Up':
      break;
    case 'Waiting_Payment':
      break;
    case 'Resuming':
      break;
    case 'Ended':
      break;
    case 'Rejected':
      break;
    case 'Down':
      break;
  }

  return iconUrl;
};
