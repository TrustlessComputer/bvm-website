import LaunchpadItem from '@/modules/Launchpad/Launchpad.Item';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CLaunchpadAPI from '../../services/launchpad';
import { ILaunchpad } from '../../services/launchpad.interfaces';
import s from './styles.module.scss';
import { commonSelector } from '@/stores/states/common/selector';

const LiveAndUpcomming = () => {
  const [data, setData] = useState<ILaunchpad[]>();
  const [loading, setLoading] = useState(true);
  const needReload = useSelector(commonSelector).needReload;
  const launchpadApi = useRef(new CLaunchpadAPI()).current;

  useEffect(() => {
    getData();
  }, [needReload]);

  const getData = async () => {
    try {
      const res: any = await launchpadApi.getListLaunchpad({});
      setData(res?.rows as ILaunchpad[]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    !loading && (
      <Flex className={s.container}>
        <Box className={s.bg}>
          <Image
            src={'/images/launchpad/list/bg.webp'}
            className={s.animateBounce}
          />
        </Box>
        <Flex
          className={s.contentBox}
          alignItems={'center'}
          direction={'column'}
        >
          <Text className={s.sectionTitle}>Upcoming Launchpads</Text>
          <Text className={s.sectionDesc}>
            $BVM stakers will have special access & benefits. Discover Now!
          </Text>
          <Flex
            direction={'column'}
            gap={['80px', '80px']}
            className={s.content}
          >
            {data?.map((d) => {
              return <LaunchpadItem data={d as ILaunchpad} />;
            })}
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default LiveAndUpcomming;
