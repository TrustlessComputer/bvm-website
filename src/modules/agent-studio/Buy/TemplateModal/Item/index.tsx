import s from './styles.module.scss';
import Link from 'next/link';

type TItem = {
  heading: string
  price: string
  iconCheck: boolean
  content: string;
  link: string;
  option: string[];
  color: string;
}

const Item = ({ ...props }: TItem) => {

  function handleColor() {
    switch (props.color) {
      // case 'GREEN':
      //   return s.green;
      case 'BLUE':
        return s.blue;
      case 'ORANGE':
        return s.orange;
      default:
        return '';
    }
  }

  return (
    <Link href={props.link} >
      <div className={`${s.wrapper} ${handleColor()}`}>
        {/*------------Heading left------------*/}
        <div className={s.left}>
          <div className={s.iconCheck}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.0046 1.88867C17.8026 1.88867 22.5047 6.59075 22.5047 12.3888C22.5047 18.1868 17.8026 22.8889 12.0046 22.8889C6.20654 22.8889 1.50446 18.1868 1.50446 12.3888C1.50446 6.59075 6.20654 1.88867 12.0046 1.88867ZM9.82409 15.7993L7.2534 13.2265C6.81545 12.7883 6.81536 12.0737 7.2534 11.6355C7.69154 11.1975 8.40933 11.2002 8.84427 11.6355L10.6566 13.4493L15.165 8.94084C15.6032 8.50271 16.3179 8.50271 16.7559 8.94084C17.194 9.37889 17.1934 10.0942 16.7559 10.5317L11.4507 15.8369C11.0132 16.2744 10.2979 16.275 9.85987 15.8369C9.84756 15.8246 9.83569 15.8121 9.82409 15.7993Z"
                    fill={props.iconCheck ? '#00AA6C' : ''} />
            </svg>
          </div>
          <div className={s.headingWrapper}>
            <p className={s.heading}>{props.heading}</p>
            <p className={s.price}>{props.price}/month/rollup</p>
          </div>

        </div>
        {/*------------Options right------------*/}
        <div className={s.right}>
          <p className={s.content}>{props.content}</p>
          <div className={s.listItem}>
            {
              props.option.slice(0, 3).map((option) => (
                <div key={option} className={s.option}>
                  <p>{option}</p>
                </div>
              ))
            }

            <div className={s.option}>
              <p>+{ props.option.slice(3).length} other modules</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
