import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

import { idNodeSignal } from '@/modules/blockchains/Buy/hooks/useFocusNode';
import { NodeProps } from '@/types/node';
import { useSignalEffect } from '@preact/signals-react';
import NodeNotification from '../YourNodes/NodeNotification';
import NodeContent from './NodeContent';
import NodeHeading from './NodeHeading';
import NodeOverlay from './NodeOverlay';
import styles from './styles.module.scss';

const Node = ({
  dapp,
  overlay,
  content,
  heading,
  notification,
  borderColor = '#FFC700',
  targetHandles,
  sourceHandles,
  mainContentStyles,
  id,
}: NodeProps) => {
  const [focus, setFocus] = useState(false);

  useSignalEffect(() => {
    setFocus(idNodeSignal.value === dapp?.id);
  });

  return (
    <div
      className={`${styles.node} ${focus && styles.isFocused}`}
      style={{
        borderColor,
      }}
    >
      <NodeHeading {...heading} borderColor={borderColor} />
      <NodeContent>
        {overlay && <NodeOverlay {...overlay} />}

        {notification && <NodeNotification {...notification} />}

        <div className={styles.node__mainContent} style={mainContentStyles}>
          {content.children}
        </div>
      </NodeContent>

      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Right}
          className={styles.handleDot}
        />
      ))}
      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Top}
          className={styles.handleDot}
        />
      ))}
      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Left}
          className={styles.handleDot}
        />
      ))}
      {sourceHandles?.map((handle, index) => (
        <Handle
          key={handle}
          id={handle}
          type="source"
          position={Position.Bottom}
          className={styles.handleDot}
        />
      ))}
    </div>
  );
};

export default Node;
