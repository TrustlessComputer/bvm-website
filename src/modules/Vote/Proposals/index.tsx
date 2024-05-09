import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import s from './styles.module.scss';
import SubmitProposal from './SubmitProposal';
import ListProposal from './ListProposal';

const Proposals = ({ minimunShardToSubmit }: { minimunShardToSubmit: number }) => {
  return (
    <Box
      className={s.wrapper}
      position={'relative'}
    >
      <Flex className={s.submitProposals}>
        <p className={s.heading}>Proposals</p>
        <SubmitProposal minimunShardToSubmit={minimunShardToSubmit} />
      </Flex>
      <ListProposal />
    </Box>
  );
};

export default Proposals;
