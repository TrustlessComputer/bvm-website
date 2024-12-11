import { ITemplate } from '@/services/api/dapp/types';
import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { capitalizeFirstLetter } from '@web3auth/ui';
import { onMapPageToName } from '@/modules/agent-studio/Buy/Template/constants';

interface IProps {
  template?: ITemplate;
  menus?: string[];
}

const HeaderTemplate_1 = ({ template, menus }: IProps) => {
  return (
    <div className={styles.container}>
      <Flex alignItems="center" gap="12px">
        <Image
          src={template?.logo || template?.backupLogo}
          height={{ base: '36px', md: '48px' }}
          w="auto"
          alt={'logo'}
        />
        <Text
          fontSize={{ base: '14px', md: '32px' }}
          fontWeight="bold"
          color="white"
        >
          {template?.appName}
        </Text>
      </Flex>
      <Flex gap="12px">
        {menus?.map((item, index) => (
          <Text
            key={item}
            fontSize={{ base: '14px', md: '18px' }}
            color="white"
            fontWeight="bold"
            mr="12px"
          >
            {onMapPageToName(item)}
          </Text>
        ))}
      </Flex>
    </div>
  );
};

export default HeaderTemplate_1;
