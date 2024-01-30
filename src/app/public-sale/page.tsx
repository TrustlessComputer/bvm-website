import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import PublicSaleModule from '@/modules/PublicSale';

const PublicSale = () => {
  return (
    <MainLayout headerProps={{bgColor: '#0E0E0E'}}>
      <div className={s.container}>
        <PublicSaleModule />
      </div>
    </MainLayout>
  );
};

export default PublicSale;
