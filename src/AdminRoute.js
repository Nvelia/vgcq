import React from "react";
import { Route } from "react-router-dom";
import Message from "./app/partials/Message";
import { useTranslation } from "react-i18next";

function AdminRoute({ component: Component, auth, ...rest }) {
  const isAuthorized =
    auth.user.data &&
    (auth.user.data.roles.includes("ROLE_ADMIN") ||
      auth.user.data.roles.includes("ROLE_MODERATOR"));
  const { t } = useTranslation();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated && isAuthorized ? (
          <Component {...props} />
        ) : (
          <Message message={t("private-route.message")} />
        )
      }
    />
  );
}

export default AdminRoute;
