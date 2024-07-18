import React from 'react';

import LegoParent from '../LegoParent';
import Lego from '../Lego';
import Input from '../Input';

type Props = DappModel;

const BaseDappLego = ({
  requiredFields,
  optionalFields,
  key,
  title,
  icon,
}: Props) => {
  const [numberOfOptionalFields, setNumberOfOptionalFields] = React.useState(1);

  return (
    <LegoParent title={title} key={key} zIndex={2}>
      {requiredFields.map((field) => {
        if (field.type === 'input') {
          return (
            <Lego title={field.title} key={field.key} titleInLeft>
              {/* @ts-ignore */}
              <Input />
            </Lego>
          );
        }
      })}

      {Array.from({ length: numberOfOptionalFields }).map((_, index) => {
        return (
          <LegoParent
            title={optionalFields.title + ` #${index + 1}`}
            key={index}
            zIndex={1}
          >
            {optionalFields.fields.map((field) => {
              if (field.type === 'input') {
                return (
                  <Lego title={field.title} key={field.key} titleInLeft>
                    {/* @ts-ignore */}
                    <Input />
                  </Lego>
                );
              }
            })}
          </LegoParent>
        );
      })}

      <Lego
        title="Add New Allocation"
        titleInLeft
        onClick={() => {
          setNumberOfOptionalFields((prev) => prev + 1);
        }}
      ></Lego>
    </LegoParent>
  );
};

export default BaseDappLego;
