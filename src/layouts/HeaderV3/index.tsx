import Main from '@layouts/HeaderV3/Main';
import s from './style.module.scss';

export type HeaderV3Props = {
  position?: 'absolute' | 'relative';
};

const HeaderV3 = ({ position = 'absolute' }: HeaderV3Props) => {
  return (
    <div className={`${s.header}`}>
      <Main />
    </div>
  );
};

export default HeaderV3;
