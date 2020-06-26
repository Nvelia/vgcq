import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../../partials/Spinner";
import LikeButton from "../buttons/LikeButton";

const CardFront = (props) => {
  const { fromGamesheet, spinner, fromRandom, card, t } = props;
  return (
    <div className="--card-front">
      <div className="card">
        {!fromGamesheet ? (
          <h6>
            {spinner && fromRandom ? (
              ""
            ) : (
              <Link to={`/encyclopedie/fiche-de-jeu/${card.Gamesheet.slug}`}>
                {card.Gamesheet.name}
              </Link>
            )}
          </h6>
        ) : (
          <hr />
        )}
        {spinner && fromRandom ? <Spinner /> : <p>{card.content}</p>}
      </div>
      <div className="card-details">
        <p className="card-author">
          {t("card-list.author")} :{" "}
          {spinner && fromRandom ? (
            ""
          ) : (
            <Link to={`/utilisateurs/${card.Author.username}`}>
              {card.Author.username}
            </Link>
          )}
        </p>
        <p className="card-vote">
          {spinner && fromRandom ? (
            ""
          ) : (
            <LikeButton card={card} likes={card.likes.length} />
          )}
        </p>
      </div>
    </div>
  );
};

CardFront.propTypes = {
  card: PropTypes.object,
  spinner: PropTypes.bool,
  fromRandom: PropTypes.bool,
  fromGamesheet: PropTypes.bool,
};

export default CardFront;
