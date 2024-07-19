import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";
import s from "./styles.module.scss";
import { useFormikContext } from "formik";
import FieldWrapInput from "./Field.WrapInput";
import InputNumber from "rc-input-number";
import { ethers } from "ethers";
import cs from "classnames";

const FieldAmount: React.FC<any> = ({
  form,
  field,
  step = 1,
  min = 1,
  max = ethers.constants.MaxUint256,
  placeholder,
  fieldChanged,
  rightComponent,
  leftComponent,
  precision = 0,
}) => {
  const formik = useFormikContext();
  const { value, name } = field;

  const _meta = form.getFieldMeta();

  const error = _meta?.error?.[name];
  const touched = _meta.touched;
  const shouldShowError = !!(touched && error);

  const handleChange = (e: any) => {
    formik.setFieldValue(name, e);
    fieldChanged?.(e);
  };

  return (
    <FormControl
      isInvalid={shouldShowError}
      className={cs(s.container, s.inputAmountContainer)}
    >
      <FieldWrapInput
        isInvalid={shouldShowError}
        left={leftComponent}
        right={rightComponent}
      >
        <InputNumber
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          inputMode="decimal"
          controls={false}
          precision={precision}
          placeholder={placeholder}
          decimalSeparator=","
        />
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

export default FieldAmount;
