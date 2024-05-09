/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import styles from './styles.module.scss';

interface FieldAmountProps {
  input?: any;
  meta?: any;
  customMeta?: any;
  label?: string;
  prependComp?: React.ReactNode;
  appendComp?: React.ReactNode;
  onClickMax?: React.MouseEventHandler;
  placeholder?: string;
  decimals?: number;
  maxLength?: number;
  note?: React.ReactNode;
  rightLabel?: React.ReactNode;
  fieldChanged?: (_: any) => void;
  blurFieldChanged?: (_: any) => void;
  hideError?: boolean;
  borderColor?: string;
  min?: number;
  max?: number;
  showError?: boolean;
  isDisabled?: boolean;
  inputNote?: string;
}

const FieldAmount = (props: FieldAmountProps) => {
  const {
    input,
    meta,
    label,
    prependComp,
    appendComp,
    onClickMax,
    placeholder = '0.0',
    decimals = 2,
    maxLength = 256,
    note,
    rightLabel,
    fieldChanged,
    blurFieldChanged,
    // disabledInput, errorPlacement, zIndex, anchorAppend,
    hideError = false,
    borderColor = '#353945',
    customMeta,
    min,
    max,
    showError,
    inputNote,
    isDisabled,
    ...restProps
  } = props;
  const { onChange, onBlur, onFocus, value } = input;
  const _meta = meta || customMeta;
  const error = _meta.error;
  const touched = _meta.touched;
  const shouldShowError = !!(touched && error) || (error && value) || showError;
  const hasAppend = appendComp || onClickMax;

  const handleChange = (e: any) => {
    onChange(e);
    fieldChanged?.(e);
  };

  const isError = (meta.error && meta.touched) || showError;

  return (
    <>
      <FormControl
        isDisabled={isDisabled}
        isInvalid={isError}
        className={isError && 'isError'}
      >
        {(label || rightLabel) && (
          <Flex justifyContent={'space-between'}>
            <Box>
              <FormLabel>{label}</FormLabel>
            </Box>
            <Box>
              {typeof rightLabel === 'object' ? (
                rightLabel
              ) : (
                <FormLabel>{rightLabel}</FormLabel>
              )}
            </Box>
          </Flex>
        )}
        <InputGroup
          borderStyle={'solid'}
          borderWidth={1}
          borderColor={shouldShowError ? '#dd3b4b' : borderColor}
          borderRadius={8}
          bgColor="#000000"
          overflow="hidden"
          gap={'16px'}
          {...restProps}
        >
          {prependComp && (
            <InputLeftElement
              children={prependComp}
              ml={2}
              mr={2}
              height="100%"
              position={'relative'}
            />
          )}
          <Box className={styles.formControl}>
            <NumberInput
              value={value}
              defaultValue={value}
              precision={decimals}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={(e: any) => {
                onBlur();
                e?.target?.blur();
                const _value = e?.target?.value || min;
                blurFieldChanged?.(_value);
                onChange(_value);
              }}
              className="number-input"
              min={min}
              max={max}
              {...restProps}
            >
              <NumberInputField
                maxLength={maxLength}
                placeholder={placeholder}
                inputMode="text"
              />
              {inputNote && <Text className={'input-note'}>{inputNote}</Text>}
            </NumberInput>
          </Box>
          {hasAppend && (
            <InputRightElement
              w="fit-content"
              mr={2}
              height="100%"
              children={
                appendComp ||
                (onClickMax && (
                  <Button onClick={onClickMax} className={'btnMax'}>
                    Max
                  </Button>
                ))
              }
              position={'relative'}
            />
          )}
        </InputGroup>
        {note && <div className="field-note">{note}</div>}
      </FormControl>

      {!hideError && isError && (
        <Text
          style={{
            fontSize: '12px',
            color: '#dd3b4b',
            textAlign: 'left',
            fontWeight: '400',
          }}
          className="error-text"
        >
          {error}
        </Text>
      )}
    </>
  );
};

export default FieldAmount;
