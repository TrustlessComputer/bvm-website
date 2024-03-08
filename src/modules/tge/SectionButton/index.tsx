import ItemSectionButton from './ItemSectionButton';
import s from './styles.module.scss';

const DATA_BTN = [
  {
    number: 1,
    title: 'CLAIM',
    desc: (
      <>
        If you participate in the BVM public sale, you <br /> can now claim your
        BVM.
      </>
    ),
    btnTitle: 'Claim',
    link: 'https://nakachain.xyz/bvm-claim',
  },
  {
    number: 2,
    title: 'BUY',
    desc: (
      <>
        The easiest way is to buy BVM on Naka, a <br />
        Bitcoin L2 for DeFi on Bitcoin.
      </>
    ),
    btnTitle: 'Buy',
    link: 'https://nakachain.xyz/market',
  },
  {
    number: 3,
    title: 'STAKE',
    desc: (
      <>
        Earn up to <b>58% APY</b> on your BVM and receive <br />
        airdrops from upcoming Bitcoin L2 projects.
      </>
    ),
    btnTitle: 'STAKE',
    link: 'https://nakachain.xyz/staking',
  },
];
export type TButtonTGE = (typeof DATA_BTN)[number];

export default function SectionButton() {
  return (
    <div className={s.sectionBtn}>
      {DATA_BTN.map((item, index) => {
        return (
          <ItemSectionButton
            delay={0.2 + index / 5}
            key={item.number}
            data={item}
            isLast={index === 2}
          />
        );
      })}
    </div>
  );
}
