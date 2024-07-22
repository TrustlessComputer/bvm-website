import React from 'react';

import Lego from '../Lego';
import Toggle from '../Toggle';
import Label from '../Label';
import Input from '../Input';
import Dropdown from '../Dropdown';
import useDappsStore from '../../stores/useDappStore';
import { FieldOption } from '../../types';
import { adjustBrightness } from '../../utils';

type Props = FieldModel &
  FieldOption & {
    name: string;
    keyDapp: string;
    background?: string;
  };

const ExtendsInput = ({ ...props }: Props) => {
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
  } = props;

  const fieldOption: any = {
    inBaseField,
    inBlockField,
    inSingleField,
    index,
    level,
    blockKey,
  };

  const { dapps, currentIndexDapp } = useDappsStore();

  const [toggle, setToggle] = React.useState(false);

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[currentIndexDapp];
  }, [dapps, currentIndexDapp]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const getInput = React.useCallback(
    (field: FieldModel, fieldOpt: FieldOption): React.ReactNode => {
      if (field.type === 'input') {
        return (
          <Input
            {...field}
            {...fieldOpt}
            name={field.key}
            dappKey={thisDapp.key}
          />
        );
      } else if (field.type === 'dropdown') {
        return (
          <Dropdown
            {...field}
            {...fieldOpt}
            keyDapp={thisDapp.key}
            name={field.key}
            options={field.options}
            background={adjustBrightness(background, -40)}
          />
        );
      } else if (field.type === 'group') {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {field.options.map((option) => getInput(option, fieldOpt))}
          </div>
        );
      }

      return null;
    },

    [thisDapp],
  );

  if (type === 'input') {
    return (
      <Lego
        background={background}
        first={false}
        last={false}
        title={title}
        titleInLeft={true}
        titleInRight={false}
      >
        {getInput(props, fieldOption)}
      </Lego>
    );
  } else if (type === 'dropdown') {
    return (
      <Lego
        background={background}
        first={false}
        last={false}
        title={title}
        titleInLeft={true}
        titleInRight={false}
      >
        {getInput(props, fieldOption)}
      </Lego>
    );
  } else if (type === 'group') {
    return (
      <Lego
        background={background}
        first={false}
        last={false}
        title={title}
        titleInLeft={true}
        titleInRight={false}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {options.map((option) => getInput(option, fieldOption))}
        </div>
      </Lego>
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
      >
        <Toggle
          background={adjustBrightness(background, -20)}
          handleToggle={handleToggle}
          toggle={toggle}
        />
      </Lego>

      {toggle
        ? options.map((option) => (
            // @ts-ignore
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
              level={level + 1}
              key={option.key}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default ExtendsInput;
