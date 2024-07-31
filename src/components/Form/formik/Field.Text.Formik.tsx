import { FormControl, FormErrorMessage, Input, Textarea } from '@chakra-ui/react';
import FieldHeadInput from '../Field.Head.Input';
import FieldWrapInput from '../Field.WrapInput';
import s from '../styles.module.scss';
import { compareString } from '@utils/string';
import { useFormikContext } from 'formik';

const FieldTextFormik = (props: any) => {
  const formik = useFormikContext();

  const {
    fieldType = "text",
    label,
    field,
    labelRight,
    placeholder,
    fieldChanged,
    blurFieldChanged,
    meta,
    form,
    inputRight,
    ...otherProps
  } = props;

  const { value, name } = field;

  const _meta = form.getFieldMeta();

  const error = _meta?.error?.[name];
  const touched = _meta.touched;
  const shouldShowError = !!(touched && error);

  const handleChange = (e: any) => {
    formik.setFieldValue(name, e.target.value);
    fieldChanged?.(e.target.value);
  };

  return (
    <FormControl isInvalid={shouldShowError} className={s.container}>
      {label && <FieldHeadInput label={label} labelRight={labelRight} />}
      <FieldWrapInput isInvalid={shouldShowError} right={inputRight}>
        {compareString(fieldType, "textarea") ? (
          <Textarea
            {...field}
            {...otherProps}
            onChange={handleChange}
            // onFocus={onFocus}
            onBlur={(_e) => {
              // onBlur();
              // e?.target?.blur();
              // blurFieldChanged?.(e.target.value);
            }}
            placeholder={placeholder}
            value={value}
            resize="vertical"
          />
        ) : (
          <Input
            {...field}
            type={fieldType}
            // {...otherProps}
            onChange={handleChange}
            // onFocus={onFocus}
            onBlur={(_e) => {
              // onBlur();
              // e?.target?.blur();
              // blurFieldChanged?.(e.target.value);
            }}
            placeholder={placeholder}
            value={value}
          />
        )}
      </FieldWrapInput>
      <FormErrorMessage
        style={{
          fontSize: "12px",
          color: "#dd3b4b",
          textAlign: "left",
          fontWeight: "400",
        }}
        className={s.errorText}
      >
        {error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FieldTextFormik;
