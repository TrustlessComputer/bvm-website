'use client';

import { Link, StackDivider, VStack } from '@chakra-ui/react';
import { NAV_ITEMS, NAV_ITEMS_MOBILE } from '../menuConfig';
import MobileDropdown from '@/layouts/Header/components/MobileDropdown';
// import Community from './Community';
import GroupDownItem from '@layouts/HeaderV3/components/GroupDownItem';

import s from './styles.module.scss';
import Contact from '@/modules/UseBitcoin/contact';
import ContactUs from './ContactUs';
import ButtonLoginTwitter from '../Main/ButtonLogin';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const MobileNav = (props: Props) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={10}
      alignItems={'flex-start'}
      px={'24px'}
      py={'32px'}
    >
      <ButtonLoginTwitter
        className={s.menuButton}
        color={props.primaryColor}
        title="Connect"
      />

      {NAV_ITEMS.map((item) => (
        <>
          {item.subMenu ? (
            <MobileDropdown
              primaryColor={props.primaryColor}
              title={item.label}
              lists={item.subMenu}
            />
          ) : item.GroupDropDown ? (
            <GroupDownItem
              key={item.label}
              title={item.label}
              typeGroup={item.groupType}
              color={'#000'}
            >
              {item.GroupDropDown()}
            </GroupDownItem>
          ) : (
            <Link
              p={2}
              href={item.href ?? '#'}
              fontSize={['16px', '16px']}
              fontWeight={400}
              color={'#000'}
              target={item.isNewWindow ? '_blank' : '_self'}
              _hover={{}}
            >
              {item.label}
            </Link>
          )}
        </>
      ))}

      {/* <ContactUs /> */}
    </VStack>
  );
};
