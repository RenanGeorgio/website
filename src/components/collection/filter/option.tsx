import cx from 'classnames';
import { ConditionalWrapper } from '@lib/helpers';
import Swatch from '@components/swatch';
import Icon from '@components/icon';

// Construindo opções de filtro
export const FilterOption = ({ option, activeOptions, onChange }) => {
  const { type, title, slug, color } = option

  const { name: filterGroup, values } = activeOptions

  const isChecked = values?.includes(slug)

  function handleFilterChange(ev) {
    const { value } = ev.target

    const hasValue = values.includes(value)

    const newValues = hasValue
      ? values.filter((v) => v !== value).join()
      : [...values, value].join()

    onChange([
      {
        name: filterGroup,
        value: newValues || null,
      },
    ])
  }

  return (
    <div
      className={cx('filter-option', {
        'is-swatch': option.type === 'swatch',
        'is-active': isChecked,
      })}
    >
      <div className="control">
        <input
          id={`filter-${slug}`}
          name={filterGroup}
          type="checkbox"
          value={slug}
          checked={values?.includes(slug) || false}
          onChange={handleFilterChange}
        />
        <label
          htmlFor={`filter-${slug}`}
          className="control--label for-checkbox"
        >
          <div className="filter-option--icon">
            <ConditionalWrapper
              condition={type === 'swatch'}
              wrapper={(children) => (
                <Swatch label={title} color={color}>
                  {children}
                </Swatch>
              )}
            >
              <Icon name="Checkmark" />
            </ConditionalWrapper>
          </div>
          <div className="filter-option--label">{title}</div>
        </label>
      </div>
    </div>
  );
}