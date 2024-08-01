import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from '@xyflow/react';
import s from './styles.module.scss';

export default function CustomEdge({
                                     id,
                                     sourceX,
                                     sourceY,
                                     targetX,
                                     targetY,
                                     sourcePosition,
                                     targetPosition,
                                     markerEnd,
                                     data,
                                     label
                                   }: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <defs>
        <marker
          id="custom-marker"
          markerWidth="15"
          markerHeight="15"
          refX="5"
          refY="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" className="custom-marker" />
        </marker>
      </defs>
      <path
        id={id}
        className={`${s.arrow} react-flow__edge-path `}
        d={edgePath}
        markerEnd="url(#custom-marker)"
      />
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} className={s.edge_line} />
      <EdgeLabelRenderer>
        <p
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className={s.edge}
        >
          {label}
        </p>
      </EdgeLabelRenderer>
    </>
  );
}
