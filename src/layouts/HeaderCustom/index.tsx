import Main, { TMainHeader } from './Main';
import s from './style.module.scss';

export type HeaderV3Props = TMainHeader & {
  position?: 'absolute' | 'relative';
  bgColor?: string;
};

const HeaderCustom = ({
  position,
  color,
  colorLogo,
  bgColor,
}: HeaderV3Props) => {
  return (
    <div className={`${s.header}`} style={{ position: position }}>
      <Main color={color} colorLogo={colorLogo} backgroundColor={bgColor} />
    </div>
  );
};

export default HeaderCustom;
