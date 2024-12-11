import { create } from 'zustand';

type State = {
  loading: boolean;
};

type Actions = {
  setLoading: (loading: boolean) => void;
};

const useFetchDappState = create<State & Actions>()((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export const useIsFetchingData = () => {
  const loading = useFetchDappState((state) => state.loading);
  return loading;
};

export default useFetchDappState;
