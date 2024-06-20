'use client';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { MobileNav } from './MobileNav';
import useHeaderMobile from '@layouts/HeaderV3/useHeaderMobile';

import s from './styles.module.scss';
import { useEffect } from 'react';

export type HeaderProps = {
  isOpen: boolean;
  onToggle: any;
};

const DrawerMobileMenu = (props: HeaderProps) => {

  const { isProductionOpen, hide } = useHeaderMobile();
  const onClose = () => {

    isProductionOpen ? hide() : props.onToggle();
  };

  console.log('____render', isProductionOpen);
  useEffect(() => {
    console.log('___change', isProductionOpen);
  }, [isProductionOpen]);

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onToggle}
      size={'sm'}
    >
      <DrawerOverlay />
      <DrawerContent zIndex={3}>
        <DrawerBody bgColor={'#F3F1E8'}>{<MobileNav primaryColor="black" />}</DrawerBody>
        <DrawerFooter
          bgColor={'#F3F1E8'}
          justifyContent={'center'}
          alignItems={'center'}
          padding={'40px'}
        >
          <Image
            src={'/icons/close_ic.svg'}
            borderRadius={100}
            width={50}
            height={50}
            alignSelf={'center'}
            className={s.btnClose}
            onClick={onClose}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMobileMenu;
