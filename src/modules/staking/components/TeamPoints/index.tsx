import React from 'react';
import styles from './styles.module.scss';
import {Flex} from '@chakra-ui/react';
import TeamInfo from '@/modules/staking/components/TeamPoints/teamInfo';
import ProcessBar from '@/modules/staking/components/TeamPoints/processBar';
import TeamPointFooter from '@/modules/staking/components/TeamPoints/footer';

const TeamPoints = React.memo(() => {
    return (
        <Flex width="100%" flexDirection="column" gap="12px">
            <p className={styles.boxTitle}>
                <b>Your squad.</b> Invite friends to rank up and earn more.
            </p>
            <Flex className={styles.container}>
                <TeamInfo/>
                <ProcessBar/>
                <TeamPointFooter/>
            </Flex>
        </Flex>
    );
});

export default TeamPoints;
