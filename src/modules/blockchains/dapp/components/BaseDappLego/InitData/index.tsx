import React from 'react';
import { useFormDappsStore } from '../../../stores/useDappStore';
import { DappModel } from '@/types/customize-model';

type Props = DappModel & {
  _key: string;
};

const InitData = ({ _key, ...thisDapp }: Props) => {
  const { setFormDappsWithKey } = useFormDappsStore();

  React.useEffect(() => {
    setFormDappsWithKey(_key, thisDapp);
  }, [_key]);

  return null;
};

export default InitData;
