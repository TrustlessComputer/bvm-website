import l2ServicesAPI from '@/services/api/l2services';
import L2ServiceAuthStorage from '@/utils/storage/authV3.storage';

export const onRemoveAuthen = (address: string) => {
  L2ServiceAuthStorage.removeToken(address);
  l2ServicesAPI.removeAccesTokenHeader();
};
