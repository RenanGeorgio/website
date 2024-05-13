import { GetStaticProps } from 'next';
import { getAllSpeakers } from '@lib/cms-api';
import { META_DESCRIPTION } from '@assets/constants';
import Page from '@components/page';
import SpeakersGrid from '@components/speakers-grid';
import Layout from '@components/layout';
import Header from '@components/header';
import { Speaker } from '@types';

type Props = {
  speakers: Speaker[];
};

export default function Speakers({ speakers }: Props) {
  const meta = {
    title: 'Speakers - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Speakers" description={meta.description} />
        <SpeakersGrid speakers={speakers} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const speakers = await getAllSpeakers();

  return {
    props: {
      speakers
    },
    revalidate: 60
  };
};