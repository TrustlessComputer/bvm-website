import Main, { TMainHeader } from '@layouts/HeaderV3/Main';
import s from './style.module.scss';
import TopMenu from '@layouts/HeaderV4/TopMenu';

export type HeaderV3Props = TMainHeader & {
  position?: 'absolute' | 'relative';
  bgColor?: string;
};

const HeaderV4 = ({ position, color, colorLogo, bgColor }: HeaderV3Props) => {
  return (
    <div className={`${s.header}`} style={{ position: position }}>
      <TopMenu />
      <Main color={color} colorLogo={colorLogo} backgroundColor={bgColor} />
    </div>
  );
};

export default HeaderV4;
