import React from 'react';

import LegoParent from '../LegoParent';
import Lego from '../Lego';
import Input from '../Input';
import Dropdown from '../Dropdown';
import useDappsStore from '../../stores/useDappStore';
import { adjustBrightness } from '../../utils';

type Props = {
  id: string;
};

const yesNoOptions: FieldModel[] = [
  {
    key: 'yes',
    title: 'Yes',
    type: 'input',
    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
    value: 1,
    defaultValue: '',
    tooltip: '',
  },
  {
    key: 'no',
    title: 'No',
    type: 'input',
    icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
    value: 0,
    defaultValue: '',
    tooltip: '',
  },
];

const BaseDappLego = ({ id }: Props) => {
  const { formDapps, setFormDapps } = useDappsStore();

  const thisDapp = formDapps[id];
  const totalFields =
    thisDapp.requiredFields.length +
    thisDapp.optionalFields
      .map((o) => o.fields.length)
      .reduce((acc, cur) => acc + cur, 0);

  const handleInputChange = React.useCallback(
    (
      name: string,
      value: string,
      required: boolean,
      optionalIndex?: number,
    ) => {
      const newRequiredFields = JSON.parse(
        JSON.stringify(thisDapp.requiredFields),
      );
      const newOptionalFields = JSON.parse(
        JSON.stringify(thisDapp.optionalFields),
      );

      if (required) {
        for (const requiredField of newRequiredFields) {
          if (requiredField.key === name) {
            requiredField.value = value;
          }
        }
      } else if (typeof optionalIndex !== 'undefined') {
        newOptionalFields[optionalIndex].fields = newOptionalFields[
          optionalIndex
        ].fields.map((field: FieldModel) => {
          if (field.key === name) {
            return {
              ...field,
              value,
            };
          }

          return field;
        });
      }

      setFormDapps({
        ...formDapps,
        [id]: {
          ...thisDapp,
          requiredFields: newRequiredFields,
          optionalFields: newOptionalFields,
        },
      });
    },
    [thisDapp, formDapps, id, setFormDapps],
  );

  const handleOnClickOnOption = React.useCallback(
    (
      name: string,
      option: FieldModel,
      required: boolean,
      optionalIndex?: number,
    ) => {
      const newRequiredFields = JSON.parse(
        JSON.stringify(thisDapp.requiredFields),
      );
      const newOptionalFields = JSON.parse(
        JSON.stringify(thisDapp.optionalFields),
      );

      if (required) {
        for (const requiredField of newRequiredFields) {
          if (requiredField.key === name) {
            requiredField.value = option.value;
          }
        }
      } else if (typeof optionalIndex !== 'undefined') {
        newOptionalFields[optionalIndex].fields = newOptionalFields[
          optionalIndex
        ].fields.map((field: FieldModel) => {
          if (field.key === name) {
            return {
              ...field,
              value: option.value,
            };
          }

          return field;
        });
      }

      setFormDapps({
        ...formDapps,
        [id]: {
          ...thisDapp,
          requiredFields: newRequiredFields,
          optionalFields: newOptionalFields,
        },
      });
    },
    [thisDapp, formDapps, id, setFormDapps],
  );

  const getCommonLego = React.useCallback(
    (
      zIndex: number,
      field: FieldModel,
      required: boolean,
      optionalIndex?: number,
    ) => {
      const newColor = required
        ? adjustBrightness(thisDapp.color, -10)
        : adjustBrightness(thisDapp.color, -20);

      if (field.type === 'input') {
        return (
          <Lego
            title={field.title}
            key={field.key}
            titleInLeft
            zIndex={totalFields - zIndex - (optionalIndex ?? 0)}
            background={newColor}
          >
            <Input
              required={required}
              optionalIndex={optionalIndex}
              name={field.key}
              value={field.value as string}
              handleInputChange={handleInputChange}
            />
          </Lego>
        );
      }

      if (field.type === 'dropdown') {
        return (
          <Lego
            title={field.title}
            key={field.key}
            titleInLeft
            zIndex={totalFields - zIndex - (optionalIndex ?? 0)}
            background={newColor}
          >
            <Dropdown
              required={required}
              optionalIndex={optionalIndex}
              options={field.options || []}
              value={
                (field.options || []).find(
                  (o) => o.value === field.value,
                ) as FieldModel
              }
              handleOnClickOption={handleOnClickOnOption}
              name={field.key}
              background={newColor}
            />
          </Lego>
        );
      }

      return null;
    },
    [handleInputChange, handleOnClickOnOption],
  );

  const getExtendsType = React.useCallback(
    (
      zIndex: number,
      field: FieldModel,
      level: number,
      required: boolean,
      optionalIndex?: number,
    ) => {
      const isExtended = field.value === 1;

      const legoIfNotExtends = () => {
        return (
          <Lego
            title={field.title}
            key={field.key}
            titleInLeft
            zIndex={totalFields - zIndex - (optionalIndex ?? 0)}
          >
            <Dropdown
              required={required}
              optionalIndex={optionalIndex}
              options={yesNoOptions}
              value={
                yesNoOptions.find((o) => o.value === field.value) as FieldModel
              }
              handleOnClickOption={handleOnClickOnOption}
              name={field.key}
            />
          </Lego>
        );
      };

      const legoIfExtends = () => {
        return (
          <LegoParent
            title={field.title}
            key={field.key}
            zIndex={
              totalFields -
              zIndex -
              (optionalIndex ?? 0) -
              (field.options || []).length
            }
          >
            {(field.options || []).map((option, index) => {
              return getExtendsType(
                index,
                option,
                level + 1,
                required,
                optionalIndex,
              );
            })}
          </LegoParent>
        );
      };

      if (field.type === 'input') {
        return (
          <Lego title={field.title} key={field.key} titleInLeft>
            <Input
              required={required}
              optionalIndex={optionalIndex}
              name={field.key}
              value={field.value as string}
              handleInputChange={handleInputChange}
            />
          </Lego>
        );
      }

      if (field.type === 'dropdown') {
        return (
          <Lego title={field.title} key={field.key} titleInLeft>
            <Dropdown
              required={required}
              optionalIndex={optionalIndex}
              options={field.options || []}
              value={
                (field.options || []).find(
                  (o) => o.value === field.value,
                ) as FieldModel
              }
              handleOnClickOption={handleOnClickOnOption}
              name={field.key}
            />
          </Lego>
        );
      }

      return isExtended ? legoIfExtends() : legoIfNotExtends();
    },
    [handleInputChange, handleOnClickOnOption],
  );

  const addNewAllocation = React.useCallback(() => {
    const optionalFieldsClone = JSON.parse(
      JSON.stringify(thisDapp.optionalFields[0]),
    );
    optionalFieldsClone.fields = optionalFieldsClone.fields.map(
      (field: FieldModel) => {
        return {
          ...field,
          value: field.defaultValue,
        };
      },
    );

    setFormDapps({
      ...formDapps,
      [id]: {
        ...thisDapp,
        optionalFields: [...thisDapp.optionalFields, optionalFieldsClone],
      },
    });
  }, [formDapps, id, setFormDapps, thisDapp]);

  return (
    <LegoParent title={thisDapp.title} key={id} background={thisDapp.color}>
      {thisDapp.requiredFields.map((field, index) => {
        if (field.type !== 'extends') {
          return getCommonLego(index, field, true);
        } else {
          return getExtendsType(index, field, 0, true);
        }
      })}

      {thisDapp.optionalFields.map((optionalField, optionalIndex) => {
        return (
          <LegoParent
            title={optionalField.title}
            key={optionalField.key}
            background={adjustBrightness(thisDapp.color, -10)}
          >
            {optionalField.fields.map((field, index) => {
              if (field.type !== 'extends') {
                return getCommonLego(index, field, false, optionalIndex);
              } else {
                return getExtendsType(index, field, 0, false, optionalIndex);
              }
            })}
          </LegoParent>
        );
      })}

      <Lego
        title="Add New Allocation"
        titleInLeft
        onClick={() => addNewAllocation()}
        background={adjustBrightness(thisDapp.color, -20)}
      />
    </LegoParent>
  );
};

export default BaseDappLego;
