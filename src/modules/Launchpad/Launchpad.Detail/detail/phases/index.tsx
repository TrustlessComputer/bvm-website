import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useContext, useMemo } from 'react';
import s from '../styles.module.scss';
import { LAUNCHPAD_URL } from '@/constants/route-path';
import { useRouter } from 'next/navigation';
import PhaseItem from './item';
import { ELaunchpadStatus } from '@/modules/Launchpad/services/launchpad.interfaces';
import { compareString } from '@/utils/string';
// import Phases from '../'

const Phases = () => {
  const { currentLaunchpad } = useContext(LaunchpadContext);
  const router = useRouter();

  const dataPhase = useMemo(() => {
    const _phases_step = [
      ELaunchpadStatus.ido,
      ELaunchpadStatus.tge,
      ELaunchpadStatus.listing,
    ];

    const _phases: any[] = [
      {
        key: 2,
        title: 'LAUNCH',
        status: 'pending',
        type: ELaunchpadStatus.ido,
      },
      {
        key: 3,
        title: 'TGE',
        status: 'pending',
        type: ELaunchpadStatus.tge,
      },
      {
        key: 4,
        title: 'LISTING',
        status: 'pending',
        type: ELaunchpadStatus.listing,
        note: '',
      },
    ];

    if (currentLaunchpad?.id) {
      if (currentLaunchpad?.pre_sale) {
        _phases.unshift({
          key: 1,
          title: 'PRE-LAUNCH',
          status: 'pending',
          type: ELaunchpadStatus.prelaunch,
        });
        _phases_step.unshift(ELaunchpadStatus.prelaunch);
      }
    }

    return _phases?.map((v, i) => ({
      ...v,
      key: i + 1,
      status: compareString(v.type, currentLaunchpad?.status)
        ? 'running'
        : (_phases_step as any)[currentLaunchpad?.status as any] > i
        ? 'done'
        : 'pending',
    }));
  }, [currentLaunchpad]);

  if (!currentLaunchpad?.id) {
    return <></>;
  }

  return (
    <Box bg={'#F6F6F6'} className={s.phaseWrapper}>
      <Flex
        className={s.viewAllProjects}
        gap={'8px'}
        justifyContent={'center'}
        alignItems={'center'}
        onClick={() => {
          router.push(`${LAUNCHPAD_URL}`);
        }}
      >
        <Text fontSize={'16px'} fontWeight={500} color={'#6633CE'}>
          View all projects
        </Text>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2419 10.2392C17.2103 10.3159 17.1646 10.385 17.1071 10.4425L13.7737 13.7758C13.6521 13.8975 13.492 13.9591 13.332 13.9591C13.172 13.9591 13.012 13.8983 12.8903 13.7758C12.6462 13.5317 12.6462 13.1358 12.8903 12.8916L15.157 10.625H3.33203C2.98703 10.625 2.70703 10.345 2.70703 9.99998C2.70703 9.65498 2.98703 9.37498 3.33203 9.37498H15.1562L12.8895 7.10834C12.6454 6.86417 12.6454 6.46831 12.8895 6.22414C13.1337 5.97997 13.5296 5.97997 13.7737 6.22414L17.1071 9.55747C17.1646 9.61497 17.2103 9.68405 17.2419 9.76072C17.3053 9.91405 17.3053 10.0859 17.2419 10.2392Z"
            fill="#6633CE"
          />
        </svg>
      </Flex>
      <Flex justifyContent={'center'} direction={['column', 'row']}>
        <Flex gap={'12px'} direction={['row', 'row']} alignItems={'center'}>
          {dataPhase?.map((p: any) => (
            <PhaseItem data={p} key={p.key} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Phases;
