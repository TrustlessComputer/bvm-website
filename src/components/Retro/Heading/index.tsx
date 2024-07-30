import { PropsWithChildren, ReactNode } from 'react';
import s from './styles.module.scss';


interface IRetroHeadingProps extends PropsWithChildren{
  color?: 'white' | 'black';
  className?: string
}

export default function RetroHeading({ children, color = 'white', className }: IRetroHeadingProps) {
  return <h2 className={` retroHeading ${s.heading} ${s[color]} ${className}`}>{children}</h2>;
}
