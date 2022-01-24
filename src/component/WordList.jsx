import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

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

  const moveNextPage = () => {
    if (currentPage < maximumPage.current) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexes = pageIndexes.map((index) => (
    <li key={index} className={`${index === currentPage ? "selected" : ""}`}>
      {index}
    </li>
  ));

  const wordList = words.map((word, index) => {
    console.log(word);
    return (
      <li key={index}>
        <p>{word}</p>
      </li>
    );
  });

  return (
    <>
      <div>단어 리스트</div>
      <ul>{wordList}</ul>
      <div>
        <button onClick={movePreviousPage}>left</button>
        <ul>{indexes}</ul>
        <button onClick={moveNextPage}>right</button>
      </div>
    </>
  );
};

export default WordList;
