import { ProductProp } from './product.d';
import { ptContent } from './queries.d';

interface BlockParams {
  _key: any;
};

type maxWidthType = (width: string | number) => any;

export interface FreeFormProps extends BlockParams {
  _type: 'freeform';
  content?: ptContent[];
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit' | 'start' | 'end' | 'match-parent' | 'justify-all' |  undefined;
  maxWidth?: maxWidthType | string;
};

export interface AccordionsProps extends BlockParams {
  _type: 'accordions';
  items: {
    id: string | number;
    title?: string;
    content?: ptContent[];
  }[];
};

export interface ProductBlockParams extends BlockParams {
  _type: 'productCard';
  product: ProductProp;
}

export type BlocksProps = FreeFormProps | AccordionsProps | ProductBlockParams | undefined;