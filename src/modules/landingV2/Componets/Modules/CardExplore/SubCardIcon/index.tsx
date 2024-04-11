import SvgInset from '@/components/SvgInset';
import SubTag, { TSubTag } from '../SubTag';
import s from './styles.module.scss';

type TSubCardIcon = {
  icon: string;
  title: string;
  decs: string;
  tags: TSubTag;
};
export default function SubCardIcon({ decs, icon, title, tags }: TSubCardIcon) {
  return (
    <div className={s.botSection}>
      <div className={s.botSection_left}>
        <img src={icon} className={s.botSection_left_icon} />
      </div>
      <div className={s.botSection_right}>
        <div className={s.botSection_right_inner}>
          <h3 className={s.botSection_right_inner_title_text}>{title}</h3>
          {/* <img
              alt="icon"
              src={icon}
              className={s.botSection_right_inner_title_icon}
            /> */}
          <p className={s.botSection_right_inner_decs}>{decs}</p>
          <div className={s.botSection_right_inner_tags}>
            <SubTag tags={tags} type="modules" />
            <span className={s.botSection_button}>
              <p>Learn more</p>
              <SvgInset svgUrl="/landing-v2/svg/arrow-r-v2.svg" size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
