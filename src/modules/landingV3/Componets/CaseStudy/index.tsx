import s from './styles.module.scss'
import Link from 'next/link';

export default function CaseStudy() {
  return <div className={'containerV3'}>
    <div className={s.inner}>
      <p className={s.tag}>Case Study</p>
      <div className={s.inner_img}>
        <img src="/trump.png" alt="Case Study" />
      </div>
      <div className={s.caseStudy}>
        <p className={s.caseStudy_title}>BITCOIN WARS</p>
        <p  className={s.caseStudy_description}>The first fully on-chain game built on a ZK Rollup on the Bitcoin network.</p>
      </div>
      <div className={s.caseStudy_button}>
        <Link href="/bitcoinwars">Play Now</Link>
      </div>
    </div>
  </div>
}

