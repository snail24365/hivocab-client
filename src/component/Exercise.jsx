import React, { useEffect, useReducer, useRef } from "react";
import {
  exerciseReducer,
  FETCH_EXERCISE,
  ADD_WRITING,
  DELETE_WRITING,
} from "../reducer/ExerciseReducer";

const Exercise = () => {
  useEffect(() => {
    dispatch({ type: FETCH_EXERCISE });
  }, []);

  const writingRef = useRef();

  const emptyExerciseInfo = {
    word: "",
    description: "",
    examples: [],
    writings: [],
  };

  const [exerciseInfo, dispatch] = useReducer(
    exerciseReducer,
    emptyExerciseInfo
  );

  const examples = exerciseInfo.examples.map((example) => (
    <li key={example.id}>{example.example}</li>
  ));

  const writings = exerciseInfo.writings.map((writing) => (
    <li key={writing.id}>
      {writing.writing}
      <button onClick={() => deleteWriting(writing.id)}>x</button>
    </li>
  ));

  const addWriting = () => {
    const writingText = writingRef.current.value;
    if (writingText === undefined || writingText === "") {
      return;
    }
    dispatch({ type: ADD_WRITING, payload: writingRef.current.value });
    writingRef.current.value = "";
  };

  const deleteWriting = (index) => {
    dispatch({ type: DELETE_WRITING, payload: index });
  };

  const onWritingInputKeyDown = (e) => {
    if (e.key === "Enter") {
      addWriting();
    }
  };

  const moveNextExercise = () => {
    dispatch({ type: FETCH_EXERCISE });
  };

  return (
    <>
      <div className="card">
        <h1>{exerciseInfo.word}</h1>
        <div>{exerciseInfo.description}</div>
        <div>
          <ul>{examples}</ul>
        </div>
        <hr />
        <div>
          <h1>내가 작성한 문장</h1>
          <ul>{writings}</ul>
        </div>
        <div>
          <input
            type="text"
            id="writingInput"
            ref={writingRef}
            onKeyDown={onWritingInputKeyDown}
          />
          <button id="addMyWriting" onClick={addWriting}>
            제출
          </button>
        </div>

        <button onClick={moveNextExercise}>다음 예제</button>
      </div>
    </>
  );
};

export default Exercise;
