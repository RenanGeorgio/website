import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import cx from 'classnames';
import { useParams, usePrevious, cartesian, sortAsc, sortDesc, clampRange } from '@lib/helpers';
import { useSiteContext } from '@lib/context';
import { CollectionFilter, CollectionFilterChips, CollectionSort } from '@components/collection';
import ProductCard from '@components/product-card';
import { BlockContent } from '@components/block';
import { CollectionGridProps, ProductProp } from '@typograph/types/queries';
import { Obj } from '@typograph/types';

interface Props extends CollectionGridProps {
  title: string;
  products: ProductProp[];
};

const Collection = (data: Props) => {
  const { title, products, filter, sort, paginationLimit, noFilterResults } = data;

  if (!products || products.length === 0) {
    return null;
  }

  const { isPageTransition } = useSiteContext();

  const collectionItems = useRef([]);

  const [hasPagination, setHasPagination] = useState<boolean>(paginationLimit > 0 && products.length > paginationLimit);
  const [currentCount, setCurrentCount] = useState<number>(hasPagination ? paginationLimit : products.length);
  // @ts-ignore
  const filterGroups: CollectionGridProps["filter"]["groups"] = filter.groups ?? [];

  const [currentParams, setCurrentParams] = useParams([
    {
      name: 'page',
      value: null,
    },
    {
      name: 'sort',
      value: sort?.options?.[0]?.slug,
    },
    ...filterGroups.map((g: any) => ({
      name: g?.slug,
      value: null,
    })),
  ]);

  const previousParams = usePrevious(currentParams);

  // determine which params set to use
  const activeParams = isPageTransition && previousParams ? previousParams : currentParams;

  // calculate our sort
  const activeSort = activeParams.find((filter: Obj) => filter?.name === 'sort').value;

  // calculate our filters
  const currentFilters: CollectionGridProps["filter"] = activeParams.filter((f: Obj) => !['page', 'sort'].includes(f?.name));

  // @ts-ignore
  const activeFilters = currentFilters.map((filter: Obj) => {
    let validOptions: Obj[] = [];

    if (filterGroups != undefined) {
      validOptions = filterGroups.find((g: Obj) => g?.slug === filter?.name)?.options.map((o: any) => o?.slug);
    }

    const currentOptions = Array.isArray(filter.value) ? filter.value : filter.value?.split(',') || []

    return {
      name: filter?.name,
      values: [
        ...new Set(currentOptions.filter(Boolean).filter((f: any) => validOptions?.includes(f)))
      ]
    }
  });

  // calculate total active filters
  const filtersTotal = activeFilters.reduce((acc: number, cur: Obj) => {
    return Number(acc + cur.values.length)
  }, 0);

  // calculate our product order and pagination
  const orderedProducts: ProductProp[] = useFilterAndSort(products, activeFilters, activeSort);
  const paginatedProducts: ProductProp[] = [...orderedProducts.slice(0, currentCount)];

  // handle filter + sort updates
  const updateParams = useCallback((params: Obj[]) => {
    const newFilters = activeParams.map((filter: any) => {
      const matchedParam = params?.find((p: Obj) => p?.name === filter?.name);

      return matchedParam ? { ...filter, value: matchedParam?.value } : filter
    });

      setCurrentParams(newFilters);
    }, [activeParams]);

  // handle load more
  const loadMore = useCallback(() => {
    const newCount: number = clampRange(currentCount + paginationLimit, 1, orderedProducts.length);
    const newPage: number = Math.ceil(newCount / paginationLimit);
    setCurrentCount(newCount);
    updateParams([{ name: 'page', value: newPage > 1 ? `${newPage}` : null }]);
  }, [currentCount, orderedProducts, paginationLimit]);

  // update pagination when the count or products change
  useEffect(() => {
    const desiredPage: any = activeParams.find((p: Obj) => p.name === 'page').value;

    const maxPage: number = Math.ceil(orderedProducts?.length / paginationLimit);

    const newCount: number = desiredPage > 1 && desiredPage <= maxPage ? clampRange(paginationLimit * desiredPage, 1, orderedProducts.length) : null

    const pageProductIndex: number = newCount < orderedProducts?.length ? newCount - paginationLimit : orderedProducts.length - 1;

    if (newCount) {
      setCurrentCount(newCount);
      // @ts-ignore
      collectionItems.current[pageProductIndex]?.querySelector('[href]').focus({preventScroll: true});
    }

    setHasPagination(currentCount < orderedProducts.length);
  }, [currentCount, orderedProducts, activeParams, paginationLimit, collectionItems]);

  return (
    <section className="collection">
      <div className="collection--tools">
        {filter?.isActive && (
          <CollectionFilter
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            filtersTotal={filtersTotal}
            itemTotal={orderedProducts?.length}
            // @ts-ignore
            onChange={updateParams}
          />
        )}

        {sort?.isActive && (
          // @ts-ignore
          <CollectionSort sortOptions={sort?.options} activeSort={activeSort} onChange={updateParams} />
        )}
      </div>

      {filter?.isActive && (
        <CollectionFilterChips
          id="collection-filter-chips"
          filterGroups={filterGroups}
          activeFilters={activeFilters}
          filtersTotal={filtersTotal}
          onClick={updateParams}
        />
      )}

      <div className="collection--content">
        <div
          className={cx('collection--grid', {
            'is-empty': !orderedProducts.length,
          })}
        >
          {paginatedProducts.map((product: ProductProp, key: number | string) => (
            <ProductCard
              // @ts-ignore
              ref={(node: any) => (collectionItems?.current[key] = node)}
              key={
                product.id +
                activeParams
                  .filter((f: any) => f?.name !== 'page')
                  .map((f: any) => f?.value)
                  .filter(Boolean)
                  .join('-')
              }
              product={product}
              activeFilters={activeFilters}
              hasVisuals={product?.photos?.main || product?.photos?.listing}
              showGallery={product?.photos?.main && (product?.useGallery == true)}
              showThumbs={product?.photos?.listing && (product?.useGallery == false)}
              showOption={product?.surfaceOption}
              showPrice
              showQuickAdd
            />
          ))}

          {orderedProducts.length === 0 && (
            <div className="collection--empty">
              {noFilterResults && <BlockContent blocks={noFilterResults} />}
              <button
                className="filters-reset btn is-large"
                onClick={() =>
                  updateParams(
                    activeFilters.map((filter: Obj) => ({
                      name: filter?.name,
                      value: null,
                    }))
                  )
                }
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {hasPagination && (
          <div className="collection--pagination">
            <button className="btn is-large" onClick={loadMore}>
              Load More
              <span className="sr-only">
                {' '}
                products from the "{title}" collection
              </span>
            </button>
          </div>
        )}

        {orderedProducts?.length > 0 && (
          <div className="collection--count">
            <p aria-live="polite" role="status" aria-atomic="true">
              Showing {paginatedProducts?.length} of {orderedProducts?.length}{' '}
              products
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

const useFilterAndSort = (products: ProductProp[], filters: Array<CollectionGridProps["filter"]>, sort: CollectionGridProps["sort"] | string) => {
  // @ts-ignore
  const filterCombos = useMemo(() => cartesian(...filters.filter((f: CollectionGridProps["filter"]) => f?.values?.length).map((f: Obj) => f?.values)), [filters]);

  const filteredProducts = useMemo(() => products?.filter((product: ProductProp) => {
    return filterCombos.some((combo: any) => {
      const productFilters = product.filters?.map((f: any) => f.slug)
      const hasCombo = combo.every((x: any) => productFilters?.includes(x));

      return hasCombo;
    })
  }),[filters]);

  switch (sort as string) {
    case 'priceAsc':
      return sortAsc(filteredProducts, 'price')
    case 'priceDesc':
      return sortDesc(filteredProducts, 'price')
    case 'alphaAsc':
      return sortAsc(filteredProducts, 'title')
    case 'alphaDesc':
      return sortDesc(filteredProducts, 'title')
    case 'dateAsc':
      return sortAsc(filteredProducts, 'publishDate')
    case 'dateDesc':
      return sortDesc(filteredProducts, 'publishDate')
    case 'featured':
    default:
      return filteredProducts
  }
}

export default Collection;