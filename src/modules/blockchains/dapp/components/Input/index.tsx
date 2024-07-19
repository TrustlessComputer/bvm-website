import React from 'react';

import styles from './styles.module.scss';
import useDappsStore, { useFormDappsStore } from '../../stores/useDappStore';

type Props = {
  required?: boolean;
  optionalIndex?: number;
  typeExtends?: {
    isExtended: boolean;
    level: number;
  };
  name: string;
  _key: string;
};

const Input = ({ required = false, optionalIndex, name, _key }: Props) => {
  const { formDapps, setFormDappsWithKey } = useFormDappsStore();
  const thisDapp = formDapps[_key];

  const handleInputChange = React.useCallback(
    (value: string) => {
      const newRequiredFields = JSON.parse(
        JSON.stringify(thisDapp.requiredFields),
      ) as FieldModel[];
      const newOptionalFields = JSON.parse(
        JSON.stringify(thisDapp.optionalFields),
      ) as { key: string; title: string; fields: FieldModel[] }[];

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

      setFormDappsWithKey(_key, {
        ...thisDapp,
        requiredFields: newRequiredFields,
        optionalFields: newOptionalFields,
      });
    },
    [thisDapp],
  );

  if (Object.keys(formDapps).length === 0 || !thisDapp) return null;

  console.log('__Input__', name);

  return (
    <input
      type="text"
      className={`${styles.input} `}
      // value={value}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

export default React.memo(Input);
