import s from './style.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';
import { COMMUNITY_ITEMS, NAV_ITEMS } from '@layouts/HeaderV2/menuConfig';
import Link from 'next/link';


const Main = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        {
          NAV_ITEMS.map((item, index) => {
            return item.isHide || (
              <div className={s.itemWrapper} key={item.label}>
                <Link href={item.href || ''}>
                  <div className={s.item}>
                    <p className={s.itemLabel}>{item.label}</p>
                    {
                      item.subMenu && (
                        <div className={s.icon}>
                          <ImagePlaceholder src={'./icons/ic_down.svg'} alt={'ic_down'} width={20} height={20} />
                        </div>
                      )
                    }
                  </div>
                </Link>
                <div className={s.dropdown}></div>
              </div>
            )
          })
        }
      </div>
      <div className={s.right}>
        <div className={s.contact}>
          <p className={s.mainLabel}>Contact us</p>
          {
            COMMUNITY_ITEMS.map((item) => (
              <Link href={item.link} className={s.social} key={item.alt} target={'_blank'}>
                <ImagePlaceholder src={item.icon} alt={item.alt} width={20} height={20} />
              </Link>
            ))
          }
        </div>
        <Link href="" className={s.btnBuild}>
          Build on Bitcoin
        </Link>
      </div>
    </div>
  )
}

export default Main
