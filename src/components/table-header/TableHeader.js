import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TableHeader.css';
import sortAscIcon from '../../resources/order-ascending.svg';
import sortDescIcon from '../../resources/order-descending.svg';

const getNewSortState = (currentSort, id) => {
  let order = 'asc';

  if (id === currentSort.id && currentSort.order === order) {
    order = 'desc';
  }

  return {
    id,
    order
  };
};

const getNewFiltersState = (filters, target) => {
  let newFiltersState = { ...filters };

  if (target.value === '') {
    delete newFiltersState[target.id];
  } else {
    newFiltersState[target.id] = target.value;
  }

  return newFiltersState;
};

const TableHeader = ({ columns, onFiltersChange, onSortChange }) => {
  const [sort, setSort] = useState({
    id: null,
    order: null
  });

  const [filters, setFilters] = useState({});

  const handleColumnClick = newSortId => {
    const newSortState = getNewSortState(sort, newSortId);

    setSort(newSortState);
    onSortChange(newSortState);
  };

  const handleInputChange = e => {
    const newFiltersState = getNewFiltersState(filters, e.target);

    setFilters(newFiltersState);
    onFiltersChange(newFiltersState);
  };

  const isIconVisible = columnId => columnId === sort.id;
  const icon = sort.order === 'asc' ? sortAscIcon : sortDescIcon;

  return (
    <tr>
      {columns.map(column => {
        const thTitle =
          column.title.toLowerCase() === 'number'
            ? '#'
            : column.title.replace('in $', '(in $)');

        const titleActiveClass =
          column.id === sort.id ? 'TableHeader__title--active' : '';

        return (
          <th
            className={`TableHeader__cell Table__${column.id}`}
            key={column.id}
          >
            <div onClick={() => handleColumnClick(column.id)}>
              <div className={`TableHeader__title ${titleActiveClass}`}>
                {thTitle}
                {isIconVisible(column.id) && (
                  <img
                    alt={`Sorted ${sort.order}ending`}
                    className="TableHeader__icon"
                    src={icon}
                  />
                )}
              </div>
            </div>

            <div className="TableHeader__input-container">
              <input
                id={column.id}
                onChange={handleInputChange}
                className={`TableHeader__input TableHeader__input-${column.id}`}
              />
            </div>
          </th>
        );
      })}
    </tr>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSortChange: PropTypes.func,
  onFiltersChange: PropTypes.func
};

export default TableHeader;
