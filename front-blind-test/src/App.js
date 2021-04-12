import { Provider } from "react-redux";
import "./App.css";
import Navigation from "./Common/Navigation";
import { store } from "./Common/store";

// Providers (store Redux ...)

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Navigation />
    </div>
  </Provider>
);

export default App;
