import React from 'react';

import Lego from '../Lego';
import Toggle from '../Toggle';
import { FieldOption } from '../../types';
import { adjustBrightness, FormDappUtil } from '../../utils';
import {
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import { FieldModel } from '@/types/customize-model';
import { useThisDapp } from '../../hooks/useThisDapp';

type Props = FieldModel &
  FieldOption & {
    name: string;
    keyDapp: string;
    background?: string;
    onlyLabel?: boolean;
    disabled?: boolean;
    zIndex?: number;
  };

const ExtendsInput = ({
  onlyLabel = false,
  disabled = false,
  zIndex = 0,
  ...props
}: Props) => {
  const {
    background = '#A041FF',
    keyDapp,
    title,
    type,
    name,
    options,
    inBaseField,
    inBlockField,
    inSingleField,
    index,
    level,
    blockKey,
    baseIndex,
    value,
  } = props;

  const fieldOption: any = {
    inBaseField,
    inBlockField,
    inSingleField,
    index,
    level,
    blockKey,
    baseIndex,
  };

  const { thisDapp, getInputWithoutLego } = useThisDapp();

  const [toggle, setToggle] = React.useState(Boolean(value));

  const handleToggle = () => {
    if (disabled || onlyLabel) return;

    setToggle(!toggle);
    const key = FormDappUtil.getKeyForm(props, props, name);
    formDappSignal.value = {
      ...formDappSignal.value,
      [key]: !toggle,
    };
  };

  React.useEffect(() => {
    if (type !== 'extends') return;

    const formDappToggle = onlyLabel
      ? formTemplateDappSignal.value
      : formDappSignal.value;
    const key = FormDappUtil.getKeyForm(props, props, name);

    if (typeof formDappToggle[key] !== 'undefined') {
      setToggle(formDappToggle[key]);
    } else {
      formDappSignal.value = {
        ...formDappToggle,
        [key]: Boolean(value),
      };
    }
  }, [value]);

  if (type !== 'group' && type !== 'extends') {
    return (
      <React.Fragment>
        <Lego
          background={background}
          first={false}
          last={false}
          title={title}
          titleInLeft={true}
          titleInRight={false}
          zIndex={zIndex}
        >
          {getInputWithoutLego(props, fieldOption)}
        </Lego>
      </React.Fragment>
    );
  } else if (type !== 'extends') {
    return (
      <React.Fragment>
        <Lego
          background={background}
          first={false}
          last={false}
          title={title}
          titleInLeft={true}
          titleInRight={false}
          zIndex={zIndex}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {options.map((option) => getInputWithoutLego(option, fieldOption))}
          </div>
        </Lego>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Lego
        background={background}
        first={false}
        last={false}
        title={title}
        titleInLeft={true}
        titleInRight={false}
        zIndex={zIndex}
      >
        <Toggle
          background={adjustBrightness(background, -20)}
          handleToggle={handleToggle}
          toggle={toggle}
        />
      </Lego>

      {toggle
        ? options.map((option, optIndex) => (
            <ExtendsInput
              name={option.key}
              keyDapp={keyDapp}
              background={background}
              inBaseField={inBaseField}
              inBlockField={inBlockField}
              inSingleField={inSingleField}
              blockKey={blockKey}
              index={index}
              {...option}
              {...fieldOption}
              level={level + 1}
              key={option.key}
              disabled={disabled}
              onlyLabel={onlyLabel}
              zIndex={zIndex - optIndex}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default ExtendsInput;
