'use client';

import MainLayout from '@/layouts/MainLayout';

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const TagPage = ({ params }) => {
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <h1>TAGs</h1>
    </MainLayout>
  );
};

export default TagPage;
