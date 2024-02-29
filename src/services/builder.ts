import { BVM_API } from '@/config';
import { apiClient } from '@/services/index';

export type ListBuilder = Record<string, number | string>[];

export const getListBuilders = async ({
  page = 1,
  limit = 100,
}: {
  page?: number;
  limit?: number;
}): Promise<ListBuilder> => {
  let result = [] as any;
  try {
    result = await apiClient.get(
      `${BVM_API}/api/bvm/builder/list?page=${page}&limit=${limit}`,
    );
  } catch (err: unknown) {
    console.log('[getListBuilder] err ', err);
  } finally {
    return result;
  }
};
