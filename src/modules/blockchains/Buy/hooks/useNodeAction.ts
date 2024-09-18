import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
} from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';
import useDraggingStore from '../stores/useDraggingStore';

const useNodeAction = () => {
  const { dapps } = useDappsStore();
  const { setIsDragging } = useDraggingStore();

  const handleOnClickCreateToken = () => {
    const tokenDappIndex = dapps.findIndex(
      (item) => item.key === 'token_generation',
    );

    setIsDragging(true);

    setTimeout(() => {
      draggedDappIndexesSignal.value = [
        ...draggedDappIndexesSignal.value,
        tokenDappIndex,
      ];
      draggedIds2DSignal.value = [...draggedIds2DSignal.value, []];
    }, 300);
  };

  return {
    handleOnClickCreateToken,
  };
};

export default useNodeAction;
