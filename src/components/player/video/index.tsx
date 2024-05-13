import { Suspense } from 'react';
import { VideoComponent } from './video-component';
 
export default function Video() {
  return (
    <section>
      <Suspense fallback={<p>Loading video...</p>}>
        <VideoComponent />
      </Suspense>
    </section>
  )
}