import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const TablePagination = ({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => {
  return (
    <div className="pagination">
      <button
        className={cn(
          "pagination",
          "pagination__btn",
          "pagination__btn--arrow",
          "pagination__btn--left"
        )}
        type="button"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>
      <button
        className={cn(
          "pagination",
          "pagination__btn",
          "pagination__btn--arrow",
          "pagination__btn--right"
        )}
        type="button"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        {">"}
      </button>
    </div>
  );
};

TablePagination.propTypes = {
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
};

export default TablePagination;
