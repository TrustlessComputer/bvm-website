import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

import s from '../styles.module.scss';

const CommonSection = ({ id, subTile, subDescription, image, link }: any) => {
  return (
    <Flex
      gap={['120px']}
      py={['80px']}
      minW="100%"
      justifyContent="space-between"
    >
      <Flex gap={['36px']} direction="column">
        <Flex gap={['12px']} direction="column">
          <Text className={s.label}>Step {id}</Text>
          <Text className={s.subTitle} as="h6">
            {subTile}
          </Text>
          <Text className={s.subDescription}>{subDescription}</Text>
        </Flex>
        <Box>
          <Link className={s.playNowBtn} href={link}>
            Learn more
          </Link>
        </Box>
      </Flex>
      <Box>
        <Image src={image} alt={id} />
      </Box>
    </Flex>
  );
};

export default CommonSection;
