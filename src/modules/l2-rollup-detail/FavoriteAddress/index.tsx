import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import { Flex, Spinner, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { showError, showSuccess } from '@/components/toast';
import { getErrorMessage } from '@/utils/errorV2';
import { HEART_BEAT_WATCHLIST } from '@/constants/route-path';
import { compareString } from '@/utils/string';

const ButtonFavorite = ({ address }: { address: string }) => {
  const rollupApi = new CRollupL2DetailAPI();
  const [isFavorite, setIsFavorite] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { loggedIn, login } = useWeb3Auth();

  useEffect(() => {
    getFavorite();
  }, [address]);

  const getFavorite = async () => {
    try {
      if (!address) {
        return;
      }
      const rs = await rollupApi.getWatchLists(address);

      const _address = rs?.[0]?.address;
      setIsFavorite(compareString(address, _address));
    } catch (error) {}
  };

  const onClick = async () => {
    try {
      if (submitting) {
        return;
      }
      if (!loggedIn) {
        return login();
      }
      setSubmitting(true);
      if (isFavorite) {
        await rollupApi.removeToWatchList(address);
        setIsFavorite((v) => !v);
        showSuccess({
          message: `Added ${address} to WatchList successfully.`,
          linkText: `Go to WatchList`,
          url: HEART_BEAT_WATCHLIST,
        });
      } else {
        await rollupApi.addToWatchList(address);
        setIsFavorite((v) => !v);
        showSuccess({
          message: `Removed ${address} from WatchList successfully.`,
          linkText: `Go to WatchList`,
          url: HEART_BEAT_WATCHLIST,
        });
      }
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Tooltip
      label={`${isFavorite ? 'Remove to Watchlist' : 'Add to Watchlist'}`}
    >
      <Flex onClick={onClick} className={s.btnContainer}>
        {submitting ? (
          <Spinner width={'14px'} height={'14px'} />
        ) : isFavorite ? (
          <svg
            stroke="#fa4e0e"
            fill="#fa4e0e"
            stroke-width="0"
            viewBox="0 0 256 256"
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
          </svg>
        ) : (
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 256 256"
            height="18px"
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M237.28,97.87A14.18,14.18,0,0,0,224.76,88l-60.25-4.87-23.22-56.2a14.37,14.37,0,0,0-26.58,0L91.49,83.11,31.24,88a14.18,14.18,0,0,0-12.52,9.89A14.43,14.43,0,0,0,23,113.32L69,152.93l-14,59.25a14.4,14.4,0,0,0,5.59,15,14.1,14.1,0,0,0,15.91.6L128,196.12l51.58,31.71a14.1,14.1,0,0,0,15.91-.6,14.4,14.4,0,0,0,5.59-15l-14-59.25L233,113.32A14.43,14.43,0,0,0,237.28,97.87Zm-12.14,6.37-48.69,42a6,6,0,0,0-1.92,5.92l14.88,62.79a2.35,2.35,0,0,1-.95,2.57,2.24,2.24,0,0,1-2.6.1L131.14,184a6,6,0,0,0-6.28,0L70.14,217.61a2.24,2.24,0,0,1-2.6-.1,2.35,2.35,0,0,1-1-2.57l14.88-62.79a6,6,0,0,0-1.92-5.92l-48.69-42a2.37,2.37,0,0,1-.73-2.65,2.28,2.28,0,0,1,2.07-1.65l63.92-5.16a6,6,0,0,0,5.06-3.69l24.63-59.6a2.35,2.35,0,0,1,4.38,0l24.63,59.6a6,6,0,0,0,5.06,3.69l63.92,5.16a2.28,2.28,0,0,1,2.07,1.65A2.37,2.37,0,0,1,225.14,104.24Z"></path>
          </svg>
        )}
      </Flex>
    </Tooltip>
  );
};

export default ButtonFavorite;
