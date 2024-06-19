import MainLayout from '@layouts/MainLayout';
import TeamModule from '@/modules/team';

const TeamPage = () => {
  return (
    <MainLayout
      hideFooter={true}
      headerProps={{
        color: 'black',
      }}
    >
      <TeamModule />
    </MainLayout>
  );
};

export default TeamPage;
