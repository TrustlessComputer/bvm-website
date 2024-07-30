import { Flex, Text, Image } from '@chakra-ui/react';
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
    <Flex flexDir={'column'} gap={['6px', '9px', '10px']}>
      {title && (
        <Flex flexDir={'row'} gap={'5px'}>
          <Text
            fontSize={['16px, 18px', '20px']}
            fontWeight={600}
            color={'#000'}
          >
            {title}
          </Text>
          {isRequired && (
            <Text color={'#ff0000'} fontSize={['13px, 14px', '15px']}>
              {'(*)'}
            </Text>
          )}
        </Flex>
      )}

      {description && (
        <Flex
          flexDir={'row'}
          align={['flex-start', 'center']}
          gap={['5px']}
          _hover={{
            cursor: 'pointer',
          }}
          onClick={() => setIsShowModal(true)}
        >
          <Text
            w={'max-content'}
            fontSize={['13px, 16px', '18px']}
            fontWeight={600}
            color={'#2b35e4'}
          >
            {description}
          </Text>

          {descriptionDetail && (
            <Flex>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2b35e4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </Flex>
          )}
        </Flex>
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
