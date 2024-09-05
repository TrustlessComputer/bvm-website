import React from 'react';
import styles from './styles.module.scss';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type Props = {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
};

const SelectPromptInput = ({ label, icon, isActive, onClick }: Props) => {
  return (
    <div className={styles.input}>
      <ImagePlaceholder src={icon} alt={label} width={16} height={16} />
      <span>{label}</span>
    </div>
  );
};

export default SelectPromptInput;
