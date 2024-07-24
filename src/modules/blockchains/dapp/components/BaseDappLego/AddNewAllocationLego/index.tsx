import React from 'react';
import Lego from '../../Lego';
import { adjustBrightness } from '../../../utils';
import { useFormDappsStore } from '../../../stores/useDappStore';

type Props = {
  _key: string;
};

const AddNewAllocationLego = ({ _key }: Props) => {
  const { formDapps, setFormDappsWithKey } = useFormDappsStore();
  const thisDapp = formDapps[_key];

  if (Object.keys(thisDapp).length === 0 || !thisDapp) return null;

  // const addNewAllocation = React.useCallback(() => {
  //   const optionalFieldsClone = JSON.parse(
  //     JSON.stringify(thisDapp?.optionalField[0]),
  //   );
  //
  //   setFormDappsWithKey(_key, {
  //     ...thisDapp,
  //     optionalField: [...thisDapp?.optionalField, optionalFieldsClone],
  //   });
  // }, [_key, thisDapp]);

  return null;

  // return (
  //   <Lego
  //     title="Add New Allocation"
  //     titleInLeft
  //     onClick={() => addNewAllocation()}
  //     background={adjustBrightness(thisDapp.color, -20)}
  //   />
  // );
};

export default AddNewAllocationLego;
