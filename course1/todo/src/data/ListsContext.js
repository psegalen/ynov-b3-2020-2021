import { createContext, useState } from "react";
import apiHelper from "../apiHelper";

const LISTS_STORAGE_KEY = "TODO_LISTS";
const LISTS_LAST_FETCH_DATE_KEY = "LISTS_LAST_FETCH_DATE_KEY";

export const ListsContext = createContext({
  lists: [],
  setLists: () => {},
  getLists: () => {},
});

export const ListsProvider = ({ children }) => {
  const storageData = localStorage.getItem(LISTS_STORAGE_KEY);
  const initialState = storageData ? JSON.parse(storageData) : [];
  const [lists, setLists] = useState(initialState);
  const lastFetchDate = localStorage.getItem(
    LISTS_LAST_FETCH_DATE_KEY
  );

  const finalSetLists = (newLists) => {
    localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(newLists));
    setLists(newLists);
  };
  const tenMinutes = 10 * 60 * 1000;

  const getLists = () => {
    if (
      lists.length === 0 ||
      !lastFetchDate ||
      lastFetchDate < new Date().getTime() - tenMinutes
    ) {
      // Get the lists on the API
      apiHelper.getLists().then((apiLists) => {
        finalSetLists(apiLists);
        localStorage.setItem(
          LISTS_LAST_FETCH_DATE_KEY,
          new Date().getTime()
        );
      });
    }
  };

  return (
    <ListsContext.Provider
      value={{ lists, setLists: finalSetLists, getLists }}
    >
      {children}
    </ListsContext.Provider>
  );
};
