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
}: NodeProps) => {
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

        {notification && <NodeNotification {...notification} />}

        <div className={styles.node__mainContent}>{content.children}</div>
      </NodeContent>
    </div>
  );
};

export default React.memo(Node);
