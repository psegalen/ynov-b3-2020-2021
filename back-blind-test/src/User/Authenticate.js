import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import "./Authenticate.css";
import { authenticateUser } from "./userEffects";

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canSignIn, setCanSignIn] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
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
  return (
    <div className="auth-root">
      <img src="/assets/logo.png" alt="Blind test logo" />
      <p>Sign In</p>
      {isLoading ? (
        <img src="/assets/spinner.svg" alt="Loading animation" />
      ) : (
        <div className="auth-form">
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <button
            onClick={() =>
              dispatch(
                authenticateUser(email, password, signInSuccess)
              )
            }
            disabled={!canSignIn}
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
};
