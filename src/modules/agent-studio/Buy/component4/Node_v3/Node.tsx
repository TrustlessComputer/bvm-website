import React from 'react';

import { NodeProps } from '@/types/node';
// import NodeNotification from '../YourNodes/NodeNotification';
import NodeNotification from '../YourNodes/NodeNotification_V2';

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
  notificationV2,
  borderColor = '#FFC700',
  targetHandles,
  sourceHandles,
  customNotification,
}: NodeProps & {
  isHideResetBtn?: boolean;
  isHideInterfactBtn?: boolean;
  notificationV2?: React.ReactElement;
}) => {
  const renderDefaultNotfication = () => {
    return notificationV2;
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

        <div className={styles.node__mainContent}>{content.children}</div>
        {customNotification
          ? renderCustomNotfication()
          : renderDefaultNotfication()}
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
