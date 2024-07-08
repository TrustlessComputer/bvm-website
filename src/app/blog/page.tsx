import MainLayout from '@/layouts/MainLayout';
import BlogModule from '@/modules/blog';
import { fetchAllPosts } from '@/services/blog';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Blogs',
  description: 'BVM',
};


const BVMPage = async ({ searchParams }: { searchParams: Params }) => {
  console.log('searchParams', searchParams);
  const posts = await fetchAllPosts(searchParams);


  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BlogModule blogsData={posts} />
    </MainLayout>
  );
};

export default BVMPage;
