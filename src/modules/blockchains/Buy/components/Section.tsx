import { Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import DescriptionModal from './DescriptionModal/DescriptionModal';

export type Props = {
  title?: string;
  titleFontSize?: string;
  isRequired?: boolean;
  description?: string;
  children?: React.ReactNode | null;
  descriptionDetail?: {
    title: string;
    content: React.ReactNode | null;
  };
};

const Section = React.memo((props: Props) => {
  const {
    title,
    titleFontSize = '20px',
    description,
    children,
    descriptionDetail,
    isRequired,
  } = props;

  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <Flex flexDir={'column'} gap={'10px'}>
      {title && (
        <Flex flexDir={'row'} gap={'5px'}>
          <Text fontSize={titleFontSize} fontWeight={600} color={'#000'}>
            {title}
          </Text>
          {isRequired && (
            <Text color={'#ff0000'} fontSize={'15px'}>
              {'(*)'}
            </Text>
          )}
        </Flex>
      )}

      {description && (
        <Text
          fontSize={'18px'}
          fontWeight={600}
          color={'#2b35e4'}
          _hover={{
            cursor: 'pointer',
          }}
          onClick={() => setIsShowModal(true)}
        >
          {description}
        </Text>
      )}

      {children}

      {descriptionDetail && (
        <DescriptionModal
          show={isShowModal}
          onClose={() => setIsShowModal(false)}
          title={descriptionDetail.title}
          content={descriptionDetail.content}
        />
      )}
    </Flex>
  );
});

export default Section;
