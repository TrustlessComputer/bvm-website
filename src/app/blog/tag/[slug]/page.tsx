import MainLayout from '@/layouts/MainLayout';
import TagBlogModule from '@/modules/tagBlogModule';
import { Metadata } from 'next';

type TTagPage = {
  params: { slug: string }
  searchParams: Params;
}


export async function generateMetadata(
  { params, searchParams }: TTagPage,
): Promise<Metadata> {

  const slug = params.slug;
  return {
    title: slug,
  };
}


const TagPage = async ({ params, searchParams }: TTagPage) => {

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      bodyColor={'#fff'}
    >
      <TagBlogModule searchParams={searchParams} tag={params.slug} />
    </MainLayout>
  );
};

export default TagPage;
