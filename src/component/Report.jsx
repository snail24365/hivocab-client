import axios from "axios";
import React, { useEffect, useState } from "react";

const Report = () => {
  const [studyInfo, setStudyInfo] = useState({
    study_goal: 10,
    study_amount: 0,
    latest_visit: "",
    count_by_day: [],
  });

  const fetchStudyInfo = () => {
    axios.get("/user/study-info").then((res) => {
      console.log(res.data);
      setStudyInfo({ ...res.data });
    });
  };

  useEffect(() => {
    fetchStudyInfo();
  }, []);

  return (
    <>
      <div>레포트</div>
      <div>오늘 목표 분량</div>
      <div>50</div>
      <div>오늘 공부한 분량</div>
      <div>14</div>
      <div>Progress Indicator</div>
      <div>출석표</div>
      <table>
        <tr>
          <td>월</td>
          <td>화</td>
          <td>수</td>
          <td>목</td>
          <td>금</td>
          <td>토</td>
          <td>일</td>
        </tr>
        <tr>
          <td>o</td>
          <td>o</td>
          <td>o</td>
          <td>x</td>
          <td>x</td>
          <td>o</td>
          <td>x</td>
        </tr>
      </table>
    </>
  );
};

export default Report;
