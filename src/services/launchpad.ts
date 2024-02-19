import createAxiosInstance from '@/services/http-client';
import { PERP_API_URL, WHITEPAPER_DOC_URL } from '@/config';
import { ILaunchpadDetail } from '@/services/interfaces/launchpad';

const apiClient = createAxiosInstance({
  baseURL: `${PERP_API_URL}/api`,
});

export const getLaunchpadDetail = async (params: {id: number}): Promise<ILaunchpadDetail> => {
  // const res: ILaunchpadDetail = await apiClient.get(`/launchpad/detail/${params?.id}`, );
  const res: ILaunchpadDetail = {
    id: 1,
    name: 'Bitcoin Virtual Machine',
    title: 'Bitcoin, reimagined.',
    description: 'We’re on a mission to reinvent Bitcoin beyond just a currency — the next internet with gaming, DeFi, AI, SocialFi, and more. Join 800 backers shaping the future of Bitcoin.',
    intro: {
      // link: 'https://www.youtube.com/watch?v=u2O0JOuDeqo&ab_channel=%E6%8A%96%E9%9F%B3%E6%AD%8C%E6%9B%B2',
      link: 'https://bvm.network/public-sale/public_sale_video_2.mp4',
      title: 'What is BVM?',
      image: 'https://bvm.network/public-sale/btn-play-3.png',
    },
    docs: [
      {
        link: 'https://bvm.network/onepager.pdf',
        title: 'Onepager',
      },
      {
        link: 'https://bvm.network/deck.pdf',
        title: 'Deck',
      },
      {
        link: WHITEPAPER_DOC_URL,
        title: 'Whitepaper',
      },
    ],
    start_date: '2024-01-30 03:30:00',
    end_date: '2024-02-06 03:30:00',
  }
  return res;
};
