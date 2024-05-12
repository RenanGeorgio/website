import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Container from '@components/container';
import PostBody from '@components/post/post-body';
import Header from '@components/header';
import PostHeader from '@components/post/post-header';
import Layout from '@components/layout';
import Page from '@components/page';
import PostTitle from '@components/post/post-title';
import { getPostBySlug, getAllPosts } from '@lib/post';
import { CMS_NAME, META_DESCRIPTION } from '@assets/constants';
import markdownToHtml from '@lib/markdownToHtml';
import { PostType } from '@types';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();

  const meta = {
    title: 'Speakers - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  
  return (
    <Page site={meta} preview={preview}>
      <Layout>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-32">
                <Head>
                  <title>{title}</title>
                  <meta property="og:image" content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />
                <PostBody content={post.content} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </Page>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts?.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}