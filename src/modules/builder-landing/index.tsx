import s from './styles.module.scss';
import BuilderHero from '@/modules/builder-landing/Hero';
import Loader from '@/modules/builder-landing/Loader';
import Started from '@/modules/builder-landing/Started';
import BuilderVideo from '@/modules/builder-landing/VideoSection';
import Footer from '@/modules/builder-landing/Footer';
import Airdrop from '@/modules/builder-landing/Airdrop';

export default function BuilderLading() {


  return <div className={s.builderLading}>
    <Loader />
    <BuilderHero />
    <BuilderVideo />
    <Airdrop />
    <Started />
    <Footer />
  </div>;
}
