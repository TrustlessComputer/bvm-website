import React from 'react';

import Droppable from '../Droppable';
import BoxOption from '../BoxOption';
import useDappsStore from '../../stores/useDappStore';
import { useThisDapp } from '../../hooks/useThisDapp';

const LeftDroppable = () => {
  const { thisDapp } = useThisDapp();

  return (
    <Droppable id="input">
      {thisDapp && <BoxOption key={thisDapp.key} />}
    </Droppable>
  );
};

export default LeftDroppable;
