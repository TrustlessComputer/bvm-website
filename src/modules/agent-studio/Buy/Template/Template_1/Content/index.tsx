import styles from './styles.module.scss';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import HeadingText from '@/modules/agent-studio/Buy/Template/HeadingText';
import { ITemplate1 } from '@/services/api/dapp/types';
import AppLoading from '@components/AppLoading';
import Lines from '@/modules/agent-studio/Buy/Template/anim/Lines';

interface IProps {
  template?: ITemplate1;
  backgroundImage: string;
}

const ContentTemplate_1 = React.memo(
  ({ template, backgroundImage }: IProps) => {
    const contentText = template?.contentText;

    if (!template) {
      return <AppLoading />;
    }

    return (
      <Box
        backgroundImage={`url(${backgroundImage})`}
        className={styles.container}
      >
        <SimpleGrid
          className={styles.grid}
          gridTemplateColumns={['1fr', '1.25fr 1fr']}
          gap={[6, 0]}
        >
          <Flex direction={'column'} gap={[6, 6]} justifyContent={'center'}>
            <Box className={styles.title}>
              <HeadingText
                first={contentText?.first || ''}
                last={contentText?.last || ''}
                headingsStyles={[]}
                headings={contentText?.headings || []}
                headingsColors={contentText?.headingsColors || []}
              />
            </Box>
            <Lines delay={1.2}>
              <Box className={styles.desc}>{contentText?.desc}</Box>
            </Lines>
          </Flex>
          <Flex
            justifyContent={['center', 'flex-end']}
            alignItems={'flex-end'}
          />
        </SimpleGrid>
      </Box>
    );
  },
);

export default ContentTemplate_1;
