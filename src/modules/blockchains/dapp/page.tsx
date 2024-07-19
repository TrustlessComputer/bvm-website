import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { getModelCategories } from '@/services/customize-model';

import { MouseSensor } from './utils';
import { dappMockupData, modelCategoriesMockupData } from './mockup';
import LeftDroppable from './components/LeftDroppable';
import RightDroppable from './components/RightDroppable';
import DragMask from './components/DragMask';
import useFormOrderStore from './stores/useFormOrderStore';
import useDappsStore, { useFormDappsStore } from './stores/useDappStore';

import styles from './styles.module.scss';

const RollupsDappPage = () => {
  const { l2ServiceUserAddress } = useWeb3Auth();
  const { setData } = useFormOrderStore();
  const { dapps, setDapps } = useDappsStore();
  // const { setFormDapps } = useFormDappsStore();

  const handleDragStart = (event: DragStartEvent) => {};

  const handleDragEnd = (event: DragEndEvent) => {};

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const fetchData = async () => {
    // const modelCategories =
    //   (await getModelCategories(l2ServiceUserAddress)) || [];
    // const modelCategories = modelCategoriesMockupData;

    // const _modelCategories = modelCategories.sort((a, b) => a.order - b.order);
    // setData(_modelCategories);

    const dapps = dappMockupData;
    const _dapps = dapps.sort((a, b) => a.order - b.order);
    // const formDapps: Record<string, DappModel> = _dapps.reduce(
    //   (acc, dapp) => ({
    //     ...acc,
    //     [dapp.key]: dapp,
    //   }),
    //   {},
    // );
    setDapps(_dapps);
    // setFormDapps(formDapps);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.container__droppable}>
          <LeftDroppable />
        </div>

        <DragMask />

        <div className={styles.container__droppable}>
          <RightDroppable />
        </div>

        {/* {dapps.map((data) => (
        <BaseDappLego {...data} key={data.key} _key={data.key} />
      ))} */}
      </DndContext>
    </div>
  );
};

export default RollupsDappPage;
