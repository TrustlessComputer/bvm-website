import useL2Service from '@/hooks/useL2Service';
import { useEffect, useState } from 'react';

const enhanceFetchTemplate = (WrappedComponent: any) => (props: any) => {
  const { getAvailableListTemplate } = useL2Service();

  const [isInitFinish, setInitFinish] = useState(false);

  useEffect(() => {
    getAvailableListTemplate();
    setInitFinish(true);
  }, []);

  if (!isInitFinish) return null;
  if (isInitFinish) return <WrappedComponent {...props} />;
};

export default enhanceFetchTemplate;
