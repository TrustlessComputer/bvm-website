import LandingSection from './section';
import Animate from '@layouts/Animation';
import Footer from '@/modules/ai-landing/components/Footer';
import Loader from '@/modules/ai-landing/Loader';

export default function VisualLanding() {


  return (
    <Animate>
      <Loader />
      <LandingSection />
    </Animate>
  );
}
