const Robots = () => {
  return (
    <div>
      Should not be navigated via Link. Use a standard {`<a>`} tag!
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps({ req, res }) {
  res.setHeader('Content-Type', 'text/plain')
  res.write(`Sitemap: https://${req.headers.host}/sitemap.xml
    
User-agent: *
Allow: /*
Disallow: /api/*`)
  res.end()

  return { props: {} }
}

export default Robots