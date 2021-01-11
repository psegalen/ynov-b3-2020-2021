import { createContext, useState } from "react";
import apiHelper from "../apiHelper";

export const ListsContext = createContext({
  lists: [],
  setLists: () => {},
  getLists: () => {},
});

export const ListsProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  const getLists = () => {
    if (lists.length === 0) {
      // Get the lists on the API
      apiHelper.getLists().then((apiLists) => {
        setLists(apiLists);
      });
    }
  };

  return (
    <ListsContext.Provider value={{ lists, setLists, getLists }}>
      {children}
    </ListsContext.Provider>
  );
};
