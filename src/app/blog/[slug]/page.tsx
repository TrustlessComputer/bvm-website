import MainLayout from '@/layouts/MainLayout';
import BLogDetail from '@/modules/blog/detail';
import { APP_NAME } from '@/config/metadata';
import { fetchPostById, fetchRelatedPostsById } from '@/services/blog';
import { useRouter } from 'next/navigation';


type TBlogDetailPage = {
  params: { slug: string }
}

export async function generateMetadata({ params }: TBlogDetailPage) {

  const data = await fetchPostById(params?.slug);
  return {
    title: data?.title,
    openGraph: {
      title: `${data?.title}`,
      description: `${data?.excerpt}`,
      type: 'website',
      url: APP_NAME,
      images: [
        {
          url: `${data?.thumbnail}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const BlogDetailPage = async ({ params }: TBlogDetailPage) => {
  const data = await fetchPostById(params?.slug);

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      {data && <BLogDetail blogData={data} />}
    </MainLayout>
  );
};

export default BlogDetailPage;
