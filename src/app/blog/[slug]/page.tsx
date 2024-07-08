import MainLayout from '@/layouts/MainLayout';
import BLogDetail from '@/modules/blog/detail';
import { WP_URL } from '@/config';
import { transformObject } from '@utils/transformObjectGraphQL';
import { APP_NAME } from '@/config/metadata';
import { fetchPostById, fetchRelatedPostsById } from '@/services/blog';


type TBlogDetailPage= {
  params: { slug: number |string }
}

// export async function generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json());
//   // return posts.map((post) => ({
//   //   slug: post.slug,
//   // }));
// }
//
// async function fetchBlog(slug: string) {
//   const QUERY = {
//     query: `{
//       post(id: "${slug}", idType: SLUG) {
//         title
//         content
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         tags {
//           edges {
//             node {
//               name
//               slug
//             }
//           }
//         }
//         author {
//           node {
//             name
//           }
//         }
//         date
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
//   return transformObject(postsDetail.data.post)
// }

export async function generateMetadata({ params }: TBlogDetailPage) {

  // const formattedKeyObj: any = await fetchBlog(params.slug[0])
  // console.log('formattedKeyObj', formattedKeyObj);
  // return {
  //   title: formattedKeyObj?.title,
  //   openGraph: {
  //     title: `${formattedKeyObj?.title}`,
  //     description: `${formattedKeyObj?.description}`,
  //     type: 'website',
  //     url: APP_NAME,
  //     images: [
  //       {
  //         url: `${formattedKeyObj?.featuredImage?.node?.sourceUrl}`,
  //         width: 1200,
  //         height: 630,
  //       },
  //     ],
  //   },
  // }
}

const BlogDetailPage = async ({ params }: TBlogDetailPage) => {
  const data = await fetchPostById(params?.slug)
  const relativePost = await fetchRelatedPostsById(params?.slug);

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BLogDetail blogData={data} relativePost={relativePost}/>
    </MainLayout>
  );
};

export default BlogDetailPage;
