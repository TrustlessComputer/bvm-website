import { useCallback } from 'react';
import axios from 'axios';

import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { getUuid } from '@/utils/helpers';

export const BASE_URL = 'https://nbc-analytics-drwcpccxdq-as.a.run.app/api/v1';
export const API_KEY = 'P1x4509vQnABdPiBKmTKNV0DuNpRb0U0';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5 * 60000,
  headers: { 'Content-Type': 'application/json', Authorization: API_KEY },
});

export const useEventTracking = () => {
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const userId = accountInforL2Service?.tcAddress || '';
  const userUuid = getUuid();

  const trackPageView = useCallback(
    (page?: string) => {
      try {
        const href = page || window.location.href;
        apiClient.post('/event_tracking', {
          event_name: 'page_view',
          event_timestamp: Math.floor(Date.now() / 1000),
          data: {
            user_id: userId,
            user_pseudo_id: userUuid,
            event_params: [{ key: 'page_name', value: href }],
            platform: 'web',
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [accountInforL2Service?.tcAddress],
  );

  return {
    trackPageView,
  };
};
