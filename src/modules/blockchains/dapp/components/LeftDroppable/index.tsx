import React from 'react';

import Droppable from '../Droppable';
import BoxOption from '../BoxOption';
import useDappsStore from '../../stores/useDappStore';

const LeftDroppable = () => {
  const { dapps } = useDappsStore();

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[0];
  }, [dapps]);

  return (
    <Droppable id="input">
      {/* {dapps.map((item) => (
        <BoxOption key={item.key} fieldKey={item.key} />
      ))} */}
      {thisDapp && <BoxOption key={thisDapp.key} fieldKey={thisDapp.key} />}
    </Droppable>
  );
};

export default LeftDroppable;
