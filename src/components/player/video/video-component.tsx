import BackgroundVideo from 'next-video/background-video';

export async function VideoComponent() {
  const src = await getVideoSrc();
 
  return (
    <video width="320" height="240" controls preload="none" aria-label="Video player">
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export async function BackgroundVideoComponent() {
  const src = await getVideoSrc();
 
  return (
    <>
      <section>
        <BackgroundVideo 
          src={src}
          disableTracking
          maxResolution='720p'
          style={{ aspectRatio: 1.9 }}
        >
          <h1>next-video</h1>
          <p>
            A React component for adding video to your Next.js application.
            It extends both the video element and your Next app with features
            for automatic video optimization.
          </p>
        </BackgroundVideo>
      </section>
    </>
  );
}