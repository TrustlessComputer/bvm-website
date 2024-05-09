import s from './styles.module.scss';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import Scale from '@/interactive/Scale';
import Lines from '@/interactive/Lines';
import HeadingSection from '../HeadingSection';
import Chars from '@/interactive/Chars';
import ContentSection from '@/modules/landing/Componets/ContentSection';

type TBitEthProps = {
  headings?: string;
  description?: string;
  textBtn?: string;
  btnLink?: string;
  isHidenBtn?: boolean;
};

export default function BitEth({ ...props }: TBitEthProps) {
  const router = useRouter();
  const { mobileScreen } = useWindowSize();

  return (
    <div className={s.bitEth}>
      <div className={`${s.bitEth_inner} container`}>
        <div className={s.bitEth_content}>
          <Scale>
            <Image
              className={s.thumb}
              quality={100}
              src={'/landing/biteth.png'}
              alt={'biteth.svg'}
              width={251}
              height={80}
              loading={'eager'}
            />
          </Scale>
          <HeadingSection className={s.heading}>
            <Chars delay={0.2}>
              {/*<b>Minimal effort </b>to migrate from Ethereum to Bitcoin.*/}
              {props.headings ? (
                props.headings
              ) : (
                <>
                  <b>Minimal effort </b>to migrate from Ethereum to Bitcoin.
                </>
              )}
            </Chars>
          </HeadingSection>
          <ContentSection className={s.content}>
            <Lines delay={0.3}>
              {props.description ? (
                props.description
              ) : (
                <>
                  BVM is EVM equivalent. It allows Ethereum developers to
                  migrate their Solidity smart contracts and dapps from Ethereum
                  to Bitcoin with minimal or no modifications.
                </>
              )}
            </Lines>
          </ContentSection>
          <div className={s.actions}>
            {!props.isHidenBtn && (
              <Fade delay={0.5}>
                <Button
                  bgColor={'#FFFFFF1A'}
                  color={'#fff'}
                  borderRadius={0}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  px={'24px'}
                  py={'10px'}
                  minW={['180px']}
                  width={mobileScreen ? '100%' : ''}
                  height={'48px'}
                  fontWeight={400}
                  fontSize={'16px'}
                  _hover={{
                    bgColor: '#FFFFFF2A',
                  }}
                  onClick={() => {
                    window.open(
                      props.btnLink || 'https://docs.bvm.network',
                      '_blank',
                    );
                    // router.push('/blockchains/customize');
                  }}
                >
                  {props.textBtn ? props.textBtn : `Read developer docs`}
                  {/*{`Read developer docs`}*/}
                </Button>
              </Fade>
            )}
            <Fade delay={0.75}>
              <Button
                bgColor={'#FA4E0E'}
                color={'#fff'}
                borderRadius={0}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                px={'24px'}
                py={'10px'}
                minW={['180px']}
                width={mobileScreen ? '100%' : ''}
                height={'48px'}
                fontWeight={400}
                fontSize={'16px'}
                _hover={{
                  bgColor: '#e5601b',
                }}
                onClick={() => {
                  window.open('/bvm');
                  // router.push('/blockchains/customize');
                }}
              >
                {props.textBtn ? props.textBtn : `Launch Bitcoin L2 Now`}
                {/*{`Read developer docs`}*/}
              </Button>
            </Fade>
          </div>
        </div>
        <Scale>
          <Image
            className={s.full}
            src={'/landing/carbon.jpg'}
            alt={'carbon'}
            width={1600}
            height={570}
          />
        </Scale>
      </div>
    </div>
  );
}
