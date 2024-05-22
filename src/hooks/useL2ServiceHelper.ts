import l2ServicesAPI from '@/services/api/l2services';
import { useAppDispatch } from '@/stores/hooks';
import { setL2ServiceAuth } from '@/stores/states/l2services/reducer';
import { getErrorMessage } from '@/utils/errorV2';
import L2ServiceAuthStorage from '@/utils/storage/authV3.storage';
import toast from 'react-hot-toast';

export const useL2ServiceHelper = () => {
  const dispatch = useAppDispatch();

  const onLogout = async (nakaAddress: string) => {
    try {
      L2ServiceAuthStorage.removeToken(nakaAddress);
      l2ServicesAPI.removeAccesTokenHeader();
      dispatch(setL2ServiceAuth(false));
    } catch (error) {
      const { message } = getErrorMessage(error, 'onLogout');
      toast.error(message);
      throw error;
    }
  };

  return {
    onLogout,
  };
};
