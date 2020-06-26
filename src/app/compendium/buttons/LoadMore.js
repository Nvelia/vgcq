import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const LoadMore = (props) => {
  const { t } = useTranslation();

  const { disabled, onClick, loadCards, currentPage, searchingCards } = props;

  return (
    currentPage !== 1 &&
    !searchingCards && (
      <button className="load-more-btn" onClick={onClick} disabled={disabled}>
        {disabled ? (
          <i className="fas fa-spinner fa-spin" />
        ) : loadCards ? (
          t("load-more.card-text")
        ) : (
          t("load-more.gamesheet-text")
        )}
      </button>
    )
  );
};

LoadMore.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loadCards: PropTypes.bool,
  currentPage: PropTypes.number,
  searchingCards: PropTypes.bool,
};

export default LoadMore;
