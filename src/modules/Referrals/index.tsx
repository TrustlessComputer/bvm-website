'use client';

import { openModal } from '@/stores/states/modal/reducer';
import {
  Box,
  Flex,
  GridItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnterRefferal from './EnterRefferal';
import s from './styles.module.scss';
import ReferralModal, { ReferralModalID } from './ReferralModal';
import copy from 'copy-to-clipboard';
import ListReferred from './ListReferred';
import ButtonConnected from '@/components/ButtonConnected/v2';
import { isDesktop } from 'react-device-detect';
import { userSelector } from '@/stores/states/user/selector';

const RefferalsScreen: React.FC = (): React.ReactElement => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const timerRef = useRef<any>();

  console.log('userRefInfo', user);

  const closeModal = () => {
    if(timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onClose();
    }, 1000);
  }

  const onClickEditRefCode = () => {
    dispatch(
      openModal({
        id: ReferralModalID,
        title: `${user?.referral_code ? 'Edit' : 'Create'} Referral Code`,
        className: s.modalContent,
        modalProps: {
          size: 'lg',
        },
        render: <ReferralModal />,
      }),
    );
  };

  const onClickCopyReferralCode = () => {
    if (!user) return;
    const origin = window.location.origin;
    const refUrl = origin + `?ref=${user.referral_code}`;
    copy(refUrl);
    closeModal();
  };

  const onClickShareReferralCode = () => {
    if (!user) return;
    const origin = window.location.origin;
    const refUrl = origin + `?ref=${user.referral_code}`;

    const content = `Just discovered @RuneChain_L2 where you can:

- Trade unlimited Bitcoin
- Permissionless
- You and I both earn a 10% discount on trading fees

Join now: ${refUrl}`;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.boxInfo}>
          <p className={s.title}>REFERRALS</p>
          <p className={s.desc}>
            Refer Friends. Trade Unlimited Bitcoin Permissionlessly. Earn Crypto Together.<br/>
            You and your friend each earn a <span>10% commission</span> on every trade on Runechain.
          </p>

          <SimpleGrid gridTemplateColumns={["1fr", "repeat(3, 1fr)"]} rowGap={["8px", "0"]} columnGap={["0", "28px"]} mt={"24px"}>
            <GridItem colSpan={2}>
              <Box p={"4px"} borderRadius={"8px"} bg={"#FFFFFF1A"}>
                <Flex
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems='center'
                  gap="6px"
                  borderRadius={"4px"}
                  border={"1px solid #FFFFFF4D"}
                  p={"10px 16px"}
                >
                  {isDesktop && <div />}
                  <Flex alignItems={"center"} gap={"10px"}>
                    <Text className={s.code}>YOUR REFERRAL CODE: <span>{user?.referral_code}</span></Text>
                    {
                      user?.referral_code && (
                        <Popover
                          isOpen={isOpen}
                          onOpen={onOpen}
                          // onClose={onClose}
                          placement='top'
                          closeOnBlur={false}
                          returnFocusOnClose={false}
                        >
                          <PopoverTrigger>
                            <div
                              onClick={onClickCopyReferralCode}
                              // className={s.container}
                            >
                              <img className={s.btnCp} src={`/icons/ic-copy.svg`} alt="ic-copy" onClick={onClickCopyReferralCode} />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent p={"8px 12px"} w={"fit-content"}>
                            <Text>Copied</Text>
                          </PopoverContent>
                        </Popover>
                      )
                    }
                  </Flex>
                  <Text className={s.btnEdit} onClick={onClickEditRefCode}>Edit</Text>
                </Flex>
              </Box>
            </GridItem>
            <GridItem>
              <ButtonConnected>
                <div className={s.containerWallet} onClick={onClickShareReferralCode}>
                  <p>SHARE ON</p>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1007 0.768997H15.554L10.194 6.89566L16.5 15.231H11.5627L7.696 10.175L3.27067 15.231H0.816L6.54933 8.67766L0.5 0.769664H5.56267L9.058 5.391L13.1007 0.768997ZM12.24 13.763H13.5993L4.824 2.16033H3.36533L12.24 13.763Z" fill="black"/>
                  </svg>
                </div>
              </ButtonConnected>
            </GridItem>
          </SimpleGrid>
          <EnterRefferal userRefInfo={user} />
        </div>

        {/*<Flex direction="row" alignItems='center' gap="8px" mt="4px">
          <Text className={s.code}>Active referral code: <span>{userRefInfo?.referrer_code}</span></Text>
          <img className={s.btnEdit} src={`/icons/ic_edit.svg`} alt="ic-edit" onClick={onClickEditActiveRefCode} />
        </Flex>*/}

        <div className={s.boxInfo}>
          <ListReferred />
        </div>
      </div>
    </div>
  );
};

export default RefferalsScreen;
