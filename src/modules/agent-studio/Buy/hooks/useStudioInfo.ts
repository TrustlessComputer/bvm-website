import { useParams } from 'next/navigation';
import React from 'react';

const useStudioInfo = () => {
  const params = useParams();

  const isUpdateFlow = React.useMemo(() => {
    return !!params?.id;
  }, [params?.id]);

  return {
    isUpdateFlow,
  };
};

export default useStudioInfo;
