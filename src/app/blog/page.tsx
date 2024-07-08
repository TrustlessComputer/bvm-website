import MainLayout from '@/layouts/MainLayout';
import BlogModule from '@/modules/blog';
import { fetchAllPosts } from '@/services/blog';
import { Metadata } from 'next';
import { APP_DESCRIPTION, APP_NAME } from '@/config/metadata';


export const metadata: Metadata = {
  title: `Blogs | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};

const BVMPage = async ({ searchParams }: { searchParams: Params }) => {
  const posts = await fetchAllPosts(searchParams);
  console.log('posts', posts);
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BlogModule {...posts} />
    </MainLayout>
  );
};

export default BVMPage;
