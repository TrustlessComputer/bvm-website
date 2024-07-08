import MainLayout from '@/layouts/MainLayout';
import TagBlogModule from '@/modules/tagBlogModule';
import { WP_URL } from '@/config';
import { transformObject } from '@utils/transformObjectGraphQL';

type TTagPage = {
  params: { slug: string }
}


// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json());
//
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }


async function fetchBlogByTag(slug: string) {
  const QUERY = {
    query: `{
      posts(where: { tagSlugIn: "${slug}" }) {
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

  const postsDetail = await fetch(WP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    body: JSON.stringify(QUERY),
  }).then((res) => res.json());
  return transformObject(postsDetail.data.posts)
}

const TagPage = async ({ params }: TTagPage) => {
  const listBlogs = await fetchBlogByTag(params.slug[0])
  console.log('params.slug[0]', params.slug[0]);
  console.log(listBlogs);
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <TagBlogModule blogData={listBlogs} />
    </MainLayout>
  );
};

export default TagPage;
