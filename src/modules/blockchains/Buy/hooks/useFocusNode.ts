import { useReactFlow, useStoreApi } from '@xyflow/react';
import { signal } from '@preact/signals-react';

export const idNodeSignal = signal('');

function useFocusNode() {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();


  const handleFocusNode = (idNode: string) => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes.find(node => node.id === idNode);
      if (node && node.measured.width !== undefined && node.measured.height !== undefined) {
        idNodeSignal.value = node.id
        const x = node.position.x + node.measured.width / 2;
        const y = node.position.y + node.measured.height / 2;
        const zoom = 1.3;
        setCenter(x, y, { zoom, duration: 600 });
        setTimeout(() => {
          idNodeSignal.value = ''
        }, 2000)
      }
    }
  };


  return { handleFocusNode };
}


export default useFocusNode;
