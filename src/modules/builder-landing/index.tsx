import s from './styles.module.scss';
import BuilderHero from '@/modules/builder-landing/Hero';
import Loader from '@/modules/builder-landing/Loader';
import Started from '@/modules/builder-landing/Started';

export default function BuilderLading(){

  return <div className={s.builderLading}>
    <Loader />
    <BuilderHero />
    <Started />
  </div>
}
