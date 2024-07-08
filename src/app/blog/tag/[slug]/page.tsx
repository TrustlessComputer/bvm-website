import MainLayout from '@/layouts/MainLayout';
import TagBlogModule from '@/modules/tagBlogModule';
import { WP_URL } from '@/config';
import { transformObject } from '@utils/transformObjectGraphQL';
import { Metadata } from 'next';
import { fetchAllPosts } from '@/services/blog';

type TTagPage = {
  params: { slug: string }
  searchParams: Params;
}


export async function generateMetadata(
  { params, searchParams }: TTagPage,
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  return {
    // title: product.title,
    openGraph: {
      // images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}



// async function fetchBlogByTag(slug: string) {
//   const QUERY = {
//     query: `{
//       posts(where: { tagSlugIn: "${slug}" }) {
//         edges {
//           node {
//             title
//             excerpt
//             date
//             slug
//             categories {
//               edges {
//                 node {
//                   name
//                 }
//               }
//             }
//             featuredImage {
//               node {
//                sourceUrl
//               }
//             }
//             author {
//               node {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }`,
//   }
//
//   const postsDetail = await fetch(WP_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     cache: 'no-cache',
//     body: JSON.stringify(QUERY),
//   }).then((res) => res.json());
//   return transformObject(postsDetail.data.posts)
// }

const TagPage = async ({ params, searchParams }: TTagPage) => {
  const posts = await fetchAllPosts(searchParams);

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <TagBlogModule blogData={posts} />
    </MainLayout>
  );
};

export default TagPage;
