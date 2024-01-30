import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import s from './styles.module.scss';
import React, { useState } from 'react';
import DropDown from '@/components/DropList';
import { WHITEPAPER_DOC_URL } from '@/config';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';

const TopContent = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Flex direction={'column'} gap={3}>
          <Text fontSize={"16px"} fontWeight={400} lineHeight={'24px'} className={s.subTitle}>
            Bitcoin Virtual Machine
          </Text>
          <Text className={s.title}>Welcome to the future of Bitcoin</Text>
          <Text fontSize={16} fontWeight={400} lineHeight={'24px'} className={s.desc}>We’re on a mission to reinvent Bitcoin to make it work for everyone. Gear up, get ready, and join the ride!</Text>
        </Flex>
        <ul className={s.actions}>
          <li>
            <a href={'#'} onClick={() => setOpen(true)}>
              <Image src={`/public-sale/btn-play-3.png`} width={168} height={90}
                     alt={'right'} />
              What is BVM? </a>
            <ModalVideo
              channel="custom"
              url={'/public-sale/public_sale_video_2.mp4'}
              isOpen={isOpen}
              onClose={() => {
                setOpen(false);
              }}
            />
          </li>
          <li className={s.dropDownItem}>
            <DropDown lists={[
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
            ]}>
              <Image src={`/public-sale/btn-pdf.png`} width={168} height={90}
                     alt={'right'} />
              <span className={s.text}>Learn more</span>
            </DropDown>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopContent;
