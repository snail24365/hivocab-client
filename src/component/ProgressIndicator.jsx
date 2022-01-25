import { Progress } from "antd";
import { useEffect, useRef } from "react";
import "./ProgressIndicator.css";

const ProgressIndicator = (props) => {
  //  let progressRef = useRef();
  return <Progress className="progress" type="circle" percent={75} />;
};

export default ProgressIndicator;
