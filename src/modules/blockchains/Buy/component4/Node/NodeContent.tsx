import React from 'react';

import { NodeContentProps } from '@/types/node';

import styles from './styles.module.scss';

const NodeContent = ({ children, contentStyles }: NodeContentProps) => {
  return (
    <div className={styles.nodeContent} style={contentStyles}>
      {children}
    </div>
  );
};

export default React.memo(NodeContent);
