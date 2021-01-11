import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import Tasks from "./Tasks/Tasks";
import Lists from "./Lists/Lists";
import { store } from "./data/store";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    store.dispatch({ type: "APP_LAUNCH" });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/tasks/:listId">
            <Tasks />
          </Route>
          <Route path="/">
            <Lists />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
