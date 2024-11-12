import SvgInset from '@/components/SvgInset';
import useWindowSize from '@/hooks/useWindowSize';
import s from './styles.module.scss';

type TItemTool = {
  step: string;
  title: string;
  description: string;
  index: number;
  length: number;
};

export default function ItemTool({
  data,
  delay,
}: {
  data: TItemTool;
  delay: number;
}) {
  const isFrist = data.index === 0;
  const isLast = data.index === data.length;
  const { mobileScreen, tabletScreen } = useWindowSize();

  const svgUrl = isFrist
    ? '/landing/svg/frame_tool_fill.svg'
    : '/landing/svg/frame_tool_mid.svg';

  return (
    <div className={s.itemTool}>
      <div className={s.itemTool_step}>
        {!mobileScreen && !tabletScreen && <SvgInset svgUrl={svgUrl} />}
        {!isLast && <span className={s.itemTool_step_stud}></span>}
        <p className={s.itemTool_step_text}>{data.step}</p>
      </div>
      <div
        className={`${s.itemTool_content} ${
          data.index === 1 && s[`itemTool_content__midItem`]
        }`}
      >
        <div className={s.itemTool_content_inner}>
          <p className={s.itemTool_content_inner_title}>{data.title}</p>
          <p className={s.itemTool_content_inner_description}>
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
