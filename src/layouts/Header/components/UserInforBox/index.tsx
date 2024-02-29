import { useAuthenticatedUserInfo } from '@/Providers/AuthenticatedProvider/hooks';
import Avatar from '@/components/Avatar';
import { Flex, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserInforBox: React.FC = (): React.ReactElement => {
  const userInfor = useAuthenticatedUserInfo();
  const router = useRouter();
  const pathname = usePathname();
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (pathname === '/') {
      setShow(false);
      setTimeout(() => {
        setShow(true);
      }, 1000);
    } else {
      setShow(true);
    }
  }, [pathname]);

  const getBgColor = () => {
    if (pathname === '/') {
      return '#FFFFFF1A';
    }
    if (pathname?.includes('blockchains')) {
      // return '#F3F1E8';
      return '#0000000D';
    }
    // return '#F6F6F6';
    return '#0000000D';
  };

  const getBorderColor = () => {
    if (pathname === '/') {
      return '#FFFFFF4D';
    }
    if (pathname?.includes('blockchains')) {
      // return '#d5d5d5';
      return '#FFFFFF1A';
    }
    // return '#ECECEC';
    return '#FFFFFF1A';
  };

  if (!isShow) return <></>;
  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      gap="5px"
      bgColor={getBgColor()}
      px={'7px'}
      py={'4px'}
      borderRadius={'100px'}
      borderColor={getBorderColor()}
      borderWidth={'1px'}
      maxW={'156px'}
      _hover={{
        cursor: 'pointer',
      }}
      onClick={() => {
        router.push('/blockchains');
      }}
    >
      <Avatar url={userInfor?.profile_image || ''} width={36} />
      <Flex flexDir={'row'} align={'center'} gap={'2px'} overflow={'hidden'}>
        {/* <Text
            textAlign={'center'}
            fontSize={'14px'}
            lineHeight={'20px'}
            fontWeight={400}
            textStyle="third"
            opacity={0.6}
          >
            {ellipsisCenter({
              str: walletAddress || '',
              limit: 4,
            })}
          </Text> */}

        <Text
          textAlign={'center'}
          fontSize={'14px'}
          lineHeight={'20px'}
          fontWeight={400}
          overflow={'hidden'}
          color={pathname === '/' ? 'white' : 'black'}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
        >
          {userInfor?.name || ''}
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserInforBox;
