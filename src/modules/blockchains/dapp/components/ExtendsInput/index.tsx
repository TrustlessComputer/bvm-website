import React from 'react';

import Lego from '../Lego';
import Toggle from '../Toggle';
import Label from '../Label';
import Input from '../Input';
import Dropdown from '../Dropdown';
import useDappsStore from '../../stores/useDappStore';
import { FieldOption } from '../../types';
import { adjustBrightness, FormDappUtil } from '../../utils';
import {
  formDappSignal,
  formDappToggleSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import { useThisDapp } from '../../hooks/useThisDapp';
import DateTimeInput from '../DateTimeInput';
import { FieldModel } from '@/types/customize-model';

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

  const _zIndex = React.useMemo(() => zIndex, []);

  const { thisDapp } = useThisDapp();

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

  const getInput = React.useCallback(
    (field: FieldModel, fieldOpt: FieldOption): React.ReactNode => {
      if (field.type === 'input') {
        return (
          <Input
            {...field}
            {...fieldOpt}
            disabled={disabled}
            onlyLabel={onlyLabel}
            name={field.key}
            dappKey={thisDapp.key}
          />
        );
      } else if (field.type === 'dropdown') {
        return (
          <Dropdown
            {...field}
            {...fieldOpt}
            disabled={disabled}
            onlyLabel={onlyLabel}
            keyDapp={thisDapp.key}
            name={field.key}
            options={field.options}
            background={adjustBrightness(background, -20)}
          />
        );
      } else if (field.type === 'group') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {field.options.map((option) => getInput(option, fieldOpt))}
          </div>
        );
      } else if (field.type === 'datetime') {
        return (
          <DateTimeInput
            {...field}
            {...fieldOpt}
            disabled={disabled}
            onlyLabel={onlyLabel}
            name={field.key}
            dappKey={thisDapp.key}
          />
        );
      }

      return null;
    },

    [thisDapp],
  );

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
          zIndex={_zIndex}
        >
          {getInput(props, fieldOption)}
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
          zIndex={_zIndex}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {options.map((option) => getInput(option, fieldOption))}
          </div>
        </Lego>
      </React.Fragment>
    );
  }

  // if (type === 'input') {
  //   return (
  //     <Lego
  //       background={background}
  //       first={false}
  //       last={false}
  //       title={title}
  //       titleInLeft={true}
  //       titleInRight={false}
  //     >
  //       {getInput(props, fieldOption)}
  //     </Lego>
  //   );
  // } else if (type === 'dropdown') {
  //   return (
  //     <Lego
  //       background={background}
  //       first={false}
  //       last={false}
  //       title={title}
  //       titleInLeft={true}
  //       titleInRight={false}
  //     >
  //       {getInput(props, fieldOption)}
  //     </Lego>
  //   );
  // } else if (type === 'group') {
  //   return (
  //     <Lego
  //       background={background}
  //       first={false}
  //       last={false}
  //       title={title}
  //       titleInLeft={true}
  //       titleInRight={false}
  //     >
  //       <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
  //         {options.map((option) => getInput(option, fieldOption))}
  //       </div>
  //     </Lego>
  //   );
  // }

  return (
    <React.Fragment>
      <Lego
        background={background}
        first={false}
        last={false}
        title={title}
        titleInLeft={true}
        titleInRight={false}
        zIndex={_zIndex + 1}
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
              zIndex={_zIndex + 1 - optIndex - 1}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default ExtendsInput;
