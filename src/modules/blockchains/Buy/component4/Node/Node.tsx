import React from 'react';

import { NodeProps } from '@/types/node';
import NodeContent from './NodeContent';
import NodeHeading from './NodeHeading';

import styles from './styles.module.scss';

const Node = ({ content, heading, borderColor = '#FFC700' }: NodeProps) => {
  return (
    <div
      className={styles.node}
      style={{
        borderColor,
      }}
    >
      <NodeHeading {...heading} borderColor={borderColor} />
      <NodeContent>{content.children}</NodeContent>
    </div>
  );
};

export default React.memo(Node);
