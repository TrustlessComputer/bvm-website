// import { CDN_URL } from '@constants/config';
import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import s from './styles.module.scss';

import CommunityModal from '@/components/CommunityModal/v2';

type Props = {
  color?: 'black' | 'white';
};

const Community = (props: Props) => {
  const [showContactUsModal, setContactUsModal] = useState(false);
  const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);

  return (
    <>
      <Flex
        onClick={() => {
          setContactUsModal(true);
        }}
        flexDir={'row'}
        borderRadius={'4px'}
        justify={'center'}
        align={'center'}
        px={'10px'}
        py={'5px'}
        className={s.btnLogin}
        color={props?.color === 'black' ? 'white' : 'black'}
        gap={'10px'}
        _hover={{
          cursor: 'pointer',
        }}
      >
        Community
      </Flex>

      {showContactUsModal && (
        <CommunityModal
          isShow={true}
          onHide={() => setContactUsModal(false)}
          onSuccesCB={() => {
            setContactUsModal(false);
            setShowSubmitSuccessModal(true);
          }}
        />
      )}
    </>
  );
};

export default Community;
