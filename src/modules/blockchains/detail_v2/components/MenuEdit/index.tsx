'use client';

import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
} from '@chakra-ui/react';
import MenuEditItem from './MenuEditItem';

export enum MenuEditItemEnum {
  // UpdateYourChainInfor = 0,
  ABC = 0,
  ConfigYourDAppsDomain,
}

export type MenuEditItemType = {
  key: string;
  value: MenuEditItemEnum;
  title: string;
};

const MenuEditItemList: MenuEditItemType[] = [
  // {
  //   key: 'A',
  //   value: MenuEditItemEnum.ABC,
  //   title: 'ABC Title',
  // },
  {
    key: 'B',
    value: MenuEditItemEnum.ConfigYourDAppsDomain,
    title: 'Configure your dApps domain',
  },
];

type MenuProps = {
  itemOnClick: (item: MenuEditItemType) => void;
};

const MenuEdit = (props: MenuProps) => {
  const { itemOnClick } = props;

  return (
    <Menu>
      <MenuButton>
        <Image
          src={`/icons/pencil_edit_grey.svg`}
          fit={'contain'}
          maxW={'24px'}
          maxH={'24px'}
          _hover={{
            cursor: 'pointer',
            opacity: 0.8,
          }}
        />
      </MenuButton>
      <MenuList bgColor={'#fff'} zIndex={9999}>
        {MenuEditItemList.map((item, index) => (
          <>
            <MenuEditItem
              key={`${item.key}-${index}`}
              title={item.title}
              onClick={() => itemOnClick(item)}
            />
            {index < MenuEditItemList.length - 1 && (
              <MenuDivider bgColor={'lightgrey'} />
            )}
          </>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuEdit;
