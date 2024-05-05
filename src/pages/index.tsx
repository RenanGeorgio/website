import * as React from 'react';
import Error from 'next/error';
import { getStaticPage } from '@data/cms-api';
import Layout from '@components/layout';
import Container from '@components/container';
import Intro from '@components/intro';
import { Obj } from '@typograph/types';

interface Props {
  site?: Obj;
  page?: Obj;
  children?: React.ReactNode;
}

function Home(data: Props) {
  const { site, page } = data;

  if (!page) {
    return (
      // @ts-ignore
      <Error title={`"Home Page" is not set, or the page data is missing`} statusCode="Data Error" />
    )
  }

  return (
    <Layout site={site} page={page}>
      <Container>
        <Intro />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview }: any) {
  const pageData: any = await (getStaticPage(preview)) || [];

  return {
    props: {
      data: pageData,
    },
  }
}

export default Home