import { combineReducers, createStore } from "redux";
import { listsReducer } from "./listsReducer";
import { tasksReducer } from "./tasksReducer";

const reducers = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer,
});

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
