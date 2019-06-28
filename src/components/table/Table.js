import React, { useState } from 'react';
import TableHeader from '../table-header/TableHeader';
import TableRow from '../table-row/TableRow';
import './Table.css';
import {
  convertStringToValidDate,
  convertDateToDisplayDate,
  getDateBasedOnSortOrder
} from '../../utils/date';
import { formatInt } from '../../utils/number';
import _ from 'lodash';

const prepareTableData = tableData => ({
  ...tableData,
  rows: tableData.rows.map(row => ({
    ...row,
    worldwideBoxOffice: formatInt(row.worldwideBoxOffice),
    productionBudget: formatInt(row.productionBudget),
    releaseDate: convertDateToDisplayDate(row.releaseDate),
    releaseDateUnformatted: convertStringToValidDate(row.releaseDate)
  }))
});

export const sortRowsByDate = (rows, sortOrder) => {
  const sortedRows = [...rows];
  sortedRows.sort(function(a, b) {
    let date1 = getDateBasedOnSortOrder(a.releaseDateUnformatted, sortOrder);
    let date2 = getDateBasedOnSortOrder(b.releaseDateUnformatted, sortOrder);

    if (date1 === date2) {
      return 0;
    }

    if (sortOrder === 'desc') {
      return date1 > date2 ? -1 : 1;
    } else {
      return date1 < date2 ? -1 : 1;
    }
  });

  return sortedRows;
};

const getFilteredRows = (rows, filters) => {
  const filtersKeys = Object.keys(filters);
  const filtersLength = filtersKeys.length - 1;

  return rows.filter(row => {
    let isRowDataFitsFilters = true;
    for (let i = 0; i <= filtersLength; i++) {
      const key = filtersKeys[i];

      if (typeof row[key] === 'undefined') {
        isRowDataFitsFilters = false;
        break;
      }

      const columnValue = row[key].toString().toLowerCase();
      const filterValue = filters[key].toLowerCase();

      if (key === 'productionBudget' || key === 'worldwideBoxOffice') {
        if (!columnValue.startsWith(filterValue)) {
          isRowDataFitsFilters = false;
          break;
        }
      } else {
        if (!columnValue.includes(filters[key].toLowerCase())) {
          isRowDataFitsFilters = false;
          break;
        }
      }
    }

    return isRowDataFitsFilters;
  });
};

const getSortedRows = (rows, sort) => {
  switch (sort.id) {
    case 'number':
    case 'title':
    case 'productionBudget':
    case 'worldwideBoxOffice':
      return _.orderBy(rows, [sort.id], [sort.order]);
    case 'releaseDate':
      return sortRowsByDate(rows, sort.order);
    default:
      return rows;
  }
};

const Table = ({ tableData }) => {
  const preparedData = prepareTableData(tableData);
  const columns = preparedData.columns;

  const [sortedRows, setSortedRows] = useState(preparedData.rows);
  const [sortedAndFilteredRows, setProcessedRowData] = useState(
    preparedData.rows
  );

  const onSortChange = sort => {
    const newSortedRows = getSortedRows(preparedData.rows, sort);

    setSortedRows(newSortedRows);
    setProcessedRowData(
      _.intersectionBy(newSortedRows, sortedAndFilteredRows, 'number')
    );
  };

  const onFiltersChange = filters => {
    const filteredRows = getFilteredRows(sortedRows, filters);
    setProcessedRowData(filteredRows);
  };

  const rows = sortedAndFilteredRows.map(row => (
    <TableRow key={row.number} columns={preparedData.columns} rowData={row} />
  ));

  const nothingFoundRow = (
    <div class="Table__nothing-found">
      No entry has been found 😢😢😢please try another filter settings.
    </div>
  );

  return (
    <React.Fragment>
      <table className="Table">
        <thead>
          <TableHeader
            columns={columns}
            onSortChange={onSortChange}
            onFiltersChange={onFiltersChange}
          />
        </thead>
        <tbody>{Boolean(rows.length) && rows}</tbody>
      </table>
      {!Boolean(rows.length) && nothingFoundRow}
    </React.Fragment>
  );
};

export default Table;
