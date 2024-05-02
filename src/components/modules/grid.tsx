import cx from 'classnames';
import ProductCard from '@components/shop/product-card';
import Freeform from '@components/freeform';
import { AccordionList } from '@components/accordion';
import { GridColumn, BlocksProps } from '@typograph/types/queries';
import { Obj } from '@typograph/types';

interface Props {
  size?: string | number[];
  columns?: GridColumn[];
  children?: React.ReactNode;
};

const Grid: React.FC<any> = (data: Props): JSX.Element => {
  const { size, columns } = data;

  const getGridSize = (
    breakpoint: any,
    size: number,
    justify = false,
    align = false,
    start = false
  ) => {
    const hasBreakpoint = breakpoint && breakpoint.trim();
    const colSpan = hasBreakpoint
      ? `${breakpoint}:col-span-${size}`
      : `col-span-${size}`

    const colStart = hasBreakpoint
      ? `${breakpoint}:col-start-${start}`
      : `col-start-${start}`

    const colJustify = hasBreakpoint ? `${breakpoint}:${justify}` : justify
    const colAlign = hasBreakpoint ? `${breakpoint}:${align}` : align

    return cx(
      colSpan,
      start && colStart,
      justify && colJustify,
      align && colAlign
    )
  }

  return (
    <section className="section">
      <div className="section--content">
        <div className={`grid grid-cols-${size} gap-x-16 gap-y-16 sm:gap-x-32 lg:gap-x-48`}>
          {/* @ts-ignore */}
          {columns.map((col: GridColumn, key: number | string) => {
            const { sizes, blocks }: GridColumn = col;

            return (
              // @ts-ignore
              <div key={key} className={cx(sizes.map((size) => getGridSize(size.breakpoint, size.width, size.justify, size.align, size.start)))}>
                {/* @ts-ignore */}
                {blocks.map((block: Obj, key: number | string) => (
                  <GridBlock key={key} block={block} />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const GridBlock: React.FC<any> = (block: BlocksProps) => {
  // @ts-ignore
  const type = block._type;

  switch (type) {
    case 'freeform':
      return <Freeform data={block} />
    case 'accordions':
      return <AccordionList data={block} />
    case 'productCard':
      return (
        <ProductCard
          className="is-inline"
          // @ts-ignore
          product={block?.product}
          hasVisuals
          showThumbs
          showPrice
        />
      )
    default:
      return null
  }
}

export default Grid;