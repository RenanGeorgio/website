import cx from 'classnames';
import { useSiteContext, useAddItem } from '@lib/context';

interface Props {
  productID: number | string;
  quantity?: number;
  className: string;
  children?: React.ReactNode;
}

const ProductAdd = ({ productID, quantity = 1, className, children }: Props) => {
  const addItemToCart = useAddItem();
  const { shopifyClient, isLoading, isAdding } = useSiteContext();

  // Check that Shopify is connected
  if (!shopifyClient) {
    return (
      // @ts-ignore
      <span className={cx('is-disabled', className)} disabled>
        Unavailable
      </span>
    )
  }

  return (
    <>
      {isLoading ? (
        <button className={cx('is-disabled', className)} disabled>
          Loading...
        </button>
      ) : (
        <button
          className={cx(className, { 'is-disabled': isAdding })}
          onClick={() => addItemToCart(productID, quantity)}
        >
          {isAdding ? 'Adding...' : <>{children ? children : 'Add to Cart'}</>}
        </button>
      )}
    </>
  );
}

export default ProductAdd;
