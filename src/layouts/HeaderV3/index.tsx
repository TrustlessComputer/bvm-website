import Main, { TMainHeader } from '@layouts/HeaderV3/Main';
import s from './style.module.scss';
import DrawerMobileMenu from '../HeaderV2/components/DrawerMenu';

export type HeaderV3Props = TMainHeader & {
  position?: 'absolute' | 'relative';
  bgColor?: string;
};

const HeaderV3 = ({
  position = 'absolute',
  color,
  colorLogo,
}: HeaderV3Props) => {
  return (
    <div className={`${s.header}`}>
      <Main color={color} colorLogo={colorLogo} />
    </div>
  );
};

export default HeaderV3;
