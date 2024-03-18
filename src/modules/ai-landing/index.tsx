import LandingSection from './section';
import Animate from '@layouts/Animation';
import PreLoader from '@/modules/ai-landing/PreLoader';

export default function VisualLanding() {


  return (
    <Animate>
      <PreLoader />
      <LandingSection />
    </Animate>
  );
}
