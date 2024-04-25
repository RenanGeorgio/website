import Error from 'next/error'
import { getStaticPage, queries } from '@data'
import Layout from '@components/layout'
import { Module } from '@components/modules'
import Container from '@components/container'
import Intro from '@components/intro'
import { Obj } from '@typograph/types'
import { getStaticPageSchema } from '@lib/cms-providers/dato'

interface Props {
  data: {
    siteInfo?: Obj
    page?: Obj
  }
  children?: React.ReactNode
}

function Home({ data }: Props) {
  console.log("home data", data)
  const { currentSite, page } = data
  if (!page) {
    return (
      // @ts-ignore
      <Error
        title={`"Home Page" is not set in Sanity, or the page data is missing`}
        statusCode="Data Error"
      />
    )
  }

  console.log(currentSite, 'siteInfo')
  return (
    <Layout site={currentSite} page={page}>
      <Container>
        <Intro />
        {page?.modules?.map((module: Obj, key: number | string) => (
          <Module key={key} index={key} data={module} />
        ))}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview, previewData }: any) {
  console.log(preview)

  const pageData: any = await getStaticPageSchema(
    //   `
    //   *[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]{
    //     "id": _id,
    //     hasTransparentHeader,
    //     modules[]{
    //       defined(_ref) => { ...@->content[0] {
    //         ${queries.modules}
    //       }},
    //       !defined(_ref) => {
    //         ${queries.modules},
    //       }
    //     },
    //     title,
    //     seo
    //   }
    // `,

    `  page {
      id
      pageType
      slug
      ishome
      isshop
      }
    `,
    {
      active: preview,
      token: previewData?.token,
    }
  )

  return {
    props: {
      data: pageData,
    },
  }
}

export default Home