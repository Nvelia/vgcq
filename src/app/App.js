import React, { Component, Suspense } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";

import MainPageContainer from "./compendium/MainPageContainer";
import Gamesheet from "./compendium/gamesheet/Gamesheet";
import LoginModal from "./auth/LoginModal";
import Header from "./partials/Header";
import UserConfirm from "./UserConfirm";
import QuizPage from "./quiz/QuizPage";

import PrivateRoute from "../PrivateRoute";
import AdminRoute from "../AdminRoute";
import PersonnalPage from "./auth/PersonnalPage";
import Validation from "./auth/Validation";
import Contributions from "./auth/Contributions";
import Settings from "./auth/Settings";

import FlashMessage from "./partials/FlashMessage";
import BackendRedirection from "./partials/BackendRedirection";
import GamesheetForm from "./compendium/forms/GamesheetForm";
import CardForm from "./compendium/forms/CardForm";

import { requests } from "../utils/agent";
import { userFetch, userSetId, userLogout } from "../actions/authActions";

class App extends Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem("jwtToken");

    if (token) {
      requests.setToken(token);
    }
  }

  componentDidMount() {
    const userId = window.localStorage.getItem("userId");
    const { userSetId } = this.props;
    if (userId) {
      userSetId(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const { userFetch } = this.props;
    const { userId, user } = this.props.auth;

    if (prevProps.userId !== userId && userId !== null && user.data === null) {
      const token = window.localStorage.getItem("jwtToken");
      if (token) {
        requests.setToken(token);
      }

      userFetch(userId);
    }
  }

  render() {
    const { modal, auth } = this.props;

    return (
      <Suspense fallback={<div>Loading</div>}>
        <Header />

        {modal.loginFormOpened && <LoginModal />}
        {modal.cardFormOpened && <CardForm />}
        {modal.gamesheetFormOpened && <GamesheetForm />}

        <FlashMessage />

        <div className="main-body">
          <Switch>
            <Route exact path="/" component={MainPageContainer}>
              <Redirect to="/compendium"></Redirect>
            </Route>

            <Route
              exact
              path="/check-backend/:id/:token"
              component={BackendRedirection}
            ></Route>

            <Route exact path="/compendium" component={MainPageContainer} />
            <Route
              exact
              path="/compendium/fiche-de-jeu/:slug"
              component={Gamesheet}
            />

            <Route exact path="/user-confirm" component={UserConfirm} />

            <Route exact path="/quiz" component={QuizPage} />

            <AdminRoute
              component={Validation}
              exact
              path="/validation"
              auth={auth}
            />
            <PrivateRoute
              component={PersonnalPage}
              exact
              path="/mon-profil"
              auth={auth}
            />
            <PrivateRoute
              component={Contributions}
              exact
              path="/contributions"
              auth={auth}
            />
            <PrivateRoute
              component={Settings}
              exact
              path="/reglages"
              auth={auth}
            />
          </Switch>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
});

const mapDispatchToProps = {
  userFetch,
  userSetId,
  userLogout,
};

App.propTypes = {
  auth: PropTypes.object,
  modal: PropTypes.object,
  userFetch: PropTypes.func,
  userSetId: PropTypes.func,
  userLogout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
