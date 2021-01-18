import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import "./Authenticate.css";
import { authenticateUser } from "./userEffects";

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { from } = useLocation().state || { from: { pathname: "/" } };
  const signInSuccess = () => {
    history.replace(from);
  };
  return (
    <div className="auth-root">
      <img src="/assets/logo.png" alt="Blind test logo" />
      <p>Sign In</p>
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
            dispatch(authenticateUser(email, password, signInSuccess))
          }
        >
          Go
        </button>
      </div>
    </div>
  );
};
