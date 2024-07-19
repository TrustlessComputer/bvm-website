import { DndContext, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';

import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';

import { MouseSensor } from './utils';
import BaseDappLego from './components/BaseDappLego';
import useDappsStore from './stores/useDappStore';
import { mockupData } from './mockup';

const RollupsDappPage = () => {
  const { l2ServiceUserAddress } = useWeb3Auth();
  const { dapps, setDapps, setFormDapps } = useDappsStore();

  const handleDragStart = (event: any) => {};

  const handleDragEnd = (event: any) => {};

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const fetchData = async () => {
    const dapps = mockupData;

    const _dapps = dapps.sort((a, b) => a.order - b.order);
    const formDapps: Record<string, DappModel> = _dapps.reduce(
      (acc, dapp) => ({
        ...acc,
        [dapp.key]: dapp,
      }),
      {},
    );

    setDapps(_dapps);
    setFormDapps(formDapps);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {dapps.map((data) => (
        <BaseDappLego id={data.key} key={data.key} />
      ))}
    </DndContext>
  );
};

export default RollupsDappPage;
