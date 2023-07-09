import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./subdashboard.scss";
import { DevContext } from "../../Context/devContext";
import { storage } from "../../../firebase";
import {
  getDownloadURL,
  list,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

const SubDashboard = ({ projectIndex }) => {
  const { devData } = useContext(DevContext);
  const [projectData, setProjectData] = useState(
    devData.project[projectIndex - 1]
  );

  useEffect(() => {
    setProjectData(devData.project[projectIndex - 1]);

    console.log("project data , ", projectData);
  }, [projectIndex]);

  const th = ["No", "module_name", "progress", "test_score", "Code Submission"];
  const getDownloadLink = async (filepath) => {
    const filelistRef = ref(storage, filepath);

    // const downloadUrl = await getDownloadURL(filelistRef);
    // console.log("downlaod url ", downloadUrl);

    // const folderRef = ref(storage, filepath);
    // const files = await listAll(folderRef);
    // console.log(files);

    // const DataLinkModuleId = projectData.modules.map((module) => {
    //   return module;
    // });

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
        <button
          className="downloadbutton"
          onClick={() =>
            getDownloadLink(
              "projects/64a94110369f84b7e30626d1/1bc9a28c-5062-4306-9ca6-f30310833ac8/finalMap.pdf_uuid_489a9021-f578-4ede-8336-e5c7c39c24b3projects/648b347699b11b6b347eed60"
            )
          }
        >
          Download Data
        </button>
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
