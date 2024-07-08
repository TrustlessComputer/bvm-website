import MainLayout from '@/layouts/MainLayout';
import BlogModule from '@/modules/blog';
import { WP_URL } from '@/config';
import { useSearchParams } from 'next/navigation';
import { fetchAllPosts, ISearchParams } from '@/services/blog';

// export async function generateStaticParams() {
//   const QUERY = {
//     query: `{
//       posts {
//         edges {
//           node {
//             title
//             content
//             tags {
//               edges {
//                 node {
//                   id
//                 }
//               }
//             }
//           }
//         }
//       }
//     }`,
//   }
//
//   const posts = await fetch('https://blog.bvm.network/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(QUERY),
//   }).then((res) => res.json()).then(json => console.log(json)) ;
//   console.log('postsgenerateStaticParams', posts);
//   return {
//     posts
//   };
//
//   // return posts;
// }


const BVMPage = async ({ searchParams }: {
  searchParams?: ISearchParams;
}) => {
  // console.log('searchParams', searchParams);
  const posts = await fetchAllPosts(searchParams);

  console.log('____posts', posts);

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      {/*<BlogModule blogsData={posts.data.posts} pagination={posts.data.pageInfo} />*/}
    </MainLayout>
  );
};

export default BVMPage;
