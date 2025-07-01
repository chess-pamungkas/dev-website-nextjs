import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useAsyncDebounce } from "react-table";
import { useTranslationWithVariables } from "../../../../../helpers/hooks/use-translation-with-vars";
import { SearchIcon } from "../../../icons";

const TableSearch = ({ globalFilter, setGlobalFilter }) => {
  const { t } = useTranslationWithVariables();

  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger search on form submit if needed
  };

  return (
    <form className="table__searchbar search-bar" onSubmit={handleSubmit}>
      <SearchIcon className="table__searchbar-icon" />
      <input
        className={cn("search-bar__input")}
        placeholder={t("table-search-placeholder") || "Search..."}
        onChange={handleInputChange}
        value={value || ""}
      />
      <button className="search-bar__submit" type="submit">
        {t("search-submit-btn") || "Search"}
      </button>
    </form>
  );
};

TableSearch.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};
export default TableSearch;
