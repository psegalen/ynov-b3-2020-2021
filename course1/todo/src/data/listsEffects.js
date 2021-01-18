import apiHelper from "../apiHelper";
import {
  addNewList,
  listsAreLoading,
  setLists,
} from "./listsActions";

export const fetchLists = () => (dispatch, getState) => {
  const { data, lastFetchDate } = getState().lists;
  const tenMinutes = 10 * 60 * 1000;
  if (
    data.length === 0 ||
    lastFetchDate === null ||
    lastFetchDate < new Date().getTime() - tenMinutes
  ) {
    dispatch(listsAreLoading());
    apiHelper.getLists().then((apiLists) => {
      // Dispatch setlists action
      dispatch(setLists(apiLists));
    });
  }
};

export const addList = (title, color) => (dispatch) => {
  apiHelper.createList(title, color).then((addedList) => {
    dispatch(addNewList(addedList));
  });
};
