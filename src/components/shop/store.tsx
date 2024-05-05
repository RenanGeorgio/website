import * as React from 'react';
import Error from 'next/error';
import Layout from '@components/layout';
//import { Module } from '@components/modules';
import Container from '@components/container';
import Intro from '@components/intro';
import { Obj } from '@typograph/types';

interface Props {
  site?: Obj;
  page?: Obj;
  children?: React.ReactNode;
}

function StoreComponent(data: Props) {
  const { site, page } = data;

  if (!page) {
    return (
      // @ts-ignore
      <Error title={`page data is missing`} statusCode="Data Error" />
    )
  }

  return (
    <Layout site={site} page={page}>
      <Container>
        <Intro />
        {page?.modules?.map((module: Obj, key: number | string) => (
          {/*<Module key={key} index={key} data={module} />*/}
        ))}
      </Container>
    </Layout>
  )
}

export default StoreComponent