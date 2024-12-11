import Loading from '@/components/Loading';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useIsFetchingData } from '../../stores/useFetchDataState';
import styles from './styles.module.scss';

const LoadingOverlay = () => {
  const pathName = usePathname();
  const isFetchingData = useIsFetchingData();

  const isStudioPage = useMemo(() => {
    return pathName === '/studio';
  }, [pathName]);

  if (isFetchingData && !isStudioPage) {
    return (
      <div className={styles.overlay}>
        <Loading />
      </div>
    );
  }

  return null;
};

export default LoadingOverlay;
