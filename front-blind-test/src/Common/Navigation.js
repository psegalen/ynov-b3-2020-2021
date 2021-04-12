import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
  Link,
} from "react-router-dom";
import { AppBar, CircularProgress } from "@material-ui/core";
import { Home } from "../../../front-blind-test/src/Common/Home";
import { Game } from "../../../front-blind-test/src/Game/Game";
import { Profile } from "../../../front-blind-test/src/User/Profile";
import { Authenticate } from "../User/Authenticate";
import { disconnectUser } from "../User/userEffects";
import { launchSequence } from "./appEffects";
import "./Navigation.css";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Navigation = () => {
  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );
  const player = useSelector((state) => state.user.player);
  const isLoading = useSelector((state) => state.app.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(launchSequence());
  }, [dispatch]);
  return isLoading ? (
    <div className="loading-root">
      <CircularProgress color="secondary" />
    </div>
  ) : (
    <Router>
      {isAuthenticated ? (
        <AppBar position="static" className="header">
          <Link to="/" className="app-name">
            <img src="/assets/logo.png" alt="Blind test logo" />
            Blind Tests
          </Link>
          <div className="app-links">
            <Link to="/play">Jouer</Link>
            <Link to="/profile">Profil</Link>
            <Link
              to="/auth"
              onClick={() => disconnectUser()}
              className="sign-out-button"
            >
              Se déconnecter
              <img src={player.avatar} alt="User avatar" />
            </Link>
          </div>
        </AppBar>
      ) : undefined}
      <Switch>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <PrivateRoute path="/play">
          <Game />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Navigation;
