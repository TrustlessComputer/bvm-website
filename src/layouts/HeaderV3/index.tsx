import Main, { TMainHeader } from '@layouts/HeaderV3/Main';
import s from './style.module.scss';

export type HeaderV3Props = TMainHeader & {
  position?: 'absolute' | 'relative';
  bgColor?: string;
  showBanner?: boolean;
};

const HeaderV3 = ({ position, color, colorLogo, bgColor, showBanner }: HeaderV3Props) => {
  return (
    <div className={`${s.header}`} style={{ position: position }}>
      <Main color={color} colorLogo={colorLogo} backgroundColor={bgColor} showBanner={showBanner} />
    </div>
  );
};

export default HeaderV3;
