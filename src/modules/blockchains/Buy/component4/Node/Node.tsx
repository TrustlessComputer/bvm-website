import { Handle, Position } from '@xyflow/react';
import React, { useState } from 'react';

import { idNodeSignal } from '@/modules/blockchains/Buy/hooks/useFocusNode';
import { NodeProps } from '@/types/node';
import { useSignalEffect } from '@preact/signals-react';
import NodeNotification from '../YourNodes/NodeNotification';
import NodeContent from './NodeContent';
import NodeHeading from './NodeHeading';
import NodeOverlay from './NodeOverlay';
import styles from './styles.module.scss';
import SourceHandles from './SourceHandles';

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

        <SourceHandles sourceHandles={sourceHandles} />
      </NodeContent>
    </div>
  );
};

export default React.memo(Node);
