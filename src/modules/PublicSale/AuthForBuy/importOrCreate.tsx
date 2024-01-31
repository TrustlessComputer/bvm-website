import SvgInset from '@/components/SvgInset';
import { generateTOkenWithSecretCode } from '@/services/public-sale';
import { setGuestSecretCode } from '@/stores/states/user/reducer';
import { generateRandomString } from '@/utils/encryption';
import AuthenStorage from '@/utils/storage/authen.storage';
import {
  Center,
  Spinner,
  Flex,
  Input,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useDispatch } from 'react-redux';
import s from './styles.module.scss';
import { userSelector } from '@/stores/states/user/selector';
import { useAppSelector } from '@/stores/hooks';

const ImportOrCreate = ({ onBack }: { onBack?: any }) => {
  const dispatch = useDispatch();
  const getSecretCode = AuthenStorage.getGuestSecretKey();

  const user = useAppSelector(userSelector);

  const [loading, setLoading] = useState(false);
  const [secretCode, setSecretCode] = useState(getSecretCode);
  const [isImport, setIsImport] = useState(false);
  const [importSecretKeyText, setImportSecretKeyText] = useState('');
  const [secretKeyError, setSecretKeyError] = useState('');

  const isAuth = useMemo(() => user?.guest_code || user?.twitter_id, [user]);

  const validatePassword = (password: string) => {
    // Regular expression to validate password
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    return regex.test(password);
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const getToken = async (captcha: string, code?: string) => {
    try {
      if (isAuth) {
        return;
      }
      setLoading(true);
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

  // const createNewSecretCode = useCallback(() => {
  //   try {
  //     if (!executeRecaptcha) {
  //       console.log('Execute recaptcha not yet available');
  //       throw Error('Execute recaptcha not yet available');
  //     }
  //     executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
  //       console.log(gReCaptchaToken, 'response Google reCaptcha server');
  //       getToken(gReCaptchaToken);
  //     });
  //   } catch (error) {
  //     //
  //   }
  // }, [executeRecaptcha]);

  const createNewSecretCode = async () => {
    try {
      await getToken('gReCaptchaToken');
    } catch (error) {}
  };

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

  if (loading) {
    return (
      <Center flexDirection={'column'}>
        <Spinner />
        <Text>{isImport ? 'Importing' : 'Generating'} secret code for you</Text>
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
      {onBack && (
        <Flex cursor={'pointer'} onClick={onBack}>
          <SvgInset svgUrl="/icons/ic_back.svg" />
        </Flex>
      )}

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
      <Box />
    </Flex>
  );
};

export default ImportOrCreate;
