import MainLayout from '@layouts/MainLayout';
import TeamModule from '@/modules/team';

const TeamPage = () => {
  return (
    <MainLayout
      hideFooter={true}
      headerProps={{
        bgColor: 'transparent',
        color: 'black',
        position: 'absolute',
      }}
    >
      <TeamModule />
    </MainLayout>
  );
};

export default TeamPage;
