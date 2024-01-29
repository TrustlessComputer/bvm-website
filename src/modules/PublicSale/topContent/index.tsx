import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import s from './styles.module.scss';
import React from 'react';
import DropDown from '@/components/DropList';
import { WHITEPAPER_DOC_URL } from '@/config';
import Image from 'next/image';

const TopContent = () => {
  const router = useRouter();

  return (
    <div className={s.container}>
      <Flex direction={'column'} gap={1}>
        <Text fontSize={44} fontWeight={400} lineHeight={44} className={s.title}>Welcome to the future of
          Bitcoin</Text>
        <Text fontSize={16} fontWeight={400} lineHeight={24} className={s.desc}>In this release, we shipped a
          full-featured EVM on Bitcoin. This is the first building block to make Bitcoin usable far more than just a
          currency because developers can now write smart contracts and build dapps for Bitcoin.</Text>
      </Flex>
      <ul className={s.actions}>
        <li>
          <a href={'#'}>Watch the film <Image src={`/public-sale/mdi_play.svg`} width={10} height={10}
                                              alt={'right'} /></a>
        </li>
        <li>
          <DropDown title={'Learn more'} lists={[
            {
              link: 'https://bvm.network/onepager.pdf',
              title: 'Onepager',
            },
            {
              link: 'https://bvm.network/deck.pdf',
              title: 'Deck',
            },
            {
              link: WHITEPAPER_DOC_URL,
              title: 'Whitepaper',
            },
          ]} />
        </li>
      </ul>
    </div>
  );
};

export default TopContent;
