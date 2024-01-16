'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { NAV_ITEMS, NAV_ITEMS_RIGHT } from '../menuConfig';
import { IcTW } from './IcTW';
import { ReactElement } from 'react';
import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';

type Props = {
  primaryColor?: 'black' | 'white';
};

export const DesktopNavRight = (props: Props) => {
  return (
    <HStack direction={'row'} spacing={['40px', '40px']}>
      {NAV_ITEMS_RIGHT.map((navItem) => (
        <>

          {
            navItem.subMenu ?
              <DropDown primaryColor={props.primaryColor} title={navItem.label} lists={navItem.subMenu} />
              :
              <Link
                key={navItem.label}
                href={navItem.href ?? '#'}
                target={navItem.isNewWindow ? '_blank' : '_self'}
                color={props?.primaryColor || 'white'}
              >
                {navItem?.isTwitter ? (
                  <Box
                    m={0}
                    p={'10px'}
                    display={'flex'}
                    alignItems={'center'}
                    borderRadius={100}
                    bgColor={
                      props?.primaryColor === 'white' ? '#fff' : '#fefefec5'
                    }
                    justifyContent={'center'}
                    _hover={{
                      opacity: 0.7,
                    }}
                    onClick={() => {
                      window.open(navItem.href, '_blank');
                    }}
                  >
                    <IcTW fillColor={'#000000'} />
                  </Box>
                ) : (
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
                )}
              </Link>
          }

        </>
      ))}
    </HStack>
  );
};

type PropD = {
  title: string, lists: string[], primaryColor?: string
};
const DropDown = ({ title, lists, primaryColor }: PropD): ReactElement => {

  return <div className={s.dropMenu}>
    <span className={`${s.dropMenu_label} ${s[primaryColor || 'black']}`}>
       {title}
      <SvgInset svgUrl={`icons/ic-submenu.svg`} />
    </span>
    <ul className={s.dropMenu_list}>
      {
        lists.map((link: any) => {
          return (<li className={s.listItem}>
            <a href={link.link} target={'_blank'} style={{ color: primaryColor || 'black' }}>
              {
                link.title
              }
              <SvgInset svgUrl={`landing/images/basil_arrow-up-outline.svg`} />
            </a>
          </li>);
        })
      }
    </ul>
  </div>;
};
