import Loading from '@/components/Loading';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';
import styles from './styles.module.scss';

const LoadingOverlay = () => {
  const { loading } = useFetchDapp();

  if (loading) {
    return (
      <div className={styles.overlay}>
        <Loading />
      </div>
    );
  }

  return null;
};

export default LoadingOverlay;
