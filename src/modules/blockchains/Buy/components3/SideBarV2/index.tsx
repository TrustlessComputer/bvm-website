import React from 'react';

import s from './styles.module.scss';
import { IModelCategory } from '@/types/customize-model';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';


export default function SidebarV2() {
  const [isActive, setIsActive] = React.useState<string>('');

  const {
    parsedCategories: items,
  } = useModelCategoriesStore();
  return (
    <div className={s.sidebar}>
      <div className={s.inner}>
        {items &&
          items.map((item) => {
            if (item.hidden) {
              return null;
            }

            return (
              <a
                href={`#${item.key}`}
                className={`${s.item} ${isActive === item.key && s.isActive}`}
                key={item.key}
                onClick={() => setIsActive(item.key)}
              >
                <div className={s.item_inner}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_40431_565" fill={item.color}>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 4C8.89543 4 8 4.89543 8 6V8H5C3.89543 8 3 8.89543 3 10V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V10C21 8.89543 20.1046 8 19 8H16V6C16 4.89543 15.1046 4 14 4H10Z"
                      />
                    </mask>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 4C8.89543 4 8 4.89543 8 6V8H5C3.89543 8 3 8.89543 3 10V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V10C21 8.89543 20.1046 8 19 8H16V6C16 4.89543 15.1046 4 14 4H10Z"
                      fill={item.color}
                    />
                    <path
                      d="M8 8V9H9V8H8ZM16 8H15V9H16V8ZM9 6C9 5.44772 9.44772 5 10 5V3C8.34315 3 7 4.34315 7 6H9ZM9 8V6H7V8H9ZM5 9H8V7H5V9ZM4 10C4 9.44772 4.44772 9 5 9V7C3.34315 7 2 8.34315 2 10H4ZM4 18V10H2V18H4ZM5 19C4.44772 19 4 18.5523 4 18H2C2 19.6569 3.34315 21 5 21V19ZM19 19H5V21H19V19ZM20 18C20 18.5523 19.5523 19 19 19V21C20.6569 21 22 19.6569 22 18H20ZM20 10V18H22V10H20ZM19 9C19.5523 9 20 9.44771 20 10H22C22 8.34315 20.6569 7 19 7V9ZM16 9H19V7H16V9ZM15 6V8H17V6H15ZM14 5C14.5523 5 15 5.44772 15 6H17C17 4.34315 15.6569 3 14 3V5ZM10 5H14V3H10V5Z"
                      fill="#CC6234"
                      mask="url(#path-1-inside-1_40431_565)"
                    />
                  </svg>

                  <div className={s.title}>
                    <h4>
                      {item.title}
                      <sup>{item.required && '*'}</sup>
                    </h4>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}
