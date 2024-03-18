'use client';

import Button from '../Button';
import HomeContainer from '../HomeContainer';
import ImagePlaceholder from '@components/ImagePlaceholder';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  return (
    <div className={`${s.footer}`}>
      <div style={{ backgroundImage: `url: (/ai-landing/bgFooter.png)` }}>
        <HomeContainer>
          <div className={`${s.mainContent}`}>
            <ImagePlaceholder
              src={'/ai-landing/logoFooter.png'}
              alt={'logoFooter'}
              width={15}
              height={15}
              className={`${s.logo}`}
            />
            <p className={`${s.title}`}>ETERNAL AI</p>
            <p className={`${s.description}`}>
              Eternal AI is a Bitcoin L2 powering programmable and composable
              real-life AI models on Bitcoin
            </p>
            <div className={`${s.wrapperBtn}`}>
              <Button isWhite onClick={()=>{
                router.push('/build')
                // window.open('https://nakachain.xyz/launchpad')
              }} className={`${s.wrapperBtn_btn}`}>
                {/*Launchpad*/}
                Build AI
              </Button>
              <Button onClick={()=>{
                router.push('/use')
              }} className={`${s.wrapperBtn_btn}`}>
                Use AI
                {/*Give it a try*/}
              </Button>
            </div>
          </div>
        </HomeContainer>
      </div>
    </div>
  );
};

export default Footer;
