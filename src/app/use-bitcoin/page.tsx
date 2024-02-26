import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import UseBitcoinModule from '@/modules/UseBitcoin';

const UseBitcoin = () => {
  return (
    <MainLayout headerProps={{bgColor: '#FFFFFF', color: 'black'}}>
      <div className={s.container}>
        <UseBitcoinModule />
      </div>
    </MainLayout>
  );
};

export default UseBitcoin;
