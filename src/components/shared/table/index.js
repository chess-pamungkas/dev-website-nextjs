import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import "regenerator-runtime";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import TableSearch from "./components/search";
import TablePagination from "./components/pagination";
import { TABLE_PAGE_SIZES } from "../../../helpers/constants";
import TableShowByDropdown from "./components/dropdown";
import { TableTip, TableTitle } from "./components/title";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";

const TableComponent = ({
  className,
  tableClassName,
  data,
  columns,
  isPagination,
  isHideScroll = true,
  isSearch,
  isSorting,
  isWrapperPadding = false,
  title,
  subtitle,
  tip,
}) => {
  const isRTL = useRtlDirection();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    globalFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    page,
    rows,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        ...(isPagination ? { pageSize: TABLE_PAGE_SIZES[0] } : {}),
        ...(isSorting
          ? {
              sortBy: [
                {
                  // default sorting by first column
                  id: columns[0].accessor,
                  desc: false,
                },
              ],
            }
          : {}),
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const isGroupedHeader = () => Object.keys(headerGroups).length > 1;

  return (
    <div
      className={cn(
        "table-wrapper",
        {
          "table-wrapper--padding": !isSearch || isWrapperPadding,
        },
        className
      )}
    >
      {title && <TableTitle title={title} subtitle={subtitle} />}
      <div
        className={cn("table__tools", {
          "table__tools--single-block": !isPagination,
        })}
      >
        {isPagination && (
          <TableShowByDropdown state={state} setPageSize={setPageSize} />
        )}
        {isSearch && (
          <TableSearch
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />
        )}
      </div>
      <div
        className={cn("table-scroll", {
          "table-scroll--vertical": !isPagination && !isHideScroll,
        })}
      >
        <table
          className={cn(
            "table",
            {
              "table--small-padding": isGroupedHeader(),
            },
            tableClassName,
            {
              "table--rtl": isRTL,
            }
          )}
          {...getTableProps()}
        >
          <thead className="table__head">
            {headerGroups.map((headerGroup, index) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr
                  key={headerGroup.id || `header-group-${index}`}
                  className={cn("table__head-row", {
                    "table__head-row--grouped": isGroupedHeader(),
                  })}
                  {...restHeaderGroupProps}
                >
                  {headerGroup.headers.map((column, columnIndex) => {
                    const { key: thKey, ...restThProps } =
                      column.getHeaderProps();
                    const sortProps = isSorting
                      ? column.getHeaderProps(column.getSortByToggleProps())
                      : {};
                    const { key: sortKey, ...restSortProps } = sortProps;
                    return (
                      <th
                        key={`header-${
                          column.render("id") || columnIndex
                        }-${index}`}
                        className={cn("table__head-column", {
                          "table__head-column--grouped":
                            isGroupedHeader() && index === 0,
                          "table__head-column--empty":
                            isGroupedHeader() && column.render("Header") === "",
                        })}
                        {...restThProps}
                        {...restSortProps}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="table__body" {...getTableBodyProps()}>
            {(isPagination ? page : rows).map((row, index) => {
              prepareRow(row);
              const { key: rowKey, ...restRowProps } = row.getRowProps();
              return (
                <tr
                  key={row.id || rowKey || index}
                  {...restRowProps}
                  className="table__body-row"
                >
                  {row.cells.map((cell, cellIndex) => {
                    const { key: cellKey, ...restCellProps } =
                      cell.getCellProps();
                    return (
                      <td
                        key={cellKey || `${row.id || index}-cell-${cellIndex}`}
                        className="table__body-column"
                        {...restCellProps}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={cn("table__tools", "table__tools--bottom")}>
        {tip && <TableTip tip={tip} />}
        {isPagination && (
          <TablePagination
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        )}
      </div>
    </div>
  );
};

TableComponent.propTypes = {
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isPagination: PropTypes.bool,
  isHideScroll: PropTypes.bool,
  isSearch: PropTypes.bool,
  isSorting: PropTypes.bool,
  isWrapperPadding: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tip: PropTypes.object,
};
export default TableComponent;
