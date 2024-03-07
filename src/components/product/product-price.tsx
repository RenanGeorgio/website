import { centsToPrice } from '@lib/helpers';

interface Props {
  price: number;
  comparePrice?: number;
}

const ProductPrice = ({ price, comparePrice }: Props) => {
  return (
    <div className="price">
      <span className="price--current">${centsToPrice(price)}</span>

      {!!comparePrice && (
        <span className="price--discount">
          {Math.ceil(((comparePrice - price) / comparePrice) * 100)}% off
        </span>
      )}
    </div>
  );
}

export default ProductPrice;
