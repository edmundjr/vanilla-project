import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import "./ViewDatabase.css";

// Mock data for the table
const initialData = [
  { id: 1, task: 'Task 1', name: 'Alice', details: 'Detail for task 1' },
  { id: 2, task: 'Task 2', name: 'Bob', details: 'Detail for task 2' },
  // ... more data
];

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
  Cell: EditableCell,
};

const ViewDatabase = () => {
  const [data, setData] = useState(initialData);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data changes, we turn this off
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Task',
        accessor: 'task',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Details',
        accessor: 'details',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateMyData,
      autoResetPage: !skipPageReset,
    },
    useGlobalFilter,
    useSortBy
  );

  // Render the UI for the table
  return (
    <div>
      <h2>View Database</h2>
      {/* Add a filter input */}
      <input
        type="text"
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search records..."
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDatabase;
