import { useParams } from 'next/navigation';
import React from 'react';

const useReactFlowHelper = () => {
  const params = useParams();

  const isUpdateFlow = React.useMemo(() => {
    return params.flow === 'update';
  }, [params.flow]);

  return {
    isUpdateFlow,
  };
};

export default useReactFlowHelper;
