import cn from 'classnames';
import React from 'react';

import SvgInset from '@/components/SvgInset';
import { NodeHeadingProps } from '@/types/node';

import styles from './styles.module.scss';

const NodeHeading = ({
  title,
  icon,
  status,
  backgroundColor = '#FFF6D8',
  borderColor,
  textColor = '#555555',
  headingStyles,
  iconOnClick,
}: NodeHeadingProps) => {
  const haveAction = React.useMemo(() => !!status?.onClick, [status]);

  return (
    <div
      className={cn('drag-handle-area', styles.nodeHeading)}
      style={{
        backgroundColor,
        borderColor,
        color: textColor,
        // @ts-ignore
        '--textColor': textColor,
        ...headingStyles,
      }}
    >
      <div className={styles.nodeHeading__title}>
        {title}{' '}
        {icon && (
          <SvgInset
            className={styles.nodeHeading__icon}
            svgUrl={icon}
            size={20}
            onClick={iconOnClick}
          />
        )}
      </div>

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
              cursor: haveAction ? 'pointer' : 'default',
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
