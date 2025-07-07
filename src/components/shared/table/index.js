import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import "regenerator-runtime";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import TableSearch from "./components/search";
import TablePagination from "./components/pagination";
import { TABLE_PAGE_SIZES } from "../../../helpers/constants";
import TableShowByDropdown from "./components/dropdown";
import { TableTip, TableTitle } from "./components/title";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { useWindowSize } from "../../../helpers/hooks/use-window-size";

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
  const { isMobile } = useWindowSize();

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState(
    isSorting
      ? [
          {
            id: "col1",
            desc: false,
          },
        ]
      : []
  );

  const table = useReactTable({
    data: data || [],
    columns: columns || [],
    state: {
      globalFilter,
      sorting,
      ...(isPagination && {
        pagination: { pageIndex: 0, pageSize: TABLE_PAGE_SIZES[0] },
      }),
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    enableSorting: isSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(isPagination && { getPaginationRowModel: getPaginationRowModel() }),
  });

  const isGroupedHeader = () => table.getHeaderGroups().length > 1;

  // Don't render if table is not properly initialized
  if (!table) {
    return (
      <div className={cn("table-wrapper", className)}>
        {title && <TableTitle title={title} subtitle={subtitle} />}
        <div className="table__loading">Loading table...</div>
      </div>
    );
  }

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
          <TableShowByDropdown
            state={table.getState()}
            setPageSize={table.setPageSize}
          />
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
              "table--small-padding": table.getHeaderGroups().length > 1,
            },
            tableClassName,
            {
              "table--rtl": isRTL,
            }
          )}
        >
          <thead className="table__head">
            {table.getHeaderGroups().map((headerGroup, i) => {
              // For mobile: handle header colSpan and skipping for column headers (second row)
              if (isMobile && table.getHeaderGroups().length > 1 && i === 1) {
                let skipNext = false;
                return (
                  <tr
                    key={headerGroup.id}
                    className={cn("table__head-row", {
                      "table__head-row--grouped":
                        table.getHeaderGroups().length > 1 && i === 0,
                    })}
                  >
                    {headerGroup.headers.map((header, idx) => {
                      if (skipNext) {
                        skipNext = false;
                        return null;
                      }
                      const colSpan =
                        header.column.columnDef.meta?.mobileColspan;
                      if (colSpan) {
                        skipNext = true;
                        return (
                          <th
                            key={header.id}
                            colSpan={colSpan}
                            className={cn(
                              "table__head-column",
                              header.colSpan > 1
                                ? "table__head-column--grouped"
                                : "",
                              !header.isPlaceholder &&
                                !header.column.columnDef.header
                                ? "table__head-column--empty"
                                : ""
                            )}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        );
                      }
                      if (header.column.columnDef.meta?.mobileHide) {
                        return null;
                      }
                      return (
                        <th
                          key={header.id}
                          className={cn(
                            "table__head-column",
                            header.colSpan > 1
                              ? "table__head-column--grouped"
                              : "",
                            !header.isPlaceholder &&
                              !header.column.columnDef.header
                              ? "table__head-column--empty"
                              : ""
                          )}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      );
                    })}
                  </tr>
                );
              }
              // For mobile: grouped/orange tab row (first row), set colSpan=2 for each group header (if grouped)
              if (isMobile && table.getHeaderGroups().length > 1 && i === 0) {
                return (
                  <tr
                    key={headerGroup.id}
                    className={cn("table__head-row", {
                      "table__head-row--grouped":
                        table.getHeaderGroups().length > 1 && i === 0,
                    })}
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={cn(
                          "table__head-column",
                          header.colSpan > 1
                            ? "table__head-column--grouped"
                            : "",
                          !header.isPlaceholder &&
                            !header.column.columnDef.header
                            ? "table__head-column--empty"
                            : ""
                        )}
                        colSpan={header.colSpan > 1 ? 2 : 1}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                );
              }
              // Default (desktop/tablet or mobile with single header row)
              return (
                <tr
                  key={headerGroup.id}
                  className={cn("table__head-row", {
                    "table__head-row--grouped":
                      table.getHeaderGroups().length > 1 && i === 0,
                  })}
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        "table__head-column",
                        header.colSpan > 1 ? "table__head-column--grouped" : "",
                        !header.isPlaceholder && !header.column.columnDef.header
                          ? "table__head-column--empty"
                          : ""
                      )}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody className="table__body">
            {table.getRowModel().rows.map((row) => {
              // For mobile colspan logic
              let skipNext = false;
              return (
                <tr key={row.id} className="table__body-row">
                  {row.getVisibleCells().map((cell, cellIdx, cells) => {
                    if (isMobile) {
                      // If previous cell set skipNext, skip this cell
                      if (skipNext) {
                        skipNext = false;
                        return null;
                      }
                      // If this cell has mobileColspan, render with colSpan=2 and skip next
                      const colSpan = cell.column.columnDef.meta?.mobileColspan;
                      if (colSpan) {
                        skipNext = true;
                        return (
                          <td
                            key={cell.id}
                            colSpan={colSpan}
                            className={cn("table__body-column")}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      }
                      // If this cell is mobileHide, skip
                      if (cell.column.columnDef.meta?.mobileHide) {
                        return null;
                      }
                    }
                    // Default render
                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          "table__body-column",
                          cell.column.columnDef.meta?.mobileHide
                            ? "mobile-hide"
                            : ""
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
            canNextPage={table.getCanNextPage()}
            canPreviousPage={table.getCanPreviousPage()}
            nextPage={table.nextPage}
            previousPage={table.previousPage}
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
