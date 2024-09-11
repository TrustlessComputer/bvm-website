import React from 'react';

import { NodeProps } from '@/types/node';
import NodeNotification from '../YourNodes/NodeNotification';

import NodeContent from './NodeContent';
import NodeHeading from './NodeHeading';
import NodeOverlay from './NodeOverlay';
import styles from './styles.module.scss';
import { Handle, Position } from '@xyflow/react';

const Node = ({
  overlay,
  content,
  heading,
  notification,
  borderColor = '#FFC700',
  targetHandles,
  sourceHandles,
  customNotification,
}: NodeProps) => {
  const renderDefaultNotfication = () => {
    return notification && <NodeNotification {...notification} />;
  };

  const renderCustomNotfication = () => {
    return customNotification;
  };

  return (
    <div
      className={styles.node}
      style={{
        borderColor,
      }}
    >
      <NodeHeading {...heading} borderColor={borderColor} />
      <NodeContent>
        {overlay && <NodeOverlay {...overlay} />}
        {customNotification
          ? renderCustomNotfication()
          : renderDefaultNotfication()}

        <div className={styles.node__mainContent}>{content.children}</div>
      </NodeContent>

      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Right}
          className={styles.handleDot}
          isConnectable={false}
        />
      ))}
      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Top}
          className={styles.handleDot}
          isConnectable={false}
        />
      ))}
      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Left}
          className={styles.handleDot}
          isConnectable={false}
        />
      ))}
      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Bottom}
          className={styles.handleDot}
          isConnectable={false}
        />
      ))}
    </div>
  );
};

export default Node;
