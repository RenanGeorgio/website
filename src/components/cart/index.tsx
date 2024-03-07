import { useState, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import { m } from 'framer-motion';
import cx from 'classnames';
import { centsToPrice } from '@lib/helpers';
import { Url, Obj } from '@typograph/types';
import { SiteParams, ProductProp, VariantsParams } from '@typograph/types/queries';
import {
  useSiteContext,
  useCartTotals,
  useCartCount,
  useCartItems,
  useCheckout,
  useToggleCart,
} from '@lib/context';
import CartItem from './item';
import EmptyCart  from './empty';

const CartItems = (variants: VariantsParams[]) => { 
    return (
      <div className="cart--items">
        {variants.map(({ variant }: VariantsParams) => {
          // @ts-ignore
          return <CartItem key={variant?.id} item={variant} />
        })}
      </div>
    );
}

const Cart: React.FC<any> = (data: SiteParams) => {
  const { shop } = data;

  if (!shop) {
    return null;
  }

  const { isCartOpen, isUpdating } = useSiteContext();

  const { subTotal } = useCartTotals();
  const cartCount: number = useCartCount();
  const lineItems = useCartItems();
  const checkoutURL: Url | string = useCheckout();

  const toggleCart = useToggleCart();

  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [checkoutLink, setCheckoutLink] = useState<Url | string>(checkoutURL);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): any => {
    if (e?.which === 27) {
      toggleCart(false);
    }
  }

  const goToCheckout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    toggleCart(false);

    setTimeout(() => {
      window.open(checkoutLink, '_self');
    }, 200);
  }

  // update our checkout URL to use our custom domain name
  useEffect(() => {
    if (checkoutURL) {
      // @ts-ignore
      const buildCheckoutLink = shop?.storeURL ? checkoutURL.replace(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g, shop?.storeURL) : checkoutURL
      
      setCheckoutLink(buildCheckoutLink);
    }
  }, [checkoutURL]);

  return (
    <>
      <FocusTrap
        active={isCartOpen && hasFocus}
        focusTrapOptions={{ allowOutsideClick: true }}
      >
        <m.div
          initial="hide"
          animate={isCartOpen ? 'show' : 'hide'}
          variants={{
            show: {
              x: '0%',
            },
            hide: {
              x: '100%',
            },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
          onAnimationComplete={(v) => setHasFocus(v === 'show')}
          className={cx('cart is-inverted', {
            'is-active': isCartOpen,
            'is-updating': isUpdating,
          })}
        >
          <div className="cart--inner">
            <div className="cart--header">
              <div className="cart--title">
                Your Cart <span className="cart--count">{cartCount}</span>
              </div>
              <button className="cart-toggle" onClick={() => toggleCart(false)}>
                Done
              </button>
            </div>

            <div className="cart--content">
              {lineItems?.length ? (
                // @ts-ignore
                <CartItems items={lineItems} />
              ) : (
                <EmptyCart />
              )}
            </div>

            {lineItems?.length > 0 && (
              <div className="cart--footer">
                <div className="cart--subtotal">
                  <span>Subtotal</span>
                  <span>${centsToPrice(subTotal)}</span>
                </div>

                <a
                  href={checkoutLink as string}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => goToCheckout(e)}
                  className="btn is-primary is-inverted is-large is-block"
                >
                  {isUpdating ? 'Updating...' : 'Checkout'}
                </a>

                {shop.cartMessage && (
                  <p className="cart--message">{shop.cartMessage}</p>
                )}
              </div>
            )}
          </div>
        </m.div>
      </FocusTrap>

      <div
        className={cx('cart--backdrop', {
          'is-active': isCartOpen,
        })}
        onClick={() => toggleCart(false)}
      />
    </>
  )
}

export default Cart;