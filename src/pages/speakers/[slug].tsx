import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllSpeakers } from '@lib/cms-api';
import { META_DESCRIPTION } from '@assets/constants';
import Page from '@components/page';
import SpeakerSection from '@components/speaker-section';
import Layout from '@components/layout';
import { Speaker } from '@types';

type Props = {
  speaker: Speaker;
};

export default function SpeakerPage({ speaker }: Props) {
  const meta = {
    title: 'Demo - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page site={meta}>
      <Layout>
        <SpeakerSection speaker={speaker} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const speakers = await getAllSpeakers();
  const currentSpeaker = speakers.find((s: Speaker) => s.slug === slug) || null;

  if (!currentSpeaker) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      speaker: currentSpeaker
    },
    revalidate: 60
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const speakers = await getAllSpeakers();
  const slugs = speakers?.map((s: Speaker) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};