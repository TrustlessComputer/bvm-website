import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from './styles.module.scss';

type SourceHandlesProps = {
  sourceHandles: string[];
};

const SourceHandles = ({ sourceHandles }: SourceHandlesProps) => {
  return (
    <>
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
          isConnectable={false}
          className={styles.handleDot}
        />
      ))}
    </>
  );
};

export default React.memo(SourceHandles);
