import React from 'react';

import Droppable from '../Droppable';
import BoxOption from '../BoxOption';
import useDappsStore from '../../stores/useDappStore';

const LeftDroppable = () => {
  const { dapps, currentIndexDapp } = useDappsStore();

  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  return (
    <Droppable id="input">
      {thisDapp && <BoxOption key={thisDapp.key} fieldKey={thisDapp.key} />}
    </Droppable>
  );
};

export default LeftDroppable;
