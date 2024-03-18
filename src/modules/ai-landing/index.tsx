import LandingSection from './section';
import Animate from '@layouts/Animation';
import PreLoader from '@/modules/ai-landing/PreLoader';
import Footer from '@/modules/ai-landing/components/Footer';

export default function VisualLanding() {


  return (
    <>
      <Animate>
        <PreLoader />
        <LandingSection />
      </Animate>
      <Footer/>
    </>
  );
}
