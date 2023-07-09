import React, { useContext, useEffect, useState } from "react";
import "./subdashboard.scss";
import { UserContext } from "../../context/userContext";
import historyTransfer from "../../assets/parchment.png";
import axios from "axios";

const SubDashboard = ({ projectIndex, setprojectIndex }) => {
  const { userdata, setuserdata } = useContext(UserContext);
  const [projectData, setProjectData] = useState(
    userdata.projects[projectIndex - 1]
  );
  const [devdata, setdevdata] = useState(userdata.devs);
  useEffect(() => {
    setProjectData(userdata.projects[projectIndex - 1]);

    console.log("project data , ", projectData);
  }, [projectIndex]);

  const th = ["No", "module_name", "progress", "test_score", "Code Submission"];

  const getDownloadLink = async () => {
    const data = { projectData };
    const jsonText = JSON.stringify(data, null, 2);
    const element = document.createElement("a");
    const file = new Blob([jsonText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "data.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const transferHistory = async (hindex) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/projectUpdate`,
        {
          params: {
            historyState: true,
            projectId: projectData._id,
          },
        }
      );
      console.log("put request for history response : ", response);
      const updatedProjectData = {
        ...projectData,
        historyState: !projectData.historyState,
      };

      const updatedProjects = userdata.projects.map((project, index) => {
        if (index === hindex) {
          return updatedProjectData;
        }
        return project;
      });
      console.log(updatedProjects);
      setuserdata({ ...userdata, projects: updatedProjects });
      setprojectIndex("");
    } catch (err) {
      console.log("error from put request ", err);
    }
  };

  return (
    <div className="subdash">
      <div className="projectName">{projectData.projectName}</div>
      <div className="subdata">
        <div className="subth-moduleheading">Modules</div>
        <div className="subTable">
          <div className="th">
            {th.map((heading, index) => {
              return (
                <span className="contentHeading" key={index}>
                  {heading}
                </span>
              );
            })}
          </div>

          <div className="tableContent">
            {projectData.modules.map((module, index) => {
              const progress_percentage = (module.moduleProgress + 1) * 25;

              let color = "#E14A4A";
              if (module.moduleFiles.length > 0) {
                color = "#BFDB38";
              }
              const testscore =
                module.moduleTestScore > 0
                  ? module.moduleTestScore + "/8"
                  : "Null";

              return (
                <div key={index} className="tr">
                  <span className=" index">{index + 1}</span>
                  <span className=" modname">{module.moduleName}</span>
                  <span className=" progress">
                    <ProgressBar percentage={progress_percentage}></ProgressBar>
                    {progress_percentage}%
                  </span>
                  <span className=" testscore">{testscore}</span>
                  <span className="submission" style={{ color }}>
                    {module.moduleFiles.length === 0 ? "Pending" : "Submitted"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="subth-Discription">Discription</div>
        <div className="discription">{projectData.description}</div>
        <div className="subth-AssignedDev">Assigned Dev</div>
        <div className="devnames">
          {projectData.assignedDev.map((devid) => {
            return devdata.map((dev) => {
              if (dev.devid === devid) {
                return <span>{dev.devname}</span>;
              }
            });
          })}
        </div>
        <button className="downloadbutton" onClick={() => getDownloadLink()}>
          Download Data
        </button>
        <img
          onClick={() => {
            transferHistory(projectIndex - 1);
          }}
          src={historyTransfer}
          alt="historyTransfer"
          className="historyTransfer"
        />
      </div>
    </div>
  );
};

export default SubDashboard;

const ProgressBar = ({ percentage }) => {
  let background = "#05d9ff";

  if (percentage > 90) {
    background = "#BFDB38";
  } else if (percentage >= 50) {
    background = "#FFA500";
  } else if (percentage <= 25) {
    background = "#FF4D4D";
  }

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%`, background }}
      />
    </div>
  );
};
