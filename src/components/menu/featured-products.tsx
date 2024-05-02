import ProductCard from '@components/shop/product-card';
import { ProductProp } from '@typograph/types/queries';

interface Props {
  products: ProductProp[];
  onClick: (value?: boolean | void) => void;
};

const FeaturedProducts = ({ products, onClick }: Props) => {
  if (!products) {
    return null;
  }

  return (
    <>
      {products.map((product, key) => (
        <ProductCard
          key={key}
          product={product}
          hasVisuals={product.photos.main || product.photos.listing}
          showThumbs={product.photos.listing}
          className="is-featured"
          onClick={onClick}
        />
      ))}
    </>
  );
}

export default FeaturedProducts;