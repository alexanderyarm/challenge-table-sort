import React from 'react';
import PropTypes from 'prop-types';
import './TableRow.css';
import { convertNumberToCurrencyString } from '../../utils/number';

const TableRow = ({ columns, rowData }) => {
  const getContent = (type, data) => {
    switch (type) {
      case 'productionBudget':
      case 'worldwideBoxOffice':
        return convertNumberToCurrencyString(data);
      default:
        return data;
    }
  };

  const tdNodes = columns.map(column => {
    const tdContent = getContent(column.id, rowData[column.id]);

    return (
      <td
        className={`TableRow__cell Table__${column.id}`}
        key={`${rowData.number}-${column.id}`}
      >
        {tdContent}
      </td>
    );
  });

  return <tr className="TableRow">{tdNodes}</tr>;
};

TableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  rowData: PropTypes.object.isRequired
};

export default TableRow;
