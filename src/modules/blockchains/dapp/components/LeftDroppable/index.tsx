import React from 'react';

import Droppable from '../Droppable';
import BoxOption from '../BoxOption';

const LeftDroppable = () => {
  return (
    <Droppable id="input">
      <BoxOption />
    </Droppable>
  );
};

export default LeftDroppable;
