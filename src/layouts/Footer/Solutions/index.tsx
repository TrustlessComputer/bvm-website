import React from 'react';
import s from './styles.module.scss';
import SubMenu from '@layouts/Footer/SubMenu';
import GroupMenu from '@layouts/Footer/GroupMenu';
import { FOOTER_DATA } from '@layouts/Footer/footer-datas';

export default function Solutions() {

  return <GroupMenu title={'Solutions'}>
    <>
      <div className={s.content_gr}>
        <div className={s.content_gr_item}>
          {FOOTER_DATA.solutions[0] && <SubMenu {...FOOTER_DATA.solutions[0]} />}
        </div>
        <div className={s.content_gr_item}>
          {FOOTER_DATA.solutions[1] && <SubMenu {...FOOTER_DATA.solutions[1]} />}
        </div>
      </div>
      <div className={s.content_gr}>
        <div className={s.content_gr_item}>
          {FOOTER_DATA.solutions[2] && <SubMenu {...FOOTER_DATA.solutions[2]} />}
        </div>
      </div>
    </>
  </GroupMenu>;
}
