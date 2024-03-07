import Photo from '@components/photo';
import { PhotoType } from '@typograph/types';

const DividerPhoto: React.FC<any> = (data: PhotoType) => {
  const { photo } = data;

  if (!photo) {
    return null;
  }

  return (
    <div className="divider">
      <Photo
        photo={photo}
        width={1600}
        srcSizes={[800, 1000, 1200, 1600]}
        sizes="100vw"
      />
    </div>
  )
}

export default DividerPhoto;