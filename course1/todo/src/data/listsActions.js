export const listsActions = {
  SET_LISTS: "SET_LISTS",
  ADD_NEW_LIST: "ADD_NEW_LIST",
};

export const setLists = (lists) => ({
  type: listsActions.SET_LISTS,
  lists,
});

export const addNewList = (list) => ({
  type: listsActions.ADD_NEW_LIST,
  list,
});
