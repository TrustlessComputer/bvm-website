import React, { PropsWithChildren } from 'react';
import SubMenu from '@layouts/Footer/SubMenu';
import GroupMenu from '@layouts/Footer/GroupMenu';
import { FOOTER_DATA } from '@layouts/Footer/footer-datas';


interface IGroup extends PropsWithChildren {
  title: string,
  className?: string,
  menu: any
}

export default function Productions() {

  return <GroupMenu title={'Productions'}>
    {
      FOOTER_DATA.products.map((subMenu) => {
        return <SubMenu {...subMenu} />;
      })
    }
  </GroupMenu>;
}
