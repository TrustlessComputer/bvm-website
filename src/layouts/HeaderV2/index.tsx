import Main from '@layouts/HeaderV2/Main';
import Top from '@layouts/HeaderV2/Top';
import s from './style.module.scss';

export type HeaderV2Props = {
  position?: 'absolute' | 'relative';
};

const HeaderV2 = ({ position = 'absolute' }: HeaderV2Props) => {
  return (
    <div className={`${s.header}`}>
      <div className="container">
        <Top />
        <Main />
      </div>
    </div>
  );
};

export default HeaderV2;
