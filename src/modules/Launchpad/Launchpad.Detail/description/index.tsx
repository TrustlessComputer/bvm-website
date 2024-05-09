import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';
import { ILaunchpad } from '@/services/interfaces/launchpad';

const IdoDescription = ({
  launchpadDetail,
}: {
  launchpadDetail?: ILaunchpad;
}) => {
  return (
    <Box className={s.container}>
      <div
        dangerouslySetInnerHTML={{
          __html: launchpadDetail?.description as string,
        }}
      />
    </Box>
  );
};

export default IdoDescription;
