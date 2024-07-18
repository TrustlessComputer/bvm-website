import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';

import { getModelCategories } from '@/services/customize-model';
import { MouseSensor } from './utils';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import LegoParent from './components/LegoParent';
import Lego from './components/Lego';
import Input from './components/Input';
import { mockupData } from './components/mockup';
import BaseDappLego from './components/BaseDappLego';

const RollupsDappPage = () => {
  const { l2ServiceUserAddress } = useWeb3Auth();

  const [data, setData] = React.useState<IModelCategory[]>([]);

  const handleDragStart = (event: any) => {};

  const handleDragEnd = (event: any) => {};

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const fetchData = async () => {
    const modelCategories =
      (await getModelCategories(l2ServiceUserAddress)) || [];

    const _modelCategories = modelCategories.sort((a, b) => a.order - b.order);
    setData(_modelCategories);
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
      {mockupData.map((data) => (
        <BaseDappLego {...data} />
      ))}
    </DndContext>
  );
};

export default RollupsDappPage;
