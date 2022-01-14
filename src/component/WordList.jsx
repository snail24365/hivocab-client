import React, { useEffect, useState } from "react";

function fetchWordInfos() {
  return [...Array(10).keys()].map((x) => {
    return {
      id: x,
      word: "Apple",
      usages: [
        { id: 0, description: "description1" },
        { id: 1, description: "description2" },
      ],
    };
  });
}

function fetchMaxPageNumber() {
  return fetchWordInfos().length;
}

const WordList = () => {
  const [wordInfos, setWordInfos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  var maxPageNumber = 9999999;
  useEffect(() => {
    setWordInfos(fetchWordInfos());
    maxPageNumber = fetchMaxPageNumber();
  }, []);

  const movePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const moveNextPage = () => {
    if (currentPage < maxPageNumber) {
      setCurrentPage(currentPage + 1);
    }
  };

  const wordList = wordInfos.map((wordInfo) => (
    <li>
      <div>{wordInfo.word}</div>
      <div>
        <ul>
          {wordInfo.usages.map((usage) => (
            <li>{usage.description}</li>
          ))}
        </ul>
      </div>
    </li>
  ));

  const pageIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
    <li key={x} className={`${x === currentPage ? "selected" : ""}`}>
      {x}
    </li>
  ));
  pageIndexes.push(<li key="dots"> ... </li>);

  return (
    <>
      <div>단어 리스트</div>
      <ul>{wordList}</ul>
      <div>
        <button onClick={movePreviousPage}>left</button>
        <ul>{pageIndexes}</ul>
        <button onClick={moveNextPage}>right</button>
      </div>
    </>
  );
};

export default WordList;
