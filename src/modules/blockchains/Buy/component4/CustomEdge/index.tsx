import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from '@xyflow/react';
import s from './styles.module.scss';
import React from 'react';
import Image from 'next/image';

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
                                     label,
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
    <React.Fragment key={id}>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} className={s.edge_line} />
      {
        label && (
          <EdgeLabelRenderer>
            <div className={s.edge} style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}>
              <Image src={'/ic-disconnected.svg'} alt={'icon'} width={18} height={18} />
            </div>
          </EdgeLabelRenderer>
        )
      }

    </React.Fragment>
  );
}
