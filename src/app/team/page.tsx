import MainLayout from '@layouts/MainLayout';
import TeamModule from '@/modules/team';

const TeamPage = () => {
  return (
    <MainLayout
      headerProps={{
        bgColor: 'transparent',
        color: 'black',
        position: 'absolute',
      }}
      bodyColor={'#f2f2f2'}
    >
      <TeamModule />
    </MainLayout>
  );
};

export default TeamPage;
