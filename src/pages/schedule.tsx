import { GetStaticProps } from 'next';
import { getAllStages } from '@lib/cms-api';
import { META_DESCRIPTION } from '@assets/constants';
import Page from '@components/page';
import Schedule from '@components/schedule';
import Header from '@components/header';
import { Stage } from '@types';

type Props = {
  allStages: Stage[];
};

export default function SchedulePage({ allStages }: Props) {
  const meta = {
    title: 'Schedule - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Header hero="Schedule" description={meta.description} />
      <Schedule allStages={allStages} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allStages = await getAllStages();

  return {
    props: {
      allStages
    },
    revalidate: 60
  };
};