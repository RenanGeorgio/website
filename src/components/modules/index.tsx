// @ts-nocheck
import Grid from './grid';
import Hero from './hero';
import Marquee from './marquee';
import DividerPhoto from './divider-photo';
import ProductHero from './product-hero';
import Collection from './collection-grid';
import { Obj } from '@typograph/types';

interface Props {
  index: number | string;
  data: Obj;
  product?: Obj;
  activeVariant?: Obj;
  onVariantChange: () => void;
};

export const Module = ({
  index,
  data,
  product,
  activeVariant,
  onVariantChange
}: Props) => {
  const ModuleType = {
    grid: Grid,
    hero: Hero,
    marquee: Marquee,
    dividerPhoto: DividerPhoto,
    productHero: ProductHero,
    collectionGrid: Collection,
  }[data?._type] ?? <></>

  return (
    <ModuleType
      index={index}
      data={data}
      product={product}
      activeVariant={activeVariant}
      onVariantChange={onVariantChange}
    />
  )
}