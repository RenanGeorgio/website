import { useState } from 'react';
import cx from 'classnames';
import Drawer from '@components/drawer';
import { FilterGroup } from './group';

const CollectionFilter = ({
  filterGroups,
  activeFilters = [],
  filtersTotal,
  itemTotal,
  onChange = () => {},
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleClearFilters = () => {
    const clearedFilters = activeFilters.map((filter) => ({
      name: filter.name,
      value: null,
    }))

    onChange(clearedFilters)
  }

  return (
    <>
      <div className="collection--filter-actions">
        <button onClick={() => setFiltersOpen(true)} className="filters-toggle">
          Show Filters
          {filtersTotal > 0 && (
            <span className="filters-toggle--count">{filtersTotal}</span>
          )}
        </button>

        {filtersTotal > 0 && (
          <button
            onClick={() => handleClearFilters()}
            className="filters-reset btn is-small"
          >
            Clear All
          </button>
        )}
      </div>

      <Drawer
        direction="left"
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        className="filters"
      >
        {/* Filters Header */}
        <div className="filters--header">
          <div className="filters--title">
            Filters
            {filtersTotal > 0 && (
              <span className="filters--count">{filtersTotal}</span>
            )}
          </div>

          <div className="filters--actions">
            {filtersTotal > 0 && (
              <button
                onClick={() => {
                  handleClearFilters()
                  setFiltersOpen(false)
                }}
                className="filters-reset btn is-small"
              >
                Clear All
              </button>
            )}

            <button
              className="filters-close"
              onClick={() => setFiltersOpen(false)}
            >
              Done
            </button>
          </div>
        </div>

        {/* Filter Groups */}
        <div className="filters--content">
          {filterGroups.map((group, key) => (
            <FilterGroup
              key={key}
              group={group}
              activeOptions={activeFilters.find((f) => f.name === group.slug)}
              onChange={onChange}
            />
          ))}
        </div>

        {/* Filter Footer */}
        <div className="filters--footer">
          <div className="filters--footer-actions">
            <button
              onClick={() => setFiltersOpen(false)}
              className={cx('btn is-primary is-inverted is-large is-block', {
                'is-disabled': itemTotal === 0,
              })}
            >
              {itemTotal > 0 ? `Show ${itemTotal} Results` : 'No Results'}
            </button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default CollectionFilter;