import React from "react";

const Report = () => {
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
