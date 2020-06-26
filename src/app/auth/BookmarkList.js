import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Spinner from "./../partials/Spinner";

const BookmarkList = (props) => {
  const { bookmarks, history, loading } = props;
  const { t } = useTranslation();

  function redirectToGamesheet(bookmark) {
    return history.push(`/compendium/fiche-de-jeu/${bookmark.slug}`);
  }

  function renderBookmarks() {
    return bookmarks.map((bookmark) => {
      return (
        <div
          className="bookmark"
          key={bookmark.id}
          onClick={() => redirectToGamesheet(bookmark)}
        >
          {bookmark.name}
        </div>
      );
    });
  }

  if (loading) {
    return <Spinner />;
  }

  if (!bookmarks) {
    return t("bookmark-list.favorite");
  }

  return <div className="bookmark-list">{renderBookmarks()}</div>;
};

BookmarkList.propTypes = {
  bookmarks: PropTypes.array,
  loading: PropTypes.bool,
};

export default BookmarkList;
