import { Handle, Position } from '@xyflow/react';
import React from 'react';

import { NodeProps } from '@/types/node';
import NodeNotification from '../YourNodes/NodeNotification';
import NodeContent from './NodeContent';
import NodeHeading from './NodeHeading';
import NodeOverlay from './NodeOverlay';
import styles from './styles.module.scss';

const Node = ({
  overlay,
  content,
  heading,
  notification,
  borderColor = '#FFC700',
  targetHandles,
  sourceHandles,
}: NodeProps) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!nodeRef.current) return;

    const preventKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
    };

    const node = nodeRef.current;

    node.addEventListener('keydown', preventKeyDown);

    return () => {
      node.removeEventListener('keydown', preventKeyDown);
    };
  }, []);

  return (
    <div
      className={styles.node}
      style={{
        borderColor,
      }}
    >
      <div className={`${styles.handles} ${styles.target}`}>
        {targetHandles?.map((handle) => (
          <Handle
            key={handle}
            id={handle}
            type="target"
            position={Position.Left}
            className={styles.handleDot}
          />
        ))}
      </div>

      <NodeHeading {...heading} borderColor={borderColor} />
      <NodeContent>
        {overlay && <NodeOverlay {...overlay} />}

        {notification && <NodeNotification {...notification} />}

        <div className={styles.node__mainContent}>{content.children}</div>
      </NodeContent>

      <div className={`${styles.handles} ${styles.sources}`}>
        {sourceHandles?.map((handle, index) => (
          <Handle
            key={handle}
            id={handle}
            type="source"
            position={Position.Right}
            className={styles.handleDot}
          />
        ))}
      </div>
    </div>
  );
};

export default Node;
