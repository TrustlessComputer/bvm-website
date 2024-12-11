import { ChainNode, DappNode } from '@/types/node';
import {
  Edge,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import { create } from 'zustand';

export type AppNode = ChainNode | DappNode;

export type AppState = {
  nodes: AppNode[];
  setNodes: (nodes: AppNode[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  removedNode: AppNode | null;
  setRemovedNode: (node: AppNode | null) => void;
  appStatus: {
    isActing: boolean;
  };
  setAppStatus: (status: { isActing: boolean }) => void;
};

const useFlowStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  removedNode: null,
  setRemovedNode: (node) => {
    set({ removedNode: node });
  },
  appStatus: {
    isActing: false,
  },
  setAppStatus: (status) => {
    set({ appStatus: status });
  },
}));

export const useNodes = () => {
  return useFlowStore((state) => state.nodes);
};

export const useEdges = () => {
  return useFlowStore((state) => state.edges);
};

export default useFlowStore;
