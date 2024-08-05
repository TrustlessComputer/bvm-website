import { Edge, MarkerType } from '@xyflow/react';

export const edges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    sourceHandle: '1-s-2',
    target: '2',
    targetHandle: '2-t-1',
    type: 'custom-edge',
    label: 'Output 1',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  // {
  //   id: '1-3',
  //   source: '1',
  //   sourceHandle: '1-s-3',
  //   target: '3',
  //   targetHandle: '3-t-1',
  //   type: 'custom-edge',
  //   label: 'Output 2',
  //
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
  // {
  //   id: '1-4',
  //   source: '1',
  //   sourceHandle: '1-s-3',
  //   target: '4',
  //   targetHandle: '4-t-1',
  //   type: 'custom-edge',
  //   label: 'Output 2',
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
];
