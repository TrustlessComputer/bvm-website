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
  let iconUrl = undefined;
  switch (type) {
    case 'Drafting':
      iconUrl = '/icons/studio-module/drafting.svg';
      break;
    case 'Running':
      iconUrl = '/icons/studio-module/running.svg';
      break;
    case 'Ready_To_Launch':
      iconUrl = '/icons/studio-module/ready-to-launch.svg';
      break;
    case 'Insufficient_Balance':
      iconUrl = '/icons/studio-module/insufficient-balance.svg';
      break;

    //
    case 'Ended':
    case 'Rejected':
    case 'Down':
      iconUrl = '/icons/studio-module/down.svg';
      break;

    //
    case 'Updating':
      iconUrl = '/icons/studio-module/updating.svg';
      break;
    case 'Setting_Up':
      iconUrl = '/icons/studio-module/setting.svg';
      break;
    case 'Waiting_Payment':
    case 'Resuming':
      iconUrl = undefined;
      break;
    default:
      iconUrl = undefined;
      break;
  }

  // console.log('ICON URL ', iconUrl);

  return iconUrl;
};
