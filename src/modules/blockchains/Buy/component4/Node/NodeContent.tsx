import React from 'react';

import { NodeContentProps } from '@/types/node';

import styles from './styles.module.scss';

const NodeContent = ({ children }: NodeContentProps) => {
  return <div className={styles.nodeContent}>{children}</div>;
};

export default React.memo(NodeContent);
