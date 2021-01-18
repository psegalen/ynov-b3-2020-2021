import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from "redux";
import ReduxThunk from "redux-thunk";
import { listsReducer } from "./listsReducer";
import { tasksReducer } from "./tasksReducer";

const reducers = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer,
});

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(ReduxThunk))
);
