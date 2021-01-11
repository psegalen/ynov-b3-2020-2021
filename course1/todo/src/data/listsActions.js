export const listsActions = {
  SET_LISTS: "SET_LISTS",
};

export const setLists = (lists) => ({
  type: listsActions.SET_LISTS,
  lists,
});
