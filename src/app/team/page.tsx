'use client';

import MainLayout from '@/layouts/MainLayout';
import TeamModule from '@/modules/team';

const Team = () => {
  return (
    <MainLayout headerProps={{ bgColor: '#FFFFFF', color: 'black' }} hideFooter>
      <TeamModule />
    </MainLayout>
  );
};

export default Team;
