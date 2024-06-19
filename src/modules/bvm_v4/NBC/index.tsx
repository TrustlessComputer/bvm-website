import React from 'react';
import s from './styles.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';
import { Button } from '@chakra-ui/react';


const NBC = (): React.JSX.Element => {
  return <div className={s.wrapper}>
    <div className={s.left}>
      <div className={s.left_inner}>
        <p className={s.heading}>A historical symbol of New Bitcoin City.</p>
        <div className={s.content}>
          <p className={s.content_text}>
            Welcome to New Bitcoin City. It is a radically new way to explore Bitcoin — more than just a currency.
          </p>
          <br />
          <p className={s.content_text}>
            New Bitcoin City is a diverse corner of web3. All neighborhoods are unique. <a
            href="https://generative.xyz/">Generative Village</a> has some of the most unique crypto art. <a
            href="https://newbitcoindex.com/" target={'_blank'}>DeFi District</a> powers decentralized finance. <a
            href="https://generative.xyz/ai">Perceptrons Square</a> is known for on-chain AI. <a
            href="https://generative.xyz/metaverse" target={'_blank'}>Fantasy Land</a> is an autonomous, self-evolving
            metaverse.
          </p>
          <br />
          <p className={s.content_text}>
            New Bitcoin City is powered by <a href="https://newbitcoincity.com/tc" target={'_blank'}>Trustless
            Computer</a> protocol. Trustless Computer lets developers write smart contracts on Bitcoin. Now you can
            build dapps on Bitcoin.
          </p>
          <br />
          <p className={s.content_text}>
            GM is the first smart contract ever deployed on New Bitcoin City.
          </p>
        </div>
        <div className={s.wrapper_btn}>
          <Button
            color={'#1588FF'}
            borderColor={'#1588FF'}
            border={'1px'}
            borderRadius={'40px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            py={'24px'}
            width={{base: '100%' ,lg: '314px'}}
            height={'74px'}
            fontWeight={500}
            fontSize={'18px'}
            onClick={() => {
              window.open('');
            }}
          >
            Visit New Bitcoin City
          </Button>
          <Button
            color={'#1588FF'}
            borderColor={'#1588FF'}
            border={'1px'}
            borderRadius={'40px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            py={'24px'}
            width={{base: '100%' ,lg: '314px'}}
            height={'74px'}
            fontWeight={500}
            fontSize={'18px'}
            onClick={() => {
              window.open('');
            }}
          >
            Build with Trustless Computer
          </Button>
        </div>
      </div>
    </div>
    <div className={s.right}>
      <ImagePlaceholder src={'/NBC.png'} alt={'NBC'} width={660} height={600} className={s.right_img} />
    </div>
  </div>
}

export default NBC
