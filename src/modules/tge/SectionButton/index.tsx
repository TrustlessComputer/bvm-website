import ItemSectionButton from './ItemSectionButton';
import s from './styles.module.scss';

const DATA_BTN = [
  {
    number: 1,
    title: 'CLAIM',
    desc: (
      <>
        You can now claim your $BVM tokens <br/> on Naka, <b>the first DeFi Bitcoin L2</b> <br/> powered by BVM.
      </>
    ),
    btnTitle: 'Claim',
    link: 'https://nakachain.xyz/bvm-claim'
  },
  {
    number: 2,
    title: 'STAKE',
    desc: (
      <>
        Earn up to <b>58% APY</b> on your BVM and <br/> receive airdrops from upcoming Bitcoin <br/> L2 projects.
      </>
    ),
    btnTitle: 'Stake',
    link: 'https://nakachain.xyz/staking'
  },
  {
    number: 3,
    title: 'LAUNCHPAD',
    desc: (
      <>
        BVM stakers will earn tickets to <br/> participate in the $NAKA launchpad at <br/> <b>$1M FDV.</b>
      </>
    ),
    btnTitle: 'Launchpad',
    link: 'https://nakachain.xyz/launchpad/detail/1'
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
