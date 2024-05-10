import AppLoading from '@/components/AppLoading';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import {
  generateTokenWithTwPost,
  requestAuthenByShareCode,
} from '@/services/player-share';
import { userSelector } from '@/stores/states/user/selector';
import { shareURLWithReferralCode } from '@/utils/helpers';
import AuthenStorage from '@/utils/storage/authen.storage';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from '../item.module.scss';
import VerifyTwModal, { VerifyTwModalID } from './verifyTwModal';
import { setBearerToken } from '@/services/whitelist';
import { openModal } from '@/stores/states/modal/reducer';
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

  const wallet = useAuthenticatedWallet();

  const isAuthenticated = wallet?.address;

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

      const content = `Just got the allowlist to join the $NAKA IDO launchpad at $1M FDV\n\n@naka_chain is setting out to be one of the biggest Bitcoin L2s for DeFi in 2024!\n\n$NAKA IDO starting soon! Join the allowlist now:${code}\n\n${url}`;

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
      // showSuccess({ message: `You're has joined allowlisted` });
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
        // dispatch(setXToken(result?.token));
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
              Tweet and tag @naka_chain to join allowlist
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
              isLoading={submitting}
              loadingText="Submitting..."
              onClick={isAuthenticated ? onClickShare : undefined}
              isDisabled={isDisabled}
            >
              {isAuthenticated ? 'Post' : 'Sign in'}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ShareTw;
