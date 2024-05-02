import { ProductOption } from '@components/shop/product';
import { Obj } from '@typograph/types';
import { ProductProp, VariantsParams } from '@typograph/types/queries';

interface Props {
  product: ProductProp;
  activeVariant: VariantsParams["variant"];
  onVariantChange: any
};

const ProductForm: React.FC<any> = ({ product, activeVariant, onVariantChange }: Props) => {
  if (!product?.options?.length) {
    return null;
  }

  return (
    <div className="product--options">
      {product?.options?.map(
        (option: Obj, key: number | string) =>
          option.values?.length > 0 && (
            <ProductOption
              key={key}
              position={key}
              option={option}
              optionSettings={product?.optionSettings}
              variants={product?.variants}
              activeVariant={activeVariant}
              onChange={onVariantChange}
            />
          )
      )}
    </div>
  );
}

export default ProductForm;
