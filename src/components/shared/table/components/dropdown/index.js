import React from "react";
import PropTypes from "prop-types";
import Dropdown from "../../../dropdown";
import { TABLE_PAGE_SIZES } from "../../../../../helpers/constants";
import { useTranslationWithVariables } from "../../../../../helpers/hooks/use-translation-with-vars";

const TableShowByDropdown = ({ state, setPageSize }) => {
  const { t } = useTranslationWithVariables();

  return (
    <div className="table__dropdown">
      <span className="table__dropdown-title">{t("table-dropdown-title")}</span>
      <Dropdown
        className="table__dropdown-select"
        selectedItem={{
          title: state.pageSize,
          value: state.pageSize,
        }}
        items={TABLE_PAGE_SIZES.map((item) => {
          return {
            title: item,
            value: item,
          };
        })}
        setSelectedItem={({ value }) => {
          setPageSize(value);
        }}
        isDropdownShown
      />
    </div>
  );
};

TableShowByDropdown.propTypes = {
  state: PropTypes.object.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default TableShowByDropdown;
