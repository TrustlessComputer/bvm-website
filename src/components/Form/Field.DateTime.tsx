/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import s from './styles.module.scss';
import FieldWrapInput from './Field.WrapInput';
import cs from 'classnames';

const FieldDateTime = (props: any) => {
  const {
    fieldType = 'text',
    label,
    field,
    labelRight,
    placeholder,
    fieldChanged,
    meta,
    input,
    ...otherProps
  } = props;

  const { onChange, value } = input;

  const _meta = meta;
  const error = _meta.error;
  const touched = _meta.touched;
  const shouldShowError = !!(touched && error);

  const handleChange = (e: any) => {
    onChange(e);
    fieldChanged?.(e);
  };

  return (
    <FormControl
      isInvalid={shouldShowError}
      className={cs(s.container, s.datetimePicker)}
    >
      <FieldWrapInput isInvalid={shouldShowError}>
        <DatePicker
          {...otherProps}
          selected={value}
          onChange={handleChange}
          placeholderText="MM/DD/YYYY"
          showIcon={true}
          dateFormat={'MM/dd/YYYY h:mm aa'}
          icon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path>
            </svg>
          }
        />
      </FieldWrapInput>
      <FormErrorMessage
        style={{
          fontSize: '12px',
          color: '#dd3b4b',
          textAlign: 'left',
          fontWeight: '400',
        }}
        className={s.errorText}
      >
        {error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FieldDateTime;
