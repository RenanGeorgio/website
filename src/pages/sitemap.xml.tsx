import React from 'react';
import { GetServerSideProps } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { getAllPages } from '@lib/cms-api';

const Sitemap = () => {
  return (
    <div>
      Should not be navigated via Link. Use a standard {`<a>`} tag!
    </div>
  )
}

export default Sitemap

let sitemap: Buffer | null = null

const addUrls = async (smStream: SitemapStream) => {
  const allPages = await getAllPages();
  
  allPages?.map((page: any) => {
    smStream.write({ url: `/${page.slug}`, changefreq: 'weekly', priority: 0.7 })
  })
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  if (!req || !res) {
    return {
      props: {},
    }
  }
  res.setHeader("Content-Type", "application/xml")
  res.setHeader("Content-Encoding", "gzip")

  // If our sitemap is cached, we write the cached sitemap, no query to the CMS.
  if (sitemap) {
    res.write(sitemap)
    res.end()
    return {
      props: {},
    }
  }
  const smStream = new SitemapStream({ hostname: `https://${req.headers.host}/` })
  const pipeline = smStream.pipe(createGzip())

  try {
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 })
    smStream.write({ url: '/shop', changefreq: 'daily', priority: 0.9 })
    //await addUrls(smStream)
    smStream.end()
    
    const resp = await streamToPromise(pipeline);

    sitemap = resp;

    res.write(resp);
    res.end();
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.write("Could not generate sitemap.");
    res.end();
  }

  return {
    props: {},
  }
}