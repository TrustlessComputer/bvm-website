import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useInternalNode,
  useReactFlow,
} from '@xyflow/react';
import s from './styles.module.scss';
import React, { memo } from 'react';
import Image from 'next/image';
import { getEdgeParams } from '@/modules/blockchains/Buy/getEdgeParams';

function CustomEdge({
                                     id,
                                     sourceX,
                                     sourceY,
                                     targetX,
                                     targetY,
                                     source,
                                     target,
                                     sourcePosition,
                                     targetPosition,
                                     markerEnd,
                                     data,
                                     style,
                                     label,
                                     sourceHandleId,
                                   }: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
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

export default memo(CustomEdge)
