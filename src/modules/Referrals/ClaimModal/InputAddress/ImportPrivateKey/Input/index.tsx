import React, { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import { CDN_URL_IMAGES_NBC } from '@/config';
import { Tooltip } from '@chakra-ui/react';
import cs from 'classnames';
import s from './ImportInput.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  refInput?: any;
  classContainer?: string | undefined;
  classInputWrapper?: string | undefined;
  classInput?: string | undefined;
  title?: string | undefined;
  rightTitle?: string | undefined | any;
  errorMsg?: string;
  tooltipText?: string;
  sizeLabel?: number;
  rightElement?: React.ReactNode;
}

const Input = (props: InputProps) => {
  const {
    type = "text",
    value = "",
    placeholder = "",
    onChange = () => {},
    onKeyDown = () => {},
    refInput,
    classContainer,
    classInputWrapper,
    classInput,
    title,
    rightTitle,
    errorMsg,
    tooltipText,
    sizeLabel,
    rightElement,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<
    HTMLInputTypeAttribute | undefined
  >(type);
  const inputTypeInit = useRef<string>(type);

  useEffect(() => {
    inputTypeInit.current = type;
  }, []);

  const onClick = () => {
    setShowPassword(!showPassword);
    setCurrentType(currentType === "text" ? "password" : "text");
  };

  return (
    <div className={cs(s.container, classContainer)}>
      <div className={s.label_wrapper}>
        {!!title && (
          <label
            style={{
              textTransform: "uppercase",
              fontSize: sizeLabel || 12,
              display: "flex",
              alignItems: "center",
            }}
            className="input-title"
          >
            {title}
            {!!tooltipText && (
              <Tooltip
                label={
                  <p style={{ fontSize: 12, color: "white" }}>{tooltipText}</p>
                }
              >
                <span className="wrap-ic-ask">
                  <img
                    className="ic-ask"
                    src={`${CDN_URL_IMAGES_NBC}/ic-information.svg`}
                    width={18}
                  />
                </span>
              </Tooltip>
            )}
          </label>
        )}
        {!!rightTitle && (
          <p style={{ fontSize: 12, fontWeight: "500", color: "white" }}>
            {rightTitle}
          </p>
        )}
      </div>

      <div className={cs(s.input_wrapper, classInputWrapper)}>
        <input
          {...rest}
          ref={refInput}
          className={`input-container-style ${classInput}`}
          type={currentType as any}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          spellCheck="false"
        />
        {inputTypeInit.current === "password" && (
          <div className="icon-container" onClick={onClick}>
            <img src="/icons/ic-password.svg" />
          </div>
        )}
        {!!rightElement && <div className="icon-container">{rightElement}</div>}
      </div>
      {!!errorMsg && (
        <p style={{ marginTop: "4px" }} className="error">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default Input;
