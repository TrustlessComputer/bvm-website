import { CHAIN_DATA, DAPPS_DATA } from '../ExploreModule/data';
import { ROLLUPS } from './../../constants/route-path';
import { CDN_URL } from '@/config';

export const APPS_SECTION = {
  tag: 'Apps and games. ',
  title: 'Experience Bitcoin like never before.',
  item: DAPPS_DATA,
};

export const ROLLUPS_SECTION = {
  tag: 'Rollups. ',
  title: `Explore chains backed by Bitcoin's security.`,
  item: CHAIN_DATA,
};
