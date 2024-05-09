import MainLayout from '@/layouts/MainLayout';
import VoteDetailModule from '@/modules/VoteDetail';

const Dao = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <VoteDetailModule />
    </MainLayout>
  );
};

export default Dao;
