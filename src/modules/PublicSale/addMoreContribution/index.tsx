import s from './styles.module.scss';
import { Divider, Flex, Text } from '@chakra-ui/react';
import cx from 'clsx';
import DepositModal from '@/modules/PublicSale/depositModal';
import React, { useState } from 'react';
import { getLink } from '@/utils/helpers';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';

const AMOUNTS = [
  {key: 0, title: '$1,000', value: 1000},
  {key: 1, title: '$2,000', value: 2000},
  {key: 2, title: '$5,000', value: 5000},
  {key: 3, title: '$10,000', value: 10000},
  {key: 4, title: '$20,000', value: 20000},
]

const AddMoreContribution = () => {
  const [showQrCode, setShowQrCode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<any>();
  const user = useAppSelector(userSelector);

  const handleShareTw = () => {
    const shareUrl = getLink(user?.referral_code || '');

    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon\n\nJoin the allowlist`;
    const url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`;

    window.open(url, '_blank');
  }

  return (
    <Flex className={s.container} direction={["column", "row"]}>
      <Flex
        p={[4, 5]}
        alignItems={"center"}
        w={"100%"}
        justifyContent={"space-between"}
        direction={["column", "row"]}
        gap={6}
      >
        <Text fontSize={'14px'} casing={'uppercase'} fontWeight={500} color={'#FFFFFF'}>
          Add more contributors
        </Text>
        <Flex gap={2} justifyContent={"space-between"} flexWrap={["wrap", "nowrap"]}>
          {
            AMOUNTS.map(d => {
              return (
                <Flex
                  flex={1}
                  justifyContent={'center'}
                  alignItems={"center"}
                  className={cx(s.item)}
                  onClick={() => {
                    setSelectedAmount(d);
                    setShowQrCode(true);
                  }}
                  cursor={"pointer"}
                >
                  {d?.title}
                </Flex>
              )
            })
          }
        </Flex>
      </Flex>
      <Divider orientation={'vertical'} borderColor={'rgba(255, 255, 255, .3)'}/>
      <Flex p={[4, 5]} alignItems={'center'} justifyContent={"center"}>
        <Flex className={s.learnMoreWrapper} gap={3} onClick={handleShareTw}>
          <Text whiteSpace={"nowrap"} lineHeight={"100%"}>Share on</Text>
          <span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_29786_7178)">
                <path d="M12.6007 0.769531H15.054L9.694 6.8962L16 15.2315H11.0627L7.196 10.1755L2.77067 15.2315H0.316L6.04933 8.6782L0 0.770198H5.06267L8.558 5.39153L12.6007 0.769531ZM11.74 13.7635H13.0993L4.324 2.16086H2.86533L11.74 13.7635Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_29786_7178">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            </span>
        </Flex>
      </Flex>
      <DepositModal
        isShow={showQrCode}
        onHide={() => setShowQrCode(false)}
        payAmountUsd={selectedAmount?.value}
      />
    </Flex>
  )
};

export default AddMoreContribution;
