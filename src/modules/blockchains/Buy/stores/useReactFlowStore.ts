import { ChainNode, DappNodeV2 } from '@/types/node';
import { create } from 'zustand';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';

export type ReactFlowNode = DappNodeV2 | ChainNode;

type UseReactFlowState = {
  nodes: ReactFlowNode[];
  edges: Edge[];
};

type UseReactFlowAction = {
  setNodes: (nodes: ReactFlowNode[]) => void;
  setEdges: (edges: Edge[]) => void;

  onNodesChange: OnNodesChange<ReactFlowNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

type ReactFlowStore = UseReactFlowState & UseReactFlowAction;

const useReactFlowStore = create<ReactFlowStore>((set, get) => ({
  nodes: [],
  setNodes: (nodes) => set({ nodes }),

  edges: [],
  setEdges: (edges: Edge[]) => set({ edges }),

  onNodesChange: (nodes) =>
    set({ nodes: applyNodeChanges(nodes, get().nodes) }),
  onEdgesChange: (edges) =>
    set({ edges: applyEdgeChanges(edges, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge(connection, get().edges) }),
}));

export default useReactFlowStore;
