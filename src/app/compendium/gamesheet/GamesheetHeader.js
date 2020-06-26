import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import FavoriteButton from "../buttons/FavoriteButton";
import { SERVER_ROOT } from "./../../../utils/agent";

const GamesheetHeader = ({ gamesheet }) => {
  const { t } = useTranslation();
  return (
    <div className="gamesheet-header">
      <div className="bar backbar" />

      <div className="bar frontbar">
        <div className="image-and-title">
          <img src={`${SERVER_ROOT}${gamesheet.image.url}`} alt="" />
          <div>
            <h2>{gamesheet.name}</h2>
            <p>
              {gamesheet.cardsQty > 0
                ? t("gamesheet-header.cards", { number: gamesheet.cardsQty })
                : t("gamesheet-header.card", { number: gamesheet.cardsQty })}
            </p>
          </div>
        </div>

        <FavoriteButton gamesheet={gamesheet} />
      </div>
    </div>
  );
};

GamesheetHeader.propTypes = {
  gamesheet: PropTypes.object,
};

export default GamesheetHeader;
