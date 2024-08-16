import { useEffect, useState } from 'react';
import useDappsStore from '../../Buy/stores/useDappStore';
import useFlowStore from '../../Buy/stores/useFlowStore';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../../Buy/signals/useDragSignal';
import { formDappSignal } from '../../Buy/signals/useFormDappsSignal';

const clearNodeEn =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const [isClear, setClear] = useState(false);
    const { setNodes, setEdges } = useFlowStore();
    const { setDapps } = useDappsStore();

    const clear = () => {
      setNodes([]);
      setEdges([]);
      setDapps([]);

      draggedDappIndexesSignal.value = [];
      draggedIds2DSignal.value = [];
      formDappSignal.value = {};

      setClear(true);
    };

    useEffect(() => {
      clear();
    }, []);

    if (!isClear) return null;
    return <WrappedComponent {...props} />;
  };

export default clearNodeEn;
