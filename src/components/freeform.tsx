import cx from 'classnames';
import { BlockContent } from '@components/block';
import { FreeFormProps } from '@typograph/types/queries';

const Freeform: React.FC<any> = (data: FreeFormProps) => {
  const { maxWidth, textAlign, content } = data;

  return (
    <BlockContent className={cx(maxWidth, textAlign)} blocks={content} />
  );
}

export default Freeform;