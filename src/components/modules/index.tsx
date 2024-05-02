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
  key?: number | string;
  data: Obj;
  product?: Obj;
  activeVariant?: Obj;
  onVariantChange?: () => void;
};

export const Module = ({
  index,
  data,
  product,
  activeVariant,
  onVariantChange
}: Props) => {
  console.log("data inside module ", data)
  const testProduct = data?.columns[0].blocks[0].currentType[0].product
  console.log('testProduct', testProduct)
  const ModuleType = {
    grid: Grid,
    hero: Hero,
    marquee: Marquee,
    dividerPhoto: DividerPhoto,
    productHero: ProductHero,
    collectionGrid: Collection,
  }[data?._type] ?? <></>

  return (
    <>
      {data?.map((column: Obj, key: number | string) => (
        <ModuleType
          index={key}
          key={key}
          data={data}
          product={testProduct}
          activeVariant={activeVariant}
          onVariantChange={onVariantChange}
        />
      ))}
    </>
  )
}