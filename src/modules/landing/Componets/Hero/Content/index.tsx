import BorderLine from '@/interactive/BorderLine';
import Lines from '@/interactive/Lines';
import s from './styles.module.scss';

export default function HeroContent() {
  return (
    <div className={s.heroContent}>
      <div className={s.heroContent_inner}>
        <Lines delay={0.2}>
          BVM is the first modular blockchain metaprotocol that lets anyone
          launch their own Bitcoin L2 blockchain in a few clicks.
        </Lines>
      </div>
      <BorderLine delay={0.2} />
    </div>
  );
}
