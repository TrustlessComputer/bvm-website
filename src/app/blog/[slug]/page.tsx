import MainLayout from '@/layouts/MainLayout';
import BLogDetail from '@/modules/blog/detail';
import { APP_NAME } from '@/config/metadata';
import { fetchPostById } from '@/services/blog';
import { Metadata } from 'next';


type TBlogDetailPage = {
  params: { slug: string }
}


export async function generateMetadata({ params }: TBlogDetailPage) {

  const data = await fetchPostById(params?.slug);
  const title = `${data?.title}`;
  const description = data?.excerpt ? data.excerpt : ''
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: APP_NAME,
      images: [
        {
          url: `${data?.thumbnail}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description,
      images: [
        {
          url: `${data?.thumbnail}`,
          alt: title,
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
      bodyColor={'#fff'}
    >
      {data && <BLogDetail blogData={data} />}
    </MainLayout>
  );
};

export default BlogDetailPage;
