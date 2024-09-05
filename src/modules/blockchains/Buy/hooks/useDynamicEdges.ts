import { useStoreApi } from '@xyflow/react';


function useDynamicEdges() {
  const store = useStoreApi();
  const { nodeLookup } = store.getState();
  const nodes = Array.from(nodeLookup).map(([, node]) => node);

  return ''
}


export default useDynamicEdges;
