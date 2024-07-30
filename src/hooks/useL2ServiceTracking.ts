import l2ServicesAPI from '@/services/api/l2services';
import { EVENT_LABEL } from '@/services/api/l2services/ga-tracking';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

export const useL2ServiceTracking = () => {
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const tracking = (eventLable: keyof typeof EVENT_LABEL) => {
    l2ServicesAPI.L2ServiceTracking({
      eventLabel: eventLable,
      tcAddress: accountInforL2Service?.tcAddress || '',
    });
  };

  return {
    tracking,
  };
};
