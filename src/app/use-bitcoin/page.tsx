import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import UseBitcoinModule from '@/modules/UseBitcoin';

const UseBitcoin = () => {
  return (
    <MainLayout headerProps={{bgColor: '#0E0E0E'}}>
      <div className={s.container}>
        <UseBitcoinModule />
      </div>
    </MainLayout>
  );
};

export default UseBitcoin;
