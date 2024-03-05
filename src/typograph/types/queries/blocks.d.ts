import { ProductProp } from './product.d';
import { ptContent } from './queries.d';

interface BlockParams {
  _type: 'freeform' | 'accordions' | 'productCard' | undefined;
  _key: any;
};

export interface FreeFormProps extends BlockParams {
  content?: ptContent[];
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit' | 'start' | 'end' | 'match-parent' | 'justify-all' |  undefined;
  maxWidth?: string | (width: string | number) => any;
};

export interface AccordionsProps extends BlockParams {
  items: {
    ["id": _key]: string;
    title?: string;
    content?: ptContent[];
  }[];
};

export interface ProductBlockParams extends BlockParams {
  product: ProductProp;
}

export type BlocksProps = {
  [_type: "freeform"]: FreeFormProps |
  [_type: "accordions"]: AccordionsProps |
  [_type: "productCard"]: ProductBlockParams |
  undefined
}