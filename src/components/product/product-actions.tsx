import { useState } from 'react';
import { ProductCounter, ProductAdd, ProductWaitlist } from '@components/product';
import { ProductProp, VariantsParams } from '@typograph/types/queries';

interface Props {
  activeVariant: VariantsParams["variant"];
  klaviyoAccountID: ProductProp["klaviyoAccountID"];
};

const ProductActions: React.FC<any> = ({ activeVariant, klaviyoAccountID }: Props) => {
  // set default quantity
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product--actions">
      {activeVariant?.inStock ? (
        <>
          <ProductCounter
            id={activeVariant.id}
            max={10}
            onUpdate={setQuantity as any}
          />
          <ProductAdd
            productID={activeVariant.id}
            quantity={quantity}
            className="btn is-primary is-large is-block"
          >
            Add To Cart
          </ProductAdd>
        </>
      ) : (
        <>
          {klaviyoAccountID ? (
            <ProductWaitlist
              variant={activeVariant.id}
              klaviyo={klaviyoAccountID}
            />
          ) : (
            <div className="btn is-large is-disabled is-block">
              Out of Stock
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductActions;