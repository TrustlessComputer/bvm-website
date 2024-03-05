import ItemSectionButton from './ItemSectionButton';
import s from './styles.module.scss';

const DATA_BTN = [
  {
    number: 1,
    title: 'Claim',
    desc: (
      <>
        The future of Bitcoin starts here! $BVM will be available for trading on{' '}
        <b>Mar 12th</b>
      </>
    ),
    btnTitle: 'Claim',
  },
  {
    number: 2,
    title: 'Stake',
    desc: (
      <>
        Earn up to<b> 50% APR </b> and airdrops from Bitcoin L2 projects
      </>
    ),
    btnTitle: 'Stake',
  },
  {
    number: 3,
    title: 'Launchpad',
    desc: (
      <>
        $BVM stakers will earn tickets to join $NAKA launchpad at <b>$1M FDV</b>
      </>
    ),
    btnTitle: 'Launchpad',
  },
];
export type TButtonTGE = (typeof DATA_BTN)[number];

export default function SectionButton() {
  return (
    <div className={s.sectionBtn}>
      {DATA_BTN.map((item, index) => {
        return (
          <ItemSectionButton delay={(.2 + index / 5)} key={item.number} data={item} />
        );
      })}
    </div>
  );
}
