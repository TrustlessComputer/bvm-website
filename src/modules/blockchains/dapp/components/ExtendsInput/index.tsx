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
  } = props;

  const { dapps } = useDappsStore();

  const [toggle, setToggle] = React.useState(false);

  // Fake dapps[0] is selected
  const thisDapp = React.useMemo(() => {
    return dapps[0];
  }, [dapps]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
        {/* @ts-ignore */}
        <Input
          name={name}
          dappKey={thisDapp.key}
          inBaseField={inBaseField}
          inBlockField={inBlockField}
          inSingleField={inSingleField}
          index={index}
          level={level}
        />
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
        {/* @ts-ignore */}
        <Dropdown
          keyDapp={thisDapp.key}
          name={name}
          options={options}
          background={adjustBrightness(background, -20)}
          inBaseField={inBaseField}
          inBlockField={inBlockField}
          inSingleField={inSingleField}
          index={index}
          level={level}
        />
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
