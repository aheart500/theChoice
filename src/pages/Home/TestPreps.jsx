import React from "react";
import sat from "../../images/sat.png";
import act from "../../images/ACT.png";
import est from "../../images/est.png";
import ap from "../../images/ap.jpg";
import { Link } from "react-router-dom";
const TestPreps = () => {
  return (
    <div className="testprep" id="tests">
      <h1>Test Preparation</h1>
      <div className="tests">
        <Link className="test" to={`/pretest?testType=sat`}>
          <img src={sat} width="120px" alt="sat" />
        </Link>
        <Link className="test" to={`/pretest?testType=act`}>
          <img src={act} width="120px" alt="act" />
        </Link>
        <Link className="test" to={`/pretest?testType=est`}>
          <img src={est} width="120px" alt="est" />
        </Link>
        <Link className="test" to={`/pretest?testType=ap`}>
          <img src={ap} width="120px" alt="ap" />
        </Link>
      </div>
    </div>
  );
};

export default TestPreps;
