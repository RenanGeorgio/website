import cx from 'classnames';
import { useToggleCart, useCartCount } from '@lib/context';

export const CartToggle = (): FSX.Element => {
  const toggleCart = useToggleCart();
  const cartCount = useCartCount();

  return (
    <button className="cart-toggle" onClick={() => toggleCart()}>
      Cart
      <span
        className={cx('cart-toggle--count', {
          'is-active': cartCount > 0,
        })}
      >
        {cartCount}
      </span>
    </button>
  )
}