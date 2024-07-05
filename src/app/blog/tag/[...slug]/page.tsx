'use client';

import MainLayout from '@/layouts/MainLayout';
import TagBlogModule from '@/modules/tagBlogModule';

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json());
//
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

const TagPage = ({ params }) => {
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <TagBlogModule />
    </MainLayout>
  );
};

export default TagPage;
