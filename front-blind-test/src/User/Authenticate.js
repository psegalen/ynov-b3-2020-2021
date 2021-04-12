import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  Card,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import "./Authenticate.css";
import { authenticateUser } from "./userEffects";

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canSignIn, setCanSignIn] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );
  const history = useHistory();
  const { from } = useLocation().state || { from: { pathname: "/" } };
  const signInSuccess = () => {
    history.replace(from);
  };
  useEffect(() => {
    // Verify email format is correct
    let emailIsValid = false;
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      emailIsValid = true;
    }
    // Verify password format is correct
    let passwordIsValid = false;
    if (password.length >= 6) {
      passwordIsValid = true;
    }
    setCanSignIn(emailIsValid && passwordIsValid);
  }, [email, password]);
  useEffect(() => {
    if (isAuthenticated) history.replace("/");
  }, [isAuthenticated, history]);
  return (
    <div className="auth-root">
      <img src="/assets/logo.png" alt="Blind test logo" />
      <p>Sign In</p>
      <Card className="auth-form" elevation={5}>
        <TextField
          variant="outlined"
          label="Email address"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className="auth-form-control"
          type="password"
        />
        <Button
          variant="contained"
          onClick={() =>
            dispatch(authenticateUser(email, password, signInSuccess))
          }
          disabled={!canSignIn || isLoading}
          className="auth-form-control ok-button"
          color="primary"
        >
          {isLoading ? <CircularProgress color="primary" /> : "Go"}
        </Button>
      </Card>
    </div>
  );
};
