import { IHeaderMenu, ITemplate } from '@/services/api/dapp/types';
import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { capitalizeFirstLetter } from '@web3auth/ui';
import { onMapPageToName } from '@/modules/blockchains/Buy/Template/constants';

interface IProps {
  template?: ITemplate;
  menus?: string[];
  headerMenu?: IHeaderMenu[]
}


const HeaderTemplate_1 = ({  template, menus, headerMenu }: IProps) => {
    return (
        <div className={styles.container}>
          <Flex alignItems="center" gap="12px">
            <Image
              src={template?.logo || template?.backupLogo}
              height={{ base: "36px", md: "48px" }}
              w="auto"
              alt={"logo"}
            />
            <Text
              fontSize={{ base: "14px", md: "32px" }}
              fontWeight="bold"
              color="white"
            >
              {template?.appName}
            </Text>
          </Flex>
          <Flex gap="24px" alignItems="center">
            {menus?.filter(item => !!item)?.map((item, index) => (
              <Text
                key={item}
                fontSize={{ base: "14px", md: "18px" }}
                color="white"
                fontWeight="bold"
              >
                {onMapPageToName(item)}
              </Text>
            ))}
            {headerMenu?.filter(item => item?.slug && item?.title).map((item, index) => (
              <Text
                key={item.slug}
                fontSize={{ base: "14px", md: "18px" }}
                color="white"
                fontWeight="bold"
              >
                {capitalizeFirstLetter(item.title)}
              </Text>
            ))}
          </Flex>
        </div>
    );
}

export default HeaderTemplate_1;
