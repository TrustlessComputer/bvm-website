import React from 'react';

import styles from './styles.module.scss';

type Props = {
  required?: boolean;
  optionalIndex?: number;
  typeExtends?: {
    isExtended: boolean;
    level: number;
  };
  name: string;
  value: string;
  handleInputChange: (
    name: string,
    value: string,
    required: boolean,
    optionalIndex?: number,
    typeExtends?: {
      isExtended: boolean;
      level: number;
    },
  ) => void;
};

const Input = ({
  required = false,
  optionalIndex,
  name,
  value,
  handleInputChange,
}: Props) => {
  return (
    <input
      type="text"
      className={`${styles.input} `}
      value={value}
      onChange={(e) =>
        handleInputChange(name, e.target.value, required, optionalIndex)
      }
    />
  );
};

export default React.memo(Input);
