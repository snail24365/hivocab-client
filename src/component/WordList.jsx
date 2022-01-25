import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { saying } from "../wiseSaying";
import "./WordList.css";

var interval = undefined;

const WordList = () => {
  const [pageIndexes, setPageIndexes] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  var maximumPage = useRef(10);
  const pageSize = 20;

  const [words, setWords] = useState([]);

  useEffect(() => {
    axios.get("/word/count").then((response) => {
      maximumPage.current = Math.floor(response.data / pageSize);
      console.log(maximumPage);
    });

    fetchWordList(currentPage.current);
  }, []);

  useEffect(() => {
    updatePageIndex();
    fetchWordList();
  }, [currentPage]);

  const fetchWordList = () => {
    axios.get("/word?page=" + currentPage).then((res) => {
      console.log(res.data);
      setWords(res.data.map((item) => item.spelling));
    });
  };

  const updatePageIndex = () => {
    let maxIndex = maximumPage.current;
    var indexes = [];
    if (currentPage <= 5) {
      for (let i = 1; i <= 10; i++) {
        indexes.push(i);
      }
    } else if (currentPage <= maxIndex - 5) {
      for (let i = 1; i <= 10; i++) {
        console.log(currentPage - 5 + i);
        indexes.push(currentPage - 5 + i);
      }
    } else {
      for (let i = maximumPage - 9; i <= maxIndex; i++) {
        indexes.push(i);
      }
    }
    setPageIndexes(indexes);
  };

  const movePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const movePage = (page) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  const moveNextPage = () => {
    if (currentPage < maximumPage.current) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexes = pageIndexes.map((index) => (
    <li
      key={index}
      className={`index noselect ${index === currentPage ? "selected" : ""}`}
      onClick={() => {
        movePage(index);
      }}
    >
      <span className="noselect">{index}</span>
    </li>
  ));

  const wordList = words.map((word, index) => {
    return (
      <li key={index} className="card noselect">
        <p className="noselect">{word}</p>
      </li>
    );
  });

  const SAYING_SIZE = saying.length;
  const randomIndex = () => parseInt(Math.random() * SAYING_SIZE);
  let initSayingIndex = randomIndex();
  const [sayingIndex, setSayingIndex] = useState(initSayingIndex);

  useEffect(() => {
    const sec = 1000;
    interval = setInterval(() => {
      setSayingIndex(randomIndex());
    }, 15 * sec);
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className="word-list-page-container">
      <div className="saying">
        <p>{saying[sayingIndex].en}</p>
        <div className="translation">{saying[sayingIndex].ko}</div>
      </div>
      <div className="word-list-container">
        <ul className="word-list">{wordList}</ul>
      </div>
      <div className="page-index-box">
        <button onClick={movePreviousPage}>
          <i className="bx bx-left-arrow-alt"></i>
        </button>
        <ul className="page-indexes">{indexes}</ul>
        <button onClick={moveNextPage}>
          <i className="bx bx-right-arrow-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default WordList;
