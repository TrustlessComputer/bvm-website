import MainLayout from '@/layouts/MainLayout';
import BlogModule from '@/modules/blog';
import { fetchAllPosts } from '@/services/blog';
import { Metadata } from 'next';
import { APP_DESCRIPTION, APP_NAME } from '@/config/metadata';


export const metadata: Metadata = {

};

const BVMPage = async ({ searchParams }: { searchParams: Params }) => {
  const posts = await fetchAllPosts(searchParams);

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      bodyColor={'#fff'}
    >
      <BlogModule searchParams={searchParams} />
    </MainLayout>
  );
};

export default BVMPage;
