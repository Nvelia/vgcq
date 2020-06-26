import React from "react";
import { Route } from "react-router-dom";
import Message from "./app/partials/Message";
import { useTranslation } from "react-i18next";

function PrivateRoute({ component: Component, auth, ...rest }) {
  const { t } = useTranslation();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Message message={t("private-route.message")} />
        )
      }
    />
  );
}

export default PrivateRoute;
