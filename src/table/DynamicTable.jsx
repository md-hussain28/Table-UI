import React, { useState } from "react";
import TableCell from "./TableCell";
import tableConfig from "../config/tableConfig.json";
import Pagination from "./Pagination";
const DynamicTable = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    tableConfig.table.pagination.defaultPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (selectedRows.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div style={tableConfig.table.styles.table}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {tableConfig.table.columns.map((column) => (
              <th
                key={column.id}
                style={{
                  width: column.width,
                  padding: "16px",
                  textAlign: "left",
                  ...tableConfig.table.styles.header,
                }}
              >
                {column.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length}
                    onChange={handleSelectAll}
                  />
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              style={{
                "&:hover": tableConfig.table.styles.row.hover,
              }}
            >
              {tableConfig.table.columns.map((column) => (
                <td
                  key={`${row.id}-${column.id}`}
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  <TableCell
                    config={column}
                    data={{
                      ...row,
                      selected: selectedRows.has(row.id),
                      onSelect: () => handleSelectRow(row.id),
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {tableConfig.table.pagination.enabled && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / rowsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default DynamicTable;
