import s from './style.module.scss'
import React from 'react';

type TModuleArchitectureCardContent = {
  title: string;
  description: React.ReactNode;
}

const ModuleArchitectureCardContent = ({...props}: TModuleArchitectureCardContent) => {
  return <div className={s.wrapper}>
    <h3>{props.title}</h3>
    <div className={s.decs}>
      {
        props.description
      }
    </div>

  </div>
}

export default ModuleArchitectureCardContent;
