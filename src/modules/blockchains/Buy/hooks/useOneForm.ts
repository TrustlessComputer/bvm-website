import React from 'react';
import useDapps from './useDapps';
import { formDappSignal } from '../signals/useFormDappsSignal';
import { draggedDappIndexesSignal } from '../signals/useDragSignal';
import { cloneDeep } from '../utils';

export interface IRetrieveFormsByDappKey {
  [key: string]: boolean | string | number;
}

const useOneForm = () => {
  const { dapps } = useDapps();

  const retrieveFormsByDappKey = ({ dappKey }: { dappKey: string }) => {
    const forms: IRetrieveFormsByDappKey[][] = [];

    const oneForm = cloneDeep(formDappSignal.value);
    const dappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    const dappIndexNeedToGet = dapps.findIndex((dapp) => dapp.key === dappKey);

    dappIndexes.forEach((dappIndex, index) => {
      if (dappIndex === dappIndexNeedToGet) {
        for (const key in oneForm) {
          if (key.startsWith(index.toString())) {
            if (forms[index] === undefined) {
              forms[index] = [];
            }

            forms[index].push({ [key]: oneForm[key] });
          }
        }
      }
    });

    return forms.filter((f) => f);
  };

  return {
    retrieveFormsByDappKey,
  };
};

export default useOneForm;
