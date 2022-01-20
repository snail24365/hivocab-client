import axios from "axios";

export const ADD_WRITING = "ADD_WRITING";
export const REMOVE_WRITING = "ADD_WRITING";
export const FETCH_WRITING = "FETCH_WRITING";
export const DELETE_WRITING = "DELETE_WRITING";

export const writingReducer = (writings, { type, payload }) => {
  switch (type) {
    case ADD_WRITING:
      return [...writings];
    case FETCH_WRITING:
      return [...writings];
    case DELETE_WRITING:
      return [...writings];
    default:
      break;
  }
}
