import Main, { TMainHeader } from '@layouts/HeaderV4/Main';
import s from './style.module.scss';
import TopMenu from '@layouts/HeaderV4/TopMenu';
import { useIsMobile } from '@hooks/useWindowResize';

export type HeaderV3Props = TMainHeader & {
  position?: 'absolute' | 'relative';
  bgColor?: string;
};

const HeaderV4 = ({ position, color, colorLogo, bgColor }: HeaderV3Props) => {
  const isMobile = useIsMobile();
  return (
    <div className={`${s.header}`} style={{ position: position }}>
      {!isMobile && <TopMenu />}
      <Main color={color} colorLogo={colorLogo} backgroundColor={bgColor} />
    </div>
  );
};

export default HeaderV4;
