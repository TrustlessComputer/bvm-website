import React from 'react';

import styles from './styles.module.scss';

type Props = {
  value: string;
  handleInputChange: (value: string) => void;
};

const Input = ({ value, handleInputChange }: Props) => {
  return (
    <input
      type="text"
      className={`${styles.input} `}
      value={value}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

export default React.memo(Input);
