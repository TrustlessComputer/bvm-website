import { generateTOkenWithSecretCode } from '@/services/public-sale';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import DepositContent from '../depositModal/deposit.content';
import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import AuthenStorage from '@/utils/storage/authen.storage';
import { useDispatch } from 'react-redux';
import { setGuestSecretCode } from '@/stores/states/user/reducer';

export const SECRET_CODE_GUEST = 'SECRET_CODE_GUEST';
export const BARER_TOKEN_GUEST = 'BARER_TOKEN_GUEST';

const BuyAsGuest = () => {
  const dispatch = useDispatch();
  const getSecretCode = AuthenStorage.getGuestSecretKey();

  const [loading, setLoading] = useState(!Boolean(getSecretCode));
  const [secretCode, setSecretCode] = useState(getSecretCode);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSumitForm = useCallback(() => {
    try {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
      if (!getSecretCode) {
        executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
          console.log(gReCaptchaToken, 'response Google reCaptcha server');
          getToken(gReCaptchaToken);
        });
      }
    } catch (error) {}
  }, [executeRecaptcha, secretCode, getSecretCode]);

  const getToken = async (captcha: string) => {
    try {
      setLoading(true);
      if (secretCode) {
        return;
      }
      const _secretCode = ethers.Wallet.createRandom().privateKey.slice(0, 10);

      const rs = await generateTOkenWithSecretCode(_secretCode, captcha);
      AuthenStorage.setGuestSecretKey(_secretCode);
      AuthenStorage.setGuestAuthenKey(rs?.token);
      setSecretCode(_secretCode);
      dispatch(setGuestSecretCode(_secretCode));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSumitForm();
  }, [executeRecaptcha]);

  if (loading) {
    return (
      <Center flexDirection={'column'}>
        <Spinner />
        <Text>Generating secret code for you</Text>
      </Center>
    );
  }

  if (!secretCode) {
    return (
      <Center flexDirection={'column'}>
        <Text>Generating secret code fail</Text>
        <Button onClick={handleSumitForm}>Generate now</Button>
      </Center>
    );
  }

  return (
    <>
      <Flex className={s.wrapSecretKey}>
        <Text>Your secret key. Backup now</Text>
        <Flex
          className={s.backupNow}
          onClick={() => {
            toast.success('Secret copied. Backup now');
            copy(secretCode);
          }}
        >
          <Flex alignItems={'center'} gap={'8px'}>
            <SvgInset size={16} svgUrl="/icons/ic_wallet.svg" />
            <Text>{secretCode}</Text>
          </Flex>
          <SvgInset size={20} svgUrl="/icons/ic-copy.svg" />
        </Flex>
      </Flex>
      <Box mt={'32px'} />
      <DepositContent />
    </>
  );
};

export default BuyAsGuest;
