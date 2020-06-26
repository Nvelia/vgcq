import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const SortingContainer = (props) => {
  const { t } = useTranslation();

  return (
    <div className="sorting-container">
      <select
        value={props.sorting}
        name="sorting-gamesheets"
        id="gamesheets-select"
        onChange={(e) => props.updateSortingCallback(e.target.value)}
      >
        <option disabled value="">
          {t("sorting-container.sort-options")}
        </option>
        <option value="most-popular">
          {props.sortCards
            ? t("sorting-container.card-most-popular")
            : t("sorting-container.gamesheet-most-popular")}
        </option>
        <option value="less-popular">
          {props.sortCards
            ? t("sorting-container.card-less-popular")
            : t("sorting-container.gamesheet-less-popular")}
        </option>
      </select>
    </div>
  );
};

SortingContainer.propTypes = {
  updateSortingCallback: PropTypes.func,
  sortCards: PropTypes.bool,
  sorting: PropTypes.string,
};

export default SortingContainer;
