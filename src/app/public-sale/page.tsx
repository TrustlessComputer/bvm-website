import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import PublicSaleModule from '@/modules/PublicSale';

const PublicSale = () => {
  return (
    <MainLayout>
      <div className={s.container}>
        <PublicSaleModule />
      </div>
    </MainLayout>
  );
};

export default PublicSale;
