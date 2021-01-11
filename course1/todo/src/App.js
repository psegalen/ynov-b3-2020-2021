import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Tasks from "./Tasks/Tasks";
import Lists from "./Lists/Lists";
import { ListsProvider } from "./data/ListsContext";

const App = () => (
  <ListsProvider>
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
  </ListsProvider>
);

export default App;
