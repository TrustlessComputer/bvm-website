import { NodeBase } from '@xyflow/system';
import { ElkNodeData } from '@/modules/blockchains/blockchain-map/components/PreviewMapModal/data';

export const formatData = (initNode: NodeBase<ElkNodeData>[], dataNode: any) => {
  const getBlockChainBox = initNode.find((item)=> item.data.label === "Blockchain");
  initNode.shift()

  return {
    initNode, dataNode
  }
}
