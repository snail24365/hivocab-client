import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Report.css";
import { Progress, Typography } from "antd";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
const { Paragraph } = Typography;

const Report = () => {
  const [studyInfo, setStudyInfo] = useState({
    study_goal: 0,
    study_amount: 0,
    latest_visit: "",
    writing_count_per_day: [],
  });

  const [goal, setGoal] = useState(10);

  const fetchStudyInfo = () => {
    axios.get("/user/study-info").then((res) => {
      console.log(res.data);
      setStudyInfo({ ...res.data });
      setGoal(res.data.study_goal);
    });
  };

  useEffect(() => {
    fetchStudyInfo();
  }, []);

  useEffect(() => {
    console.log(studyInfo);
  }, studyInfo);

  const onGoalChange = (goalText) => {
    if (!goalText) {
      return;
    }

    let isOnlyDigit = /^\d+$/.test(goalText);
    if (!isOnlyDigit) {
      alert("목표치는 숫자로만 입력해주세요.");
      return;
    }
    const goal = parseInt(goalText);
    if (goal === 0) {
      console.log("한 개 이상의 목표를 설정해주세요.");
    }
    //setGoal();
    axios.put("/user/goal", JSON.stringify({ study_goal: goal })).then(() => {
      setGoal(goal);
    });
    // put user goal change request -> callback
    // editable
  };

  return (
    <div className="report-container">
      <div className="progress-container">
        <div className="card">
          <div className="title">오늘 목표량</div>
          <Paragraph className="goal" editable={{ onChange: onGoalChange }}>
            {goal}
          </Paragraph>
        </div>
        <div className="card">
          <div className="title">오늘 학습량</div>
          <div className="text">{studyInfo.study_amount}</div>
        </div>
        <div className="card">
          <div className="title">성취도</div>
          <Progress
            width={80}
            className="progress"
            type="circle"
            percent={parseInt((studyInfo.study_amount / goal) * 100)}
          />
        </div>
      </div>
      <div className="graph-container">
        <div className="graph-wrap card">
          <h1 className="text">최근 7주일 간 학습량</h1>
          <BarChart
            width={800}
            height={350}
            data={studyInfo.writing_count_per_day}
          >
            <Bar dataKey="count" fill="#8884d8" />
            <XAxis dataKey="day" />
            <YAxis />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Report;
