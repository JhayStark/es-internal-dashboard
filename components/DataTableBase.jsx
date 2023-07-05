import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const rowStyles = [
  {
    when: row => !row.id % 2 === 0,
    style: {
      backgroundColor: 'white',
      color: 'black',
      borderColor: 'white',
    },
  },
  {
    when: row => row.id % 2 === 0,
    style: {
      backgroundColor: '#EDF3FF',
      color: 'black',
      borderColor: '#EDF3FF',
    },
  },
];

const customStyles = {
  rows: {
    style: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      fontSize: '1.05rem',
    },
  },
  headCells: {
    style: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      fontSize: '1.05rem',
    },
  },
};
function DataTableBase(props) {
  const [tableData, setTableData] = useState(props.data);
  const [filterText, setFilterText] = useState('');
  const filteredItems = tableData.filter(
    item =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <DataTable
      pagination
      selectableRowsComponentProps={selectProps}
      dense
      columns={props.columns}
      data={props.data}
      conditionalRowStyles={rowStyles}
      customStyles={customStyles}
      responsive
    />
  );
}

export default DataTableBase;
