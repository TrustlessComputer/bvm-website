import {
  generateTokenWithTwPost,
  requestAuthenByShareCode,
} from '@/services/player-share';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from '@/modules/Launchpad/Launchpad.Detail/naka/content/tasks/item.module.scss';
import VerifyTwModal, { VerifyTwModalID } from './verifyTwModal';
import AppLoading from '@/components/AppLoading';
import { shareURLWithReferralCode } from '@/utils/helpers';
import { useParams } from 'next/navigation';
import { showSuccess } from '@/components/toast';
import AuthenStorage from '@/utils/storage/authen.storage';
import { userSelector } from '@/stores/states/user/selector';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { openModal } from '@/stores/states/modal/reducer';
import { setBearerToken } from '@/services/whitelist';
import { setXToken } from '@/stores/states/user/reducer';
import { requestReload } from '@/stores/states/common/reducer';

interface IAuthenCode {
  public_code: string;
  secret_code: string;
}

interface IShareTw {
  onVerifySuccess: () => void;
  index: number;
  isDone?: boolean;
}

const ShareTw = (props: IShareTw) => {
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const token = AuthenStorage.getAuthenKey();
  const user = useSelector(userSelector);
  const params = useParams();

  const { isAuthen, requestAccount } = useNakaAuthen();

  const [showManualCheck, setShowManualCheck] = useState(false);

  const { currentLaunchpad } = useLaunchpadContext();

  const isDisabled = useMemo(() => {
    return currentLaunchpad?.status !== 'prelaunch';
  }, [currentLaunchpad?.status]);

  useEffect(() => {
    if (!!token) {
      setShowManualCheck(false);
    }
  }, [token]);

  const onClickShare = async () => {
    try {
      let code = '';
      if (!props?.isDone) {
        const res: any = await requestAuthenByShareCode();
        setAuthenCode(res);
        code = `\n\n#${res?.public_code}`;
      }

      const url = shareURLWithReferralCode({
        subDomain: `launchpad/detail/${params.id}`,
        user: user,
      });

      const content = `Bull Flag, almost ready 🚀\n\n@CryptoEternalAI is gonna be one of the biggest Bitcoin L2s in the AI space!\n\nJoin the allowlist to be a part of the $EAI IDO!${code}\n\n${url}`;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (authenCode?.public_code) {
      setSubmitting(true);
      setShowManualCheck(true);
      timer.current = setInterval(async () => {
        handleVerifyTwitter();
      }, 6000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [authenCode?.public_code]);

  const handleVerifyTwitter = async (): Promise<void> => {
    try {
      const result = await generateTokenWithTwPost(
        authenCode?.secret_code as string,
      );
      onVerifyTwSuccess(result);
      showSuccess({ message: `You're has joined allowlisted` });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log('handleVerifyTwitter', err);
    }
  };

  const onVerifyTwSuccess = async (result: any) => {
    if (result) {
      clearInterval(timer.current);
      const twitterToken = AuthenStorage.getAuthenKey();
      if (!twitterToken || twitterToken !== result?.token) {
        AuthenStorage.setAuthenKey(result?.token);
        setBearerToken(result?.token);
        // setBearerTokenUser(result?.token);
        // dispatch(setBVMClaimToken(result?.token));
        dispatch(setXToken(result?.token));
        props.onVerifySuccess();
      }
      setSubmitting(false);
      dispatch(requestReload());
    }
  };

  const onClickManualCheck = () => {
    dispatch(
      openModal({
        id: VerifyTwModalID,
        title: '',
        className: s.modalContent,
        modalProps: {
          size: 'lg',
        },
        render: (
          <VerifyTwModal
            secretCode={authenCode?.secret_code}
            onSuccess={onVerifyTwSuccess}
          />
        ),
      }),
    );
  };

  return (
    <Flex className={s.container}>
      <Center className={s.index}>{props.index}</Center>
      <Flex className={s.shareTw}>
        <Flex justifyContent={'space-between'} gap={'12px'}>
          <Flex direction="column">
            <Text className={s.title}>Tweet to join allowlist</Text>
            <Text className={s.desc}>
              Tweet and tag @CryptoEternalAI to join the allowlist
            </Text>
          </Flex>
          <Flex direction="column" minW={'110px'} alignItems={'flex-end'}>
            <Text className={s.title}>+1,000 pts</Text>
            {/*<Text className={s.desc}>per 1,000 views</Text>*/}
          </Flex>
        </Flex>
        <Flex direction="column" w={'100%'}>
          {submitting && (
            <>
              <Box borderRadius={'6px'} mb={'12px'} p="12px" bg={'#6633ce1a'}>
                {submitting && (
                  <Flex
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <AppLoading />
                    <Text>Verifying....</Text>
                  </Flex>
                )}
                {showManualCheck && (
                  <Text
                    mt={1}
                    fontSize={'14px !important'}
                    textAlign={'center'}
                    fontWeight={'500'}
                  >
                    {`If it doesn't update quickly, do it manually `}
                    <Text
                      cursor={'pointer'}
                      textDecoration={'underline'}
                      as={'span'}
                      _hover={{
                        color: '#6633ce',
                      }}
                      onClick={onClickManualCheck}
                    >
                      here
                    </Text>
                  </Text>
                )}
              </Box>
            </>
          )}
          {props?.isDone ? (
            <Text>
              {`You're sign in by ${user?.twitter_name} account - `}
              <span style={{ color: '#6633CE' }}>Done</span>
            </Text>
          ) : (
            <Button
              className={s.btnShare}
              // isLoading={submitting}
              // loadingText="Submitting..."
              onClick={isAuthen ? onClickShare : requestAccount}
              isDisabled={isDisabled}
            >
              {isAuthen ? 'Post' : 'Sign in'}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ShareTw;
