import { LAUNCHPAD_URL } from '@/constants/route-path';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import s from './styles.module.scss';

const BannerUpcommingInPage = () => {
  const navigate = useRouter();

  const handleClick = () => {
    navigate.push(`${LAUNCHPAD_URL}`);
  };

  return (
    <Flex className={s.container}>
      <Text className={s.title}>
        Upcoming Launchpad Projects. $BVM stakers will have special access &
        benefits
      </Text>
      <Button className={s.btnAction} onClick={handleClick}>
        Discover Now!{' '}
      </Button>
    </Flex>
  );
};

export default BannerUpcommingInPage;
