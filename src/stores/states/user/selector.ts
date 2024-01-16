import { RootState } from '@/stores';
import { User } from '@/stores/states/user/types';

export const userSelector = (state: RootState) => state.user?.user as User | undefined;
