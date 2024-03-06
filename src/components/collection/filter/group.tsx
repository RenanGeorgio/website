// @ts-nocheck
import { useState } from 'react';
import cx from 'classnames';
import { Accordion } from '@components/accordion';
import { FilterOption } from './option';
import { CollectionGridProps } from '@typograph/types/queries';
import { Obj } from '@typograph/types';

interface Props {
  group: CollectionGridProps["filter"];
  activeOptions: Obj;
  onChange: (value?: any) => void;
};

// Construindo o filtro seletor de grupo
export const FilterGroup = ({ group, activeOptions, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  // @ts-ignore
  const { id, title, display, options } = group;

  const groupTotal = activeOptions.values.length;

  const toggleGroup = (_: any, state: boolean) => {
    setIsOpen(state);
  }

  return (
    <Accordion
      id={id}
      isOpen={isOpen}
      onToggle={toggleGroup}
      className="filter-group"
      title={
        <>
          <span id={`filter-group-${id}`} className="filter-group--title">
            {title}

            {groupTotal > 0 && (
              <span className="filter-group--count">({groupTotal})</span>
            )}
          </span>
        </>
      }
    >
      <div
        role="group"
        aria-labelledby={`filter-group-${id}`}
        className={cx('filter-group--options', {
          'is-grid': display === 'grid',
        })}
      > 
        {options?.map((option, key) => (
          <FilterOption
            key={key}
            option={option}
            activeOptions={activeOptions}
            onChange={onChange}
          />
        ))}
      </div>
    </Accordion>
  )
}