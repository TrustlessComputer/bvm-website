import cn from 'classnames';
import s from './styles.module.scss';

type TCardLearn = {
  title: string;
  decs: string;
  isLast: boolean;
};

export default function CardLearn({ decs, title, isLast }: TCardLearn) {
  return (
    <div className={cn(s.wrapper, isLast && s.wrapper_last)}>
      <div className={cn(s.inner, isLast && s.inner_last)}>
        <h3 className={s.inner_title}>{title}</h3>
        <p className={s.inner_decs}>{decs}</p>
      </div>
    </div>
  );
}
