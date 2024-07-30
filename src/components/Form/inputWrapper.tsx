import React from 'react';

import styles from './styles.module.scss';
import { Box, Flex } from '@chakra-ui/react';
import cx from 'clsx';
import InfoTooltip from './InfoTooltip';

interface InputWrapperProps {
  label?: string | React.ReactNode;
  rightLabel?: string | React.ReactNode;
  desc?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
  labelColor?: string;
  note?: any;
}

const InputWrapper = (props: InputWrapperProps) => {
  const {
    className,
    label,
    desc,
    children,
    rightLabel,
    theme = 'dark',
    labelColor,
    note,
  } = props;

  return (
    <div
      className={cx([
        styles.inputWrapper,
        className,
        theme === 'dark' && styles.inputWrapperDark,
      ])}
    >
      {label && (
        <div className={cx(styles.labelWrapper, 'labelWrapper')}>
          <Flex alignItems="flex-end" justifyContent={'space-between'} gap={1}>
            <Flex alignItems={'center'} gap={'2px'}>
              <label style={{ color: labelColor }}>{label}</label>
              {desc && (
                <InfoTooltip iconSize="sm" label={desc} placement="top" />
              )}
            </Flex>
            <Box className="labelRightWrapper">{rightLabel}</Box>
          </Flex>
        </div>
      )}
      {children}
      {note && <div className="field-note">{note}</div>}
    </div>
  );
};

export default InputWrapper;
