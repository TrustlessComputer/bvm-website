import MainLayout from '@/layouts/MainLayout';
import { DATA_BLOG, DATA_BLOG_DETAIL } from '@/modules/blog/data_blog';
import BLogDetail from '@/modules/blog/detail';

// export async function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json());
//   // return posts.map((post) => ({
//   //   slug: post.slug,
//   // }));
// }

const BlogDetailPage = ({ params }) => {
  // const data = DATA_BLOG.find((item) => item.slug === params.slug[0]);

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BLogDetail data={DATA_BLOG_DETAIL} />
    </MainLayout>
  );
};

export default BlogDetailPage;
