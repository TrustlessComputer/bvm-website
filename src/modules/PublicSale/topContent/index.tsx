import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import s from './styles.module.scss';
import React, { useState } from 'react';
import DropDown from '@/components/DropList';
import { WHITEPAPER_DOC_URL } from '@/config';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';
import { getPublicSaleSummary } from '@/services/public-sale';
import { getTopLeaderBoards } from '@/services/whitelist';
import { formatCurrency } from '@/utils/format';

const TopContent = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [totalUser, setTotalUser] = useState<string>('');
  const [totalDeposit, setTotalDeposit] = useState('');

  const getCount = async () => {
    try {
      const response = await getPublicSaleSummary();
      setTotalUser(response.total_user.toString());
      setTotalDeposit(response.total_usdt_value_not_boost.toString())
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getCount();
    setInterval(() => {

    }, 10000)
  }, []);

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Flex direction={'column'} gap={3}>
          <Text fontSize={"16px"} fontWeight={400} lineHeight={'24px'} className={s.subTitle}>
            Bitcoin Virtual Machine
          </Text>
          <Text className={s.title}>Bitcoin, reimagined.</Text>
          <Text fontSize={16} fontWeight={400} lineHeight={'24px'} className={s.desc}>We’re on a mission to reinvent Bitcoin beyond just a currency — the next internet with gaming, DeFi, AI, SocialFi, and more. Join <strong>{formatCurrency(totalUser || 800, 0, 0)} backers</strong> shaping the future of Bitcoin.</Text>
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
