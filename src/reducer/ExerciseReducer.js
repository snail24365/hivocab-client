export const ADD_WRITING = "ADD_WRITING";
export const REMOVE_WRITING = "ADD_WRITING";
export const FETCH_EXERCISE = "FETCH_WRITING";
export const DELETE_WRITING = "DELETE_WRITING";

var dummyExerciseInfo = [
  {
    word: "apple", description: "this is description", examples: [{ id: 0, example: "apple sentence1" }, { id: 1, example: "apple sentence2" }]
    , writings: []
  },
  {
    word: "banana", description: "this is description", examples: [{ id: 0, example: "apple sentence1" }, { id: 1, example: "apple sentence2" }]
    , writings: []
  },
  {
    word: "orange", description: "this is description", examples: [{ id: 0, example: "apple sentence1" }, { id: 1, example: "apple sentence2" }]
    , writings: []
  }
]

var count = 0;
export const exerciseReducer = (exercise, { type, payload }) => {
  switch (type) {
    case ADD_WRITING:
      return { ...exercise, "writings": [...exercise.writings, { id: exercise.writings.length, writing: payload }] };
    case FETCH_EXERCISE:
      count = (count + 1) % 3;
      return dummyExerciseInfo[count];
    case DELETE_WRITING:
      return { ...exercise, "writings": exercise.writings.filter((x) => x.id !== payload) };
    default:
      break;
  }
}
