import React from "react";

type Props = {
  fieldChanged?: (_: any) => void;
  placeholder?: string;
  borderColor?: string;
  input?: any;
  meta?: any;
};

const UsernameInput = (props: Props) => {
  const { input, meta, fieldChanged, placeholder, borderColor, ...restProps } =
    props;
  const { onChange, onBlur, onFocus, value } = input;
  const { error } = meta;

  const isError = meta.error && meta.touched;

  const handleChange = (e: any) => {
    // change input verify is number
    // const value = e.target.value;

    // if (formatValue !== undefined) {
    onChange(e.target.value);
    fieldChanged?.(e.target.value);
    // }
  };

  return (
    <div>
      <input
        type={"text"}
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onBlur={(e) => {
          onBlur();
          e?.target?.blur();
        }}
        {...restProps}
        onChange={handleChange}
      />
      {isError && (
        <div className="error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default UsernameInput;
