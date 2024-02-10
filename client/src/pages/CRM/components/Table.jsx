import classNames from 'classnames';
import React from 'react';

const Table = ({ tableInstance, className = 'react-table boxed' }) => {
  const { getTableProps, headerGroups, page, getTableBodyProps, prepareRow, toggleAllPageRowsSelected, setIsOpenAddEditModal } = tableInstance;
  return (
    <>
      <table className={className} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <tr key={`header${headerIndex}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <th
                    key={`th.${index}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classNames(column.headerClassName, {
                      sorting_desc: column.isSortedDesc,
                      sorting_asc: column.isSorted && !column.isSortedDesc,
                      sorting: column.sortable,
                    })}
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <tr key={`tr.${i}`} {...row.getRowProps()} className={classNames({ selected: row.isSelected, filaTabla: true })}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td.${cellIndex}`}
                    {...cell.getCellProps()}
                    onClick={() => {
                      if (cell.column.id === 'edit') {
                        toggleAllPageRowsSelected(false);
                        /* tableInstance.rows.forEach(row => {
                          if (row.id !== selectedRowId) {
                            row.toggleRowSelected(false);
                          }
                        }); */
                        //edit fix
                        row.toggleRowSelected();
                        setIsOpenAddEditModal(true);
                      } else {
                        row.toggleRowSelected();
                      }
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
