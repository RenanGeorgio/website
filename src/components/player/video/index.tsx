import { Suspense } from 'react';
import VideoComponent from './video-component';
import VideoSkeleton from '../ui/VideoSkeleton.jsx'

 
export default function Video() {
  return (
    <section>
      <Suspense fallback={<VideoSkeleton />}>
        <VideoComponent />
      </Suspense>
    </section>
  )
}