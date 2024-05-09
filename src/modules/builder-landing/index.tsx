import s from './styles.module.scss';
import BuilderHero from '@/modules/builder-landing/Hero';
import Loader from '@/modules/builder-landing/Loader';
import Started from '@/modules/builder-landing/Started';
import BuilderVideo from '@/modules/builder-landing/VideoSection';
import Categories from './Categories';
import Footer from '@/modules/builder-landing/Footer';
import Airdrop from '@/modules/builder-landing/Airdrop';
import Connect from './Connect';
import Header from '@/layouts/Header';

export default function BuilderLading() {
  return (
    <div className={s.builderLading}>
      <Header />
      <Loader />
      <BuilderHero />
      {/*<BuilderVideo />*/}
      {/*Component 1M $BVM*/}
      <Airdrop />

      <Connect />
      <Started />
      <Categories />
      {/* <Footer /> */}
    </div>
  );
}
