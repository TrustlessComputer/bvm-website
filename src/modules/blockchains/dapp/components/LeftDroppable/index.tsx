import React from 'react';
import Droppable from '../Droppable';
import useFormOrderStore from '../../stores/useFormOrderStore';
import BoxOption from '../BoxOption';
import useDappsStore from '../../stores/useDappStore';

const LeftDroppable = () => {
  // const { data } = useFormOrderStore();
  const { dapps } = useDappsStore();

  return (
    <Droppable id="data">
      {dapps.map((item) => (
        <BoxOption key={item.key} fieldKey={item.key} />
      ))}
    </Droppable>
  );
};

export default LeftDroppable;
