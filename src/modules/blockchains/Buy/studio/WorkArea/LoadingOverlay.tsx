import Loading from '@/components/Loading';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';
import styles from './styles.module.scss';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const LoadingOverlay = () => {
  const pathName = usePathname();
  const { loading, loaded } = useFetchDapp();
  
  const isStudio = useMemo(()=>{
    return pathName === '/studio';
  }, [pathName])

  if (loading && !isStudio) {
    return (
      <div className={styles.overlay}>
        <Loading />
      </div>
    );
  }

  return null;
};

export default LoadingOverlay;
