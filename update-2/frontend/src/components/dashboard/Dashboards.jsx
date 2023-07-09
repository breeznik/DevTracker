import React, { useContext, useEffect, useState } from "react";
import "./dashboards.scss";
import { UserContext } from "../../context/userContext";
import line from "../../assets/Line9.png";
import projecticon from "../../assets/jobdescription.png";
import SubDashboard from "./SubDashboard";
import historyIcon from "../../assets/transactionhistory.png";
import axios from "axios";
const Dashboards = () => {
  const [reduce, setreduce] = useState("");
  const { userdata, setuserdata } = useContext(UserContext);
  const [activeHistory, setActiveHistory] = useState(false);
  const th = [
    "project name",
    "Progress",
    "Number of Modules",
    "Creation Date",
    "Due Date",
    "Test Score",
  ];

  const th2 = ["project name", "Progress"];

  useEffect(() => {
    console.log("useeffect from dahsboard admin on change of userdata");
    console.log(activeHistory);
  }, [userdata, activeHistory]);

  const handleSelection = (index) => {
    const i = index + 1;
    if (reduce !== i) {
      setreduce(i);
    } else {
      setreduce("");
    }
  };

  if (activeHistory) {
    return (
      <ProjectHistory
        userdata={userdata}
        activeHistory={activeHistory}
        setActiveHistory={setActiveHistory}
        setuserdata={setuserdata}
      ></ProjectHistory>
    );
  }

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
            {userdata.projects?.map((project, index) => {
              if (project.historyState) {
                return;
              }
              const totalModules = project.modules.length;
              const totalProgress = project.modules.reduce(
                (sum, module) => sum + (module.moduleProgress + 1),
                0
              );
              const projectProgress = (
                (totalProgress / (totalModules * 4)) *
                100
              ).toFixed(2);
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
                  <div className="td ProjectProgress">
                    <ProgressBar percentage={projectProgress} />
                    {`${projectProgress}%`}
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

        {reduce && (
          <SubDashboard
            projectIndex={reduce}
            setprojectIndex={setreduce}
          ></SubDashboard>
        )}
      </div>
      <div
        onClick={() => {
          setActiveHistory(!activeHistory);
        }}
        className="hIconContainer"
        style={
          activeHistory === true
            ? { backgroundColor: "lightgray", color: "black" }
            : {}
        }
      >
        <img src={historyIcon} alt="historyIcon" className="historyIcon" />
        HISTORY
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

const ProjectHistory = (props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  const userdata = props.userdata;
  const downloadAllData = () => {
    if (selectedProject === "" || !selectedProject) {
      alert("Please Select A project to download its data");
      return;
    }
    const data = userdata.projects[selectedProject];
    const jsonText = JSON.stringify(data, null, 2);
    const element = document.createElement("a");
    const file = new Blob([jsonText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "data.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);
  const deleter = async (ProjectID) => {
    console.log("delteing project id ", ProjectID);
    if (ProjectID === undefined) {
      alert("project id is undifned ");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/${ProjectID}`
      );
      console.log("delted ", response);

      const updatedProjectArray = userdata.projects.filter((_, index) => {
        return index !== selectedProject;
      });

      console.log("updated project array ", updatedProjectArray);
      props.setuserdata({ ...userdata, projects: updatedProjectArray });
      setSelectedProject("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="historyBoard">
        <div className="History">
          <div className="HistoryHeading">Project History</div>
        </div>

        <div className="historyContent">
          <div className="historyProjectHeading">Projects--</div>
          <div className="data">
            <div className="projectNameTable">
              <label className="tableLabel">ProjectName</label>

              {props.userdata.projects.map((project, index) => {
                if (project.historyState) {
                  return (
                    <li
                      style={
                        index === selectedProject
                          ? {
                              backgroundColor: "rgba(128, 0, 128, 0.65)",
                            }
                          : {}
                      }
                      onClick={() => setSelectedProject(index)}
                      key={index}
                    >
                      {project.projectName}
                    </li>
                  );
                }
              })}
            </div>
            {selectedProject !== "" ? (
              <div className="moduleNameTable">
                <label htmlFor="Tdata" className="tableLabel">
                  MODULES
                </label>
                <div className="Tdata">
                  {props.userdata.projects[selectedProject].modules.map(
                    (module, index) => {
                      return (
                        <li
                          style={
                            index === selectedModule
                              ? {
                                  backgroundColor: "rgba(0, 116, 217, 0.65)",
                                }
                              : {}
                          }
                          onClick={() => {
                            setSelectedModule(index);
                          }}
                        >
                          {module.moduleName}
                        </li>
                      );
                    }
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {selectedModule !== "" ? (
              <div className="fileNameTable">
                <label htmlFor="Tdata" className="tableLabel">
                  Files
                </label>

                <div className="Tdata">
                  {props.userdata.projects[selectedProject].modules[
                    selectedModule
                  ].moduleFiles.map((file, index) => {
                    return <li>{file.fileName}</li>;
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="historyButtons">
          <div
            className="deleteProject"
            onClick={() => {
              if (selectedProject === "") {
                return alert("please select project to be delete");
              }
              deleter(props.userdata.projects[selectedProject]._id);
            }}
          >
            <span>DELETE PROJECT</span>{" "}
          </div>
          <div
            className="downloadeAll"
            onClick={() => {
              downloadAllData();
            }}
          >
            <span>Download ALL DATA</span>
          </div>
        </div>

        <div
          onClick={() => {
            props.setActiveHistory(!props.activeHistory);
          }}
          className="hIconContainer"
          style={
            props.activeHistory === true
              ? { backgroundColor: "lightgray", color: "black" }
              : {}
          }
        >
          <img src={historyIcon} alt="historyIcon" className="historyIcon" />
          HISTORY
        </div>
      </div>
    </>
  );
};
