import Head from 'next/head';
import { getAllPosts } from '@lib/post';
import { CMS_NAME } from '@assets/constants';
import Container from '@components/container';
import MoreStories from '@components/more-stories';
import HeroPost from '@components/hero-post';
import Layout from '@components/layout';
import { PostType } from '@types';

type Props = {
  allPosts: PostType[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          {heroPost && (
            <HeroPost
              // @ts-ignore
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
