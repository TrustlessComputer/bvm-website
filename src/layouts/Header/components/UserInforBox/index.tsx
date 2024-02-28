import { useAuthenticatedUserInfo } from '@/Providers/AuthenticatedProvider/hooks';
import Avatar from '@/components/Avatar';
import { Flex, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React from 'react';

const UserInforBox: React.FC = (): React.ReactElement => {
  const userInfor = useAuthenticatedUserInfo();
  const pathname = usePathname();
  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      gap="5px"
      bgColor={pathname === '/' ? '#2E2E2E' : '#F6F6F6'}
      px={'5px'}
      py={'3px'}
      borderRadius={'100px'}
      borderColor={pathname === '/' ? '#898989' : '#ECECEC'}
      border={'1px'}
      maxW={'156px'}
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
          {userInfor?.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserInforBox;
