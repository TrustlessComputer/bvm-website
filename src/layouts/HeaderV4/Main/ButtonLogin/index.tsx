import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppSelector } from '@/stores/hooks';
import { accountInforSelector } from '@/stores/states/l2services/selector';
import { Image, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import s from './styles.module.scss';

type Props = {
  color?: 'black' | 'white';
  className?: string;
  title?: string;
};
const ButtonLoginTwitter = (props: Props) => {
  const router = useRouter();
  const { loggedIn, login, logout, userInfo } = useWeb3Auth();
  const accInfor = useAppSelector(accountInforSelector);

  const handleConnect = async () => {
    try {
      login();
    } catch (err: unknown) {
      toast.error(
        (err as Error).message ||
          'Something went wrong. Please try again later.',
      );
    }
  };
  const [isHover, setIsHover] = useState<boolean>(false);

  if (!loggedIn) return null;

  return (
    <div
      className={`${s.buttonLogin} ${
        props.color === 'black' ? s.buttonLogin__light : s.buttonLogin__dark
      } ${props?.className} ${loggedIn && s.loggedIn}`}
      onClick={() => {
        if (!loggedIn) {
          handleConnect();
        } else {
          router.push('/chains');
        }
      }}
      onMouseEnter={() => setIsHover(true)}
    >
      <div className={s.inner}>
        {loggedIn && (
          <Image
            src={userInfo?.profileImage || '/icons/default-user-avatar.svg'}
            w="22px"
            h={'22px'}
            borderRadius={'100%'}
            fit={'cover'}
          ></Image>
        )}
        <p className={`${loggedIn ? s.text : s.lowercase} text`}>
          {!loggedIn ? (
            props?.title || 'Sign in'
          ) : (
            <Skeleton isLoaded={loggedIn}>
              {accInfor?.twitterUsername ||
                accInfor?.email?.split('@')?.[0] ||
                accInfor?.tcAddress}
            </Skeleton>
          )}
        </p>
      </div>
    </div>
  );
};

export default ButtonLoginTwitter;
