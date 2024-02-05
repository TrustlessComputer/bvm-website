import BaseModal from '@/components/BaseModal';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import cs from 'classnames';
import React, { PropsWithChildren, useMemo, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import DepositContent from '../depositModal/deposit.content';
import s from './styles.module.scss';
import AuthForBuyV2 from '../AuthForBuyV2';
import { commonSelector } from '@/stores/states/common/selector';

interface IAuthForBuy extends PropsWithChildren {
  hideBuyAndStake?: boolean;
}

const AuthForBuy: React.FC<IAuthForBuy> = ({hideBuyAndStake}) => {
  const user = useAppSelector(userSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasStaked, setHasStaked] = useState(false);
  const { userContributeInfo } = useAppSelector(commonSelector);
  const [isBanned, setIsBanned] = useState(false);

  const isSigned = useMemo(() => {
    if (user?.guest_code || user?.twitter_id) {
      return true;
    }
    return false;
  }, [user]);

  const textAction = useMemo(() => {
    if(Number(userContributeInfo?.usdt_value) > 0) {
      return 'Contribute more';
    }

    return 'Back our mission';
  }, [userContributeInfo?.usdt_value]);

  return (
    <>
      <Flex className={s.btnWrapper}>
        <AuthForBuyV2
          renderWithoutLogin={(onClick: any) => (
            <Button onClick={onClick} type="button" className={s.btnContainer}>
              {textAction}
            </Button>
          )}
        >
          <Button
            onClick={() => {
              setHasStaked(false);
              onOpen();
            }}
            type="button"
            className={s.btnContainer}
          >
            {textAction}
          </Button>
        </AuthForBuyV2>
        {/*{*/}
        {/*  !hideBuyAndStake && (*/}
        {/*    <AuthForBuyV2>*/}
        {/*      <Tooltip*/}
        {/*        minW="220px"*/}
        {/*        bg="#006149"*/}
        {/*        boxShadow="0px 0px 40px rgba(0, 0, 0, 0.12)"*/}
        {/*        borderRadius="4px"*/}
        {/*        padding="16px"*/}
        {/*        hasArrow*/}
        {/*        label={*/}
        {/*          'Buy and stake your $BVM to earn rewards from the BVM ecosystem and our collaborative Bitcoin L2s and dApps partners. Your $BVM will be automatically staked after the public sale, and you can choose to unstake at any time.'*/}
        {/*        }*/}
        {/*        color={'#FFFFFF'}*/}
        {/*      >*/}
        {/*        <Button*/}
        {/*          onClick={() => {*/}
        {/*            setHasStaked(true);*/}
        {/*            onOpen();*/}
        {/*          }}*/}
        {/*          type="button"*/}
        {/*          className={cx(s.btnContainer, s.btnBuyAndStake)}*/}
        {/*        >*/}
        {/*          Buy & Stake $BVM*/}
        {/*        </Button>*/}
        {/*      </Tooltip>*/}
        {/*    </AuthForBuyV2>*/}
        {/*  )*/}
        {/*}*/}
      </Flex>
      <GoogleReCaptchaProvider
        reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <BaseModal
          isShow={isOpen}
          onHide={onClose}
          title={isSigned ? 'Buy $BVM' : 'Buy $BVM'}
          headerClassName={s.modalHeader}
          className={cs(s.modalContent, isSigned ? s.deposit : s.notSignModal, { [s.banned]: isBanned })}
          // size={modalSize}
        >
          <DepositContent hasStaked={hasStaked} setBanned={setIsBanned} />

          {/* {isSigned ? (
          <>
            <DepositContent />
          </>
        ) : (
          <>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'16px'}
            >
              <GoogleReCaptchaProvider
                reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
                scriptProps={{
                  async: false,
                  defer: false,
                  appendTo: 'head',
                  nonce: undefined,
                }}
              >
                <BtnCreateGuest />
              </GoogleReCaptchaProvider>
              <Flex
                alignItems={'center'}
                gap={'12px'}
                justifyContent={'center'}
                width={'100%'}
                mt={'5px'}
              >
                <Text onClick={handleShareTw} className={s.link}>
                  Post to sign-in
                </Text>
                <Text fontSize={'12px'} opacity={0.7}>
                  Or
                </Text>
                <Text onClick={getTwitterOauthUrl} className={s.link}>
                  Authorize to sign-in
                </Text>
              </Flex>

              <Box />
            </Flex>
          </>
        )} */}
        </BaseModal>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default AuthForBuy;
