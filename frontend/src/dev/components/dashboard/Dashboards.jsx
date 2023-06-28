import React, { useContext, useEffect, useState } from "react";
import "./dashboards.scss";
import projecticon from "../../../assets/jobdescription.png";
import line from "../../../assets/Line9.png";
import { DevContext } from "../../Context/devContext";
import SubDashboard from "./SubDashboard";
const Dashboards = () => {
  const { devData } = useContext(DevContext);
  const [reduce, setreduce] = useState("");

  const th = [
    "project name",
    "Progress",
    "Number of Modules",
    "Creation Date",
    "Due Date",
    "Test Score",
  ];
  const th2 = ["project name", "Progress"];
  useEffect(() => console.log(devData), []);
  const handleSelection = (index) => {
    const i = index + 1;
    if (reduce !== i) {
      setreduce(i);
    } else {
      setreduce("");
    }
  };
  return (
    <div className="dashboard">
      <div className="heading">
        <img src={projecticon} alt="Icon" />
        <span style={{ paddingRight: "28px" }}>Projects</span>
      </div>
      <div className="dashContainer">
        <div className="tabel" style={reduce ? { width: "460px" } : {}}>
          <div className="thDiv">
            {reduce
              ? th2.map((heading, index) => {
                  return (
                    <span
                      style={reduce ? { width: "50%" } : {}}
                      key={index}
                      className="th"
                    >
                      {heading}
                    </span>
                  );
                })
              : th.map((heading, index) => {
                  return (
                    <span key={index} className="th">
                      {heading}
                    </span>
                  );
                })}
          </div>

          <div className="tdDiv">
            {devData.project.map((project, index) => {
              const totalModules = project.modules.length;
              const totalProgress = project.modules.reduce(
                (sum, module) => sum + (module.moduleProgress + 1),
                0
              );
              const projectProgress =
                (totalProgress / (totalModules * 4)) * 100;
              const totalTestScore = project.modules.reduce(
                (sum, module) => sum + module.moduleTestScore,
                0
              );
              const averageTestScore = totalTestScore / totalModules;
              const scaledTestScore = (averageTestScore / 8) * 10;

              return (
                <div
                  key={index}
                  className="tr"
                  style={
                    reduce === index + 1
                      ? {
                          backgroundColor: "rgba(62, 128, 116, 0.6)",
                        }
                      : {}
                  }
                  onClick={() => handleSelection(index)}
                >
                  <div
                    style={reduce ? { width: "50%" } : {}}
                    className="td projectName"
                  >
                    <img src={line}></img>
                    {project.projectName}
                  </div>
                  <div
                    className="td ProjectProgress"
                    style={reduce ? { width: "50%" } : {}}
                  >
                    <ProgressBar percentage={projectProgress} />
                    {`${projectProgress.toFixed(2)}%`}
                  </div>
                  {!reduce && (
                    <>
                      <div className="td TotalModules">{totalModules}</div>
                      <div className="td CreationDate">
                        {project.createdAt
                          ? project.createdAt.toString().substring(0, 10)
                          : ""}
                      </div>
                      <div className="td DueDate">{project.dueDate}</div>
                      <div className="td TestScore">
                        {scaledTestScore.toFixed(2)}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {reduce && <SubDashboard projectIndex={reduce}></SubDashboard>}
      </div>
    </div>
  );
};

export default Dashboards;

const ProgressBar = ({ percentage }) => {
  let background = "#05d9ff";

  if (percentage > 90) {
    background = "#BFDB38";
  } else if (percentage >= 50) {
    background = "#FFA500";
  } else if (percentage <= 25) {
    background = "#FF4D4D";
  }

  useEffect(() => {
    console.log(percentage);
  }, []);
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%`, background }}
      />
    </div>
  );
};
