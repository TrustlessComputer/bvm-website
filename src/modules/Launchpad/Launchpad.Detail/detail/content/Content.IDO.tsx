import { GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import useFetchPayment from './useFetchPayment';
import LeaderBoard from './leaderBoard';
import s from './styles.module.scss';
import PaymentBox from './PaymentBox';

const ContentIDO = () => {
  useFetchPayment();

  return (
    <SimpleGrid
      columns={[1, 2]}
      gridTemplateColumns={[
        '1fr 1fr',
        '1fr 1fr',
        'minmax(600px, 1fr) minmax(320px, 600px)',
      ]}
      gridTemplateAreas={[
        `'task' 'leaderboard'`,
        `'leaderboard' 'task'`,
        `'leaderboard task'`,
      ]}
      className={s.container}
      gap={['16px', '32px']}
      mt={'48px'}
    >
      <GridItem area={'leaderboard'}>
        <LeaderBoard />
      </GridItem>
      <GridItem area={'task'}>
        <PaymentBox />
        <Text fontSize={'16px'} color={'#000'} mt={'24px'}>
          This is an independent project . Launchpad acts purely as a technology
          platform. All responsibilities related to the launch, how it
          functions, its credibilities and legalities solely are the project's
          discretion. As a technology platform, BVM shall bear no
          responsibililites as to the credibilty, legality, operationality and
          functionality of the project as well as the use of funds being raised
          by the project on the launchpad. A project being launched on BVM does
          not in any manner represent an endorsement of BVM of such project or
          its owners. Please DYOR and invest at your own risk.
        </Text>
      </GridItem>
    </SimpleGrid>
  );
};

export default ContentIDO;
