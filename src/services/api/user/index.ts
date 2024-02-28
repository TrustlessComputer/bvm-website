// import { eternalAIAPIClient } from '@services/api/clients';
// import qs from 'query-string';
// import { ShareCodeDeployPayload, ShareCodePredictPayload } from './types';

// export const getShareTwitterCode = async (
//   payload: ShareCodeDeployPayload | ShareCodePredictPayload,
// ): Promise<string> => {
//   const query = qs.stringify({
//     ...payload,
//   });
//   const res = await eternalAIAPIClient.get(
//     `/api/user/gen-share-twcode?${query}`,
//   );
//   return res as any;
// };
