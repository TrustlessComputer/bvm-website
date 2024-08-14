'use client';

import MenuEditItem from '@/modules/blockchains/detail_v2/components/MenuEdit/MenuEditItem';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { Image, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { dappSelector } from '@/stores/states/dapp/selector';

export enum MenuEditItemEnum {
  CustomizeHomePage = 0,
  EditDomain,
  UpdateTemplate,
}

export type MenuEditItemType = {
  key: string;
  value: MenuEditItemEnum;
  title: string;
};

const MenuEditItemList: MenuEditItemType[] = [
  {
    key: 'A',
    value: MenuEditItemEnum.UpdateTemplate,
    title: 'Update Template',
  },
  {
    key: 'B',
    value: MenuEditItemEnum.EditDomain,
    title: 'Edit Domain',
  },
];

const MenuSettingChain = () => {
  const { order } = useChainProvider();
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const chain = useAppSelector(dappSelector)?.chain;
  const router = useRouter();

  const isOwner =
    order?.tcAddress?.toLowerCase() ===
    accountInforL2Service?.tcAddress?.toLowerCase();

  const _MenuEditItemList = React.useMemo(() => {
    return !!chain?.dappURL
      ? MenuEditItemList
      : MenuEditItemList.filter(
          (item) => item.value !== MenuEditItemEnum.UpdateTemplate
        );
  }, [chain?.dappURL]);

  const itemOnClick = (item: MenuEditItemType) => {
    switch (item.value) {
      case MenuEditItemEnum.CustomizeHomePage:
        {
          //TO DO ABC
          alert(1);
        }
        break;
      case MenuEditItemEnum.EditDomain:
        router.push(`/domain/${order?.chainId}`);
        break;
      case MenuEditItemEnum.UpdateTemplate:
        router.push(`/template/${order?.chainId}`);
        break;
      default:
        break;
    }
  };

  return (
    <Menu>
      <MenuButton>
        <Image
          src={`/icons/setting-chain-ic.svg`}
          fit={'contain'}
          maxW={'48px'}
          maxH={'48px'}
          _hover={{
            cursor: 'pointer',
            opacity: 0.8,
          }}
        />
      </MenuButton>
      <MenuList
        bgColor={'#fff'}
        p={'5px'}
        borderColor={'transparent'}
        gap={'10px'}
      >
        {_MenuEditItemList.map((item, index) => (
          <MenuEditItem
            key={`${item.key}-${index}`}
            title={item.title}
            onClick={() => itemOnClick(item)}
          />
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuSettingChain;
