import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";

const Dropdown = ({
  className,
  items,
  selectedItem,
  setSelectedItem,
  isDropdownShown,
}) => {
  const { t } = useTranslationWithVariables();
  const [isOpen, setIsOpen] = useState(false);

  const onSelectionByClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setSelectedItem(item);
    setIsOpen(false);
  };

  const renderItems = () => {
    return items.map((item) => {
      return (
        <button
          key={`dropdown-item-${item.value}`}
          type="button"
          className={cn("dropdown__item", {
            "dropdown__item--active": selectedItem.id === item.value,
          })}
          onClick={() => onSelectionByClick(item)}
        >
          <span>{t(item.title)}</span>
        </button>
      );
    });
  };

  return (
    <div
      className={cn("dropdown", className, {
        "dropdown--opened": isOpen,
      })}
    >
      <button
        className="dropdown__title"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown__title-content">{t(selectedItem.title)}</span>
      </button>
      {isOpen && isDropdownShown && (
        <div className="dropdown__content">
          <div className="dropdown__items">
            <div>{renderItems()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  isDropdownShown: PropTypes.bool,
};
export default Dropdown;
