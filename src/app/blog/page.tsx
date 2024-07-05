import MainLayout from '@/layouts/MainLayout';
import BlogModule from '@/modules/blog';
import { WP_URL } from '@/config';

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

const QUERY = {
  query: `{
      posts {
        edges {
          node {
            title
            excerpt
            date
            slug
            categories {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
               sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
          }  
        }
      }
    }`,
}

const BVMPage = async () => {
  const posts = await fetch(WP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    body: JSON.stringify(QUERY),
  }).then((res) => res.json())  ;

  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BlogModule blogsData={posts.data.posts}/>
    </MainLayout>
  );
};

export default BVMPage;
