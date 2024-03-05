import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';
import { IconHeading } from '../components/IconSvg';

export default function Heading() {
  return (
    <div className={s.heading}>
      <IconHeading />
    </div>
  );
}
