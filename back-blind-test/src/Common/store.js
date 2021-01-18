import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from "redux";
import ReduxThunk from "redux-thunk";
import { userReducer } from "../User/userReducer";

const reducers = combineReducers({
  user: userReducer,
});

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(ReduxThunk))
);
