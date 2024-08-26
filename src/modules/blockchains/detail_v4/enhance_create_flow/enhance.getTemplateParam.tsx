import { useEffect, useState } from 'react';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

import { useSearchParams } from 'next/navigation';
import useAvailableListTemplate from '../../Buy/studio/useAvailableListTemplate';

const enhanceGetTemplateParam =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const { setTemplateDefault } = useAvailableListTemplate();
    const searchParams = useSearchParams();

    const paramTemplate = searchParams.get('template') || 0;

    const [isInitFinish, setInitFinish] = useState(false);

    useEffect(() => {
      setTemplateDefault(Number(paramTemplate) || 0);
      setInitFinish(true);
    }, [paramTemplate]);

    if (!isInitFinish) return null;
    if (isInitFinish) return <WrappedComponent {...props} />;
  };

export default enhanceGetTemplateParam;
