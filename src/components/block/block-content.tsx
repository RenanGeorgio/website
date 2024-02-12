import cx from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import { blockSerializers } from './block-serializers';

const Content = ({ blocks, className }) => {
  if (!blocks) return null

  return (
    <BlockContent
      renderContainerOnSingleChild
      className={cx('rc', className)}
      blocks={blocks}
      serializers={blockSerializers}
    />
  )
}

export default Content