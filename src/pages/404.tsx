// @ts-nocheck
import React from 'react';
import Error from 'next/error';
import Layout from '@components/layout';

const NotFoundPage = ({ data }: any) => {
  const { site, menus, page } = data;

  if (!page) {
    return (
      <Error
        title={`"Error Page (404)" is not set in Sanity, or the page data is missing`}
        statusCode="Data Error"
      />
    )
  }

  return (
    <Layout
      site={site}
      menus={menus}
      page={{
        seo: page.seo,
      }}
    >
      {page.modules?.map((_module, _key) => (
        {/*<Module key={key} index={key} data={module} />*/}
      ))}
    </Layout>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
export async function getStaticProps({ preview, previewData }) {
  return {
    props: {
      data: {},
    },
  }
}

export default NotFoundPage;