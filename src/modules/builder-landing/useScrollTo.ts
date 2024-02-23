import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);
export default function useScrollTo() {

  const scrollTo = () => {
    gsap.to(window, { scrollTo: {y: '#read-doc'}, ease: 'power3.inOut', duration: 1.5 });
  };

  return {
    scrollTo,
  };
}
