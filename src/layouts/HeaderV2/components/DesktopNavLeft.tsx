'use client';

import { HStack, Text } from '@chakra-ui/react';

import Link from 'next/link';
import DropDown from '@/layouts/Header/components/Dropdown';
import s from './styles.module.scss';
import { NAV_ITEMS_LEFT } from '@layouts/Header/menuConfig';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const DesktopNavLeft = (props: Props) => {
  return (
    <HStack direction={'row'} spacing={['40px', '40px']}>
      {NAV_ITEMS_LEFT.map((navItem, index) => (
        <>
          {navItem.subMenu ? (
            <DropDown
              key={`${navItem.label}-${index}`}
              primaryColor={props.primaryColor}
              title={navItem.label}
              lists={navItem.subMenu}
            />
          ) : (
            <Link
              key={navItem.label}
              href={navItem.href ?? '#'}
              target={navItem.isNewWindow ? '_blank' : '_self'}
              color={props?.primaryColor || 'white'}
              className={navItem.isStrong ? s.isStrong : ''}
            >
              {/* {navItem.isStrong && <span className={s.strongText}>✨</span>} */}
              <Text
                textAlign={'center'}
                fontSize={['14px', '16px']}
                lineHeight={'110%'}
                fontWeight={400}
                color={props.primaryColor || 'black'}
                _hover={{}}
              >
                {navItem.label}
              </Text>
            </Link>
          )}
        </>
      ))}
      {/*{NAV_ITEMS_LEFT.map((navItem) => (
        <Link
          key={navItem.label}
          href={navItem.href ?? '#'}
          target={navItem.isNewWindow ? '_blank' : '_self'}
          color={props?.primaryColor || 'white'}
          className={navItem.isStrong ? s.isStrong : ''}
        >
          {
            navItem.isStrong && <span className={s.strongText}>
            ✨
          </span>
          }

            <Text
              textAlign={'center'}
              fontSize={['14px', '16px']}
              lineHeight={'110%'}
              fontWeight={500}
              color={props.primaryColor || 'black'}
              _hover={{}}
            >
              {navItem.label}
            </Text>
        </Link>
      ))}*/}
    </HStack>
  );
};
