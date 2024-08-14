import React from 'react';

import SvgInset from '@/components/SvgInset';
import { NodeHeadingProps } from '@/types/node';

import styles from './styles.module.scss';

const NodeHeading = ({
  title,
  status,
  backgroundColor = '#FFF6D8',
  borderColor,
  textColor = '#555555',
}: NodeHeadingProps) => {
  console.log('NodeHeading RENDER =======');
  const haveAction = React.useMemo(() => !!status?.onClick, [status]);

  return (
    <div
      className={styles.nodeHeading}
      style={{
        backgroundColor,
        borderColor,
        color: textColor,
      }}
    >
      <div className={styles.nodeHeading__title}>{title}</div>

      {status && (
        <div
          onClick={status.onClick}
          className={styles.nodeHeading__status}
          // @ts-ignore
          style={{ '--statusColor': status.color || '#E59700' }}
        >
          <span
            style={{
              textDecoration: haveAction ? 'underline' : 'none',
              textUnderlineOffset: '0.2em',
            }}
          >
            {status.message}
          </span>

          {status.icon ? (
            <SvgInset svgUrl={status.icon} size={20} />
          ) : (
            <div
              className={styles.nodeHeading__status__circle}
              style={{
                backgroundColor: borderColor,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(NodeHeading);
