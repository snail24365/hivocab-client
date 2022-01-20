import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Exercise = () => {
  const writingRef = useRef();

  const [exercise, setExercise] = useState({
    currentUsecase: 0,
    word: "",
    description: "",
    examples: [],
  });
  const [writing, setWriting] = useState([]);

  useEffect(() => {
    let init = async () => {
      await fetchExercise();
      await fetchWriting();
    };
    init();
  }, []);

  useEffect(() => {
    fetchWriting();
  }, [exercise]);

  const fetchExercise = async () => {
    const response = await axios.get("/exercise");
    const data = response.data;
    setExercise({
      currentUsecase: data.usecase.id,
      word: data.word.spelling,
      description: data.usecase.description_sentence,
      examples: data.examples.map((example) => example.sentence),
    });
    return data;
  };

  const fetchNextExercise = async () => {
    const response = await axios.post("/exercise/next");
    const data = response.data;
    setExercise({
      currentUsecase: data.usecase.id,
      word: data.word.spelling,
      description: data.usecase.description_sentence,
      examples: data.examples.map((example) => example.sentence),
    });
  };

  const fetchWriting = async () => {
    console.log("Fetch Writing Called");
    const url = "/writing?usecaseId=" + exercise.currentUsecase;
    console.log(url);
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);

    setWriting(
      response.data.map((item) => {
        return {
          id: item.id,
          created_at: item.created_at,
          writing: item.writing,
        };
      })
    );
    return data;
  };

  const addWriting = async () => {
    const url = "/writing";
    const sentence = writingRef.current.value;
    if (sentence.length === 0) {
      return;
    }
    writingRef.current.value = "";
    await axios
      .post(url, { writing: sentence, usecase_id: exercise.currentUsecase })
      .then((response) => {
        console.log(response);
        setWriting([
          ...writing,
          {
            id: response.data.id,
            created_at: response.data.created_at,
            writing: response.data.writing,
          },
        ]);
      });
  };

  const exampleList = exercise.examples.map((example, index) => (
    <li key={index}>{example}</li>
  ));

  const writingList = writing.map((item, index) => {
    return (
      <li key={index}>
        <span>{item.writing}</span>
        <button>X</button>
      </li>
    );
  });

  const onWritingInputKeyDown = (e) => {
    if (e.code === "Enter") {
      addWriting();
    }
  };

  const moveNextExercise = () => {
    fetchNextExercise();
  };

  return (
    <>
      <div className="card">
        <h1>{exercise.word}</h1>
        <div>{exercise.description}</div>
        <ul>{exampleList}</ul>
      </div>

      <div>
        <ul>{writingList}</ul>
      </div>

      <div className="card">
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
        <button onClick={moveNextExercise} disabled={writing.length === 0}>
          다음 예제
        </button>
      </div>
    </>
  );
};

export default Exercise;
