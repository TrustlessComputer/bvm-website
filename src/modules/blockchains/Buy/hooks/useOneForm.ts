import { useChainProvider } from '../../detail_v4/provider/ChainProvider.hook';
import { draggedDappIndexesSignal } from '../signals/useDragSignal';
import { formDappSignal } from '../signals/useFormDappsSignal';
import { useTemplateFormStore } from '../stores/useDappStore';
import useFlowStore from '../stores/useFlowStore';
import useDapps from './useDapps';
// import { cloneDeep } from '../utils';

import cloneDeep from 'lodash/cloneDeep';

export interface IRetrieveFormsByDappKey {
  [key: string]: boolean | string | number;
}

const useOneForm = () => {
  const { dapps } = useDapps();
  const { nodes } = useFlowStore();
  const { templateDapps } = useTemplateFormStore();
  const { isAAInstalled, order } = useChainProvider();

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

  const retrieveNodePositionsByDappKey = ({ dappKey }: { dappKey: string }) => {
    const positions: Vector2[] = [];

    const dappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    const dappIndexNeedToGet = dapps.findIndex((dapp) => dapp.key === dappKey);
    const totalTemplateDapps = templateDapps.length;
    // console.log('nodes.length', nodes.length);

    dappIndexes.forEach((dappIndex, index) => {
      if (dappIndex === dappIndexNeedToGet) {
        // console.log('realIndex', {
        //   index,
        //   totalTemplateDapps,
        // });
        const realIndex = 1 + totalTemplateDapps + index;
        const position = nodes[realIndex].position;

        positions.push(position);
      }
    });

    return positions;
  };

  return {
    retrieveFormsByDappKey,
    retrieveNodePositionsByDappKey,
  };
};

export default useOneForm;
