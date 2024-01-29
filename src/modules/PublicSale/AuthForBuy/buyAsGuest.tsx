import SvgInset from '@/components/SvgInset';
import { generateTOkenWithSecretCode } from '@/services/public-sale';
import { setGuestSecretCode } from '@/stores/states/user/reducer';
import { generateRandomString } from '@/utils/encryption';
import AuthenStorage from '@/utils/storage/authen.storage';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import DepositContent from '../depositModal/deposit.content';
import s from './styles.module.scss';

export const SECRET_CODE_GUEST = 'SECRET_CODE_GUEST';
export const BARER_TOKEN_GUEST = 'BARER_TOKEN_GUEST';

const BuyAsGuest = () => {
  const dispatch = useDispatch();
  const getSecretCode = AuthenStorage.getGuestSecretKey();

  const [loading, setLoading] = useState(false);
  const [secretCode, setSecretCode] = useState(getSecretCode);
  const [isImport, setIsImport] = useState(false);
  const [importSecretKeyText, setImportSecretKeyText] = useState('');
  const [secretKeyError, setSecretKeyError] = useState('');

  const { executeRecaptcha } = useGoogleReCaptcha();

  const createNewSecretCode = useCallback(() => {
    try {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        throw Error('Execute recaptcha not yet available');
      }
      executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, 'response Google reCaptcha server');
        getToken(gReCaptchaToken);
      });
    } catch (error) {
      //
    }
  }, [executeRecaptcha]);

  const onImportSecretCode = useCallback(
    (code: string) => {
      try {
        if (!executeRecaptcha) {
          console.log('Execute recaptcha not yet available');
          throw Error('Execute recaptcha not yet available');
        }
        executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
          console.log(gReCaptchaToken, 'response Google reCaptcha server');
          getToken(gReCaptchaToken, code);
        });
      } catch (error) {
        //
      }
    },
    [executeRecaptcha],
  );

  const getToken = async (captcha: string, code?: string) => {
    try {
      setLoading(true);
      if (secretCode) {
        return;
      }
      const _secretCode = code || generateRandomString(10);

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

  const validatePassword = (password: string) => {
    // Regular expression to validate password
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    return regex.test(password);
  };

  if (!secretCode) {
    if (loading) {
      return (
        <Center flexDirection={'column'}>
          <Spinner />
          <Text>
            {isImport ? 'Importing' : 'Generating'} secret code for you
          </Text>
          <Box mt={'12px'} />
        </Center>
      );
    }

    if (isImport) {
      return (
        <Flex gap={'12px'} mb={'12px'}>
          <Box flex={1}>
            <Input
              placeholder="Enter secret code..."
              onChange={(e) => setImportSecretKeyText(e.target.value)}
            />
            {secretKeyError && (
              <Text mt={'5px'} fontSize={'12px'} color={'red'}>
                {secretKeyError}
              </Text>
            )}
          </Box>
          <Button
            type="button"
            className={s.btnImport}
            onClick={() => {
              try {
                if (!validatePassword(importSecretKeyText)) {
                  return setSecretKeyError('Secret code invalid!');
                }
                setLoading(true);
                onImportSecretCode(importSecretKeyText);
              } catch (error) {
                //
              }
            }}
          >
            Import
          </Button>
        </Flex>
      );
    }

    return (
      <Flex flexDirection={'column'} gap={'12px'}>
        <Button
          type="button"
          className={s.btnImport}
          onClick={() => {
            setIsImport(true);
          }}
        >
          Import Secret Code
        </Button>
        <Button
          type="button"
          onClick={() => {
            setIsImport(false);
            setLoading(true);
            createNewSecretCode();
          }}
        >
          Create New A Secret Code
        </Button>
        <Box mt={'12px'} />
      </Flex>
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
