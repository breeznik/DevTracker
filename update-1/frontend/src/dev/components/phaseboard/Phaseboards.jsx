import { DevLocalContext } from "../../Context/devLocalContext";
import { DevContext } from "../../Context/devContext";
import { useContext, useEffect, useState } from "react";
import "./phaseboards.scss";
import axios from "axios";
import nextarrow from "../../../assets/next.png";
import next22 from "../../../assets/next22.png";
import back22 from "../../../assets/back22.png";

const Phaseboards = () => {
  const { setdevData, devData } = useContext(DevContext);
  const { projectindex } = useContext(DevLocalContext);
  const stageNames = ["Backlog", "Development", "Testing", "Done"];
  const progressValues = [0, 1, 2, 3];

  const [backlog, setbacklog] = useState([]);
  const [Development, setDevelopment] = useState([]);
  const [Testing, setTesting] = useState([]);
  const [Done, setDone] = useState([]);

  useEffect(() => {
    if (devData && projectindex !== null && !undefined) {
      const fbacklog = devData.project[projectindex].modules.filter(
        (module) => module.moduleProgress === progressValues[0]
      );
      const fDevelopment = devData.project[projectindex].modules.filter(
        (module) => module.moduleProgress === progressValues[1]
      );
      const fTesting = devData.project[projectindex].modules.filter(
        (module) => module.moduleProgress === progressValues[2]
      );
      const fDone = devData.project[projectindex].modules.filter(
        (module) => module.moduleProgress === progressValues[3]
      );

      setbacklog(fbacklog);
      setDevelopment(fDevelopment);
      setTesting(fTesting);
      setDone(fDone);
    }
  }, [devData, projectindex]);

  return (
    <div className="boards">
      {progressValues.map((pval, index) => {
        return (
          <Board
            stageNames={stageNames}
            stage={pval}
            progressValues={progressValues}
            key={index}
            backlog={backlog}
            Development={Development}
            Testing={Testing}
            Done={Done}
            devData={devData}
            setdevData={setdevData}
            projectindex={projectindex}
            setbacklog={setbacklog}
            setDevelopment={setDevelopment}
            setTesting={setTesting}
            setDone={setDone}
          ></Board>
        );
      })}
    </div>
  );
};

export default Phaseboards;

const Board = ({
  stage,
  backlog,
  Development,
  Testing,
  Done,
  devData,
  projectindex,
  setdevData,
  stageNames,
}) => {
  const next = async (moduleID) => {
    const updatedModules = devData.project[projectindex].modules.map(
      (module) => {
        if (module.moduleID === moduleID) {
          return { ...module, moduleProgress: stage + 1 };
        }
        return module;
      }
    );
    // console.log("updatedModules ", updatedModules);

    const projects = [...devData.project];
    // console.log("projects before update ", projects);

    projects[projectindex] = {
      ...projects[projectindex],
      modules: updatedModules,
    };
    // console.log("projects after update ", projects);

    try {
      await axios.put(`http://localhost:5000/dev/updateModule`, {
        params: {
          projectId: devData.project[projectindex]._id,
          updatedModules,
        },
      });
      // console.log("put request response : ", response);
    } catch (err) {
      console.log("error from put request ", err);
    }
    setdevData((prevData) => {
      return {
        ...prevData,
        project: projects,
      };
    });
  };

  const back = async (moduleID, moduleProgress) => {
    const updatedModules = devData.project[projectindex].modules.map(
      (module) => {
        if (module.moduleID === moduleID) {
          return { ...module, moduleProgress: stage - 1 };
        }
        return module;
      }
    );
    // console.log("updatedModules ", updatedModules);

    const projects = [...devData.project];
    // console.log("projects before update ", projects);

    projects[projectindex] = {
      ...projects[projectindex],
      modules: updatedModules,
    };
    // console.log("projects after update ", projects);
    try {
      await axios.put(`http://localhost:5000/dev/updateModule`, {
        params: {
          projectId: devData.project[projectindex]._id,
          updatedModules,
        },
      });
      // console.log("put request response : ", response);
    } catch (err) {
      console.log("error from put request ", err);
    }
    setdevData((prevData) => {
      return {
        ...prevData,
        project: projects,
      };
    });
  };

  let modsToMap = backlog;
  if (stageNames[stage] === "Development") {
    modsToMap = Development;
  }
  if (stageNames[stage] === "Testing") {
    modsToMap = Testing;
  }
  if (stageNames[stage] === "Done") {
    modsToMap = Done;
  }

  return (
    <div className="board">
      <div className="heading">{stageNames[stage]}</div>
      <div className="mlist">
        {modsToMap.map((module, index) => {
          return (
            <Smodule
              back={back}
              next={next}
              key={index}
              module={module}
              index={index}
            ></Smodule>
          );
        })}
      </div>
    </div>
  );
};

const Smodule = ({ module, index, next, back }) => {
  const handleClick = (s) => {
    if (s === "M") {
      back(module.moduleID, module.moduleProgress);
    }
    if (s === "i") {
      next(module.moduleID, module.moduleProgress);
    }
  };

  return (
    <li key={index} className="module-item">
      {module.moduleProgress > 0 && (
        <img
          onClick={() => handleClick("M")}
          className="back"
          src={back22}
        ></img>
      )}
      {module.moduleName}
      {module.moduleProgress < 3 && (
        <img
          onClick={() => handleClick("i")}
          className="img"
          src={next22}
        ></img>
      )}
    </li>
  );
};
