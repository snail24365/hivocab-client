import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { removeBraceAndEscaping } from "../util/util";
import { saying } from "../wiseSaying";
import "./Exercise.css";

const Exercise = () => {
  const writingRef = useRef();

  const [exercise, setExercise] = useState({
    currentUsecase: -1,
    word: "",
    description: "",
    examples: [],
  });
  const [writing, setWriting] = useState([]);

  const writingListRef = useRef();

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
    if (exercise.currentUsecase === -1) {
      return;
    }
    const url = "/writing?usecaseId=" + exercise.currentUsecase;
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);

    let writing = data.map((tuple) => {
      return {
        id: tuple.id,
        created_at: tuple.created_at,
        writing: tuple.writing,
      };
    });
    setWriting(writing);
  };

  const deleteWriting = async (writingId) => {
    axios.delete("/writing?id=" + writingId).then((res) => {
      console.log(res);
      fetchWriting();
    });
    console.log(writingId);
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
    <li key={index}>{removeBraceAndEscaping(example)}</li>
  ));

  const writingList = writing.map((item, index) => {
    return (
      <li key={index} className="writing-item card">
        <span className="sentence">{item.writing}</span>
        <span className="createdAt">
          {new Date(item.created_at).toUTCString()}
        </span>
        <button
          className="delete-button"
          onClick={() => {
            deleteWriting(item.id);
          }}
        >
          X
        </button>
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

  useEffect(() => {
    writingListRef.current.scrollTop = writingListRef.current.scrollHeight;
  }, [writing]);

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

  return (
    <div className="exercise-container">
      <div className="word-info-box card">
        <h1 className="word-spelling">
          {removeBraceAndEscaping(exercise.word)}
        </h1>
        <p className="description">
          {removeBraceAndEscaping(exercise.description)}
        </p>
        <ul className="example-list">{exampleList}</ul>
      </div>

      <div className="writing-box card ">
        <div className="writing-list-wrapper">
          <div className="header">
            <h1 className="title">My writings</h1>
            <br />
            <hr />
          </div>

          <div className="writing-list" ref={writingListRef}>
            <ul>{writingList}</ul>
          </div>
        </div>
        <div className="form">
          <input
            type="text"
            id="writingInput"
            ref={writingRef}
            onKeyDown={onWritingInputKeyDown}
          />
          <button id="addMyWriting" onClick={addWriting}>
            <i className="bx bx-pencil"></i>
          </button>
        </div>
      </div>
      <div className="card right-box">
        <div className="right-box-content">
          <h3 className="title">학습 방법</h3>
          <ul>
            <li className="subitem">
              1. 단어 설명과 예제를 읽고 그 용법을 파악
            </li>
            <li className="subitem">2. 해당 용법의 예문을 직접 작문</li>
            <li className="subitem">3. 다음 예제로 가는 ➞ 버튼 누르기 </li>
          </ul>
          <p className="text"></p>
        </div>
        {writing.length === 0 ? (
          <></>
        ) : (
          <button onClick={moveNextExercise} disabled={writing.length === 0}>
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Exercise;
