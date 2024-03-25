import React from 'react';
import s from '../styles.module.scss';
import SvgInset from '@/components/SvgInset';

type IModuleItem = {
  logoUrl: string;
  title: string;
};

const ModuleItem = ({ logoUrl, title }: IModuleItem) => {
  return (
    <div className={s.moduleItem}>
      <SvgInset svgUrl={logoUrl} />
      <p className={s.title}>{title}</p>
    </div>
  );
};

export default ModuleItem;
