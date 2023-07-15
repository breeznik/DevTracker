import rightarrow from "../../assets/right-arrow.png";
import "./projectformcss/projectform.scss";
import "./projectformcss/moduleform.scss";
import { useState, useContext } from "react";
import { LocalContext } from "../../context/localContext";
import backarrow2 from "../../assets/leftarrow2.png";
import del from "../../assets/minus.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const singleModuleSchema = {
  moduleID: "",
  moduleName: "",
  moduleTestScore: 0,
  moduleProgress: 0,
  moduleFiles: [],
};
const Moduleform = (props) => {
  const { project, setproject } = useContext(LocalContext);
  const [singleModule, setsingleModule] = useState(singleModuleSchema);

  const next = (s) => {
    if (s === "back") {
      props.setformindex(props.formindex - 1);
    }

    if (project.projectModules.length !== 0) {
      if (s === "next") {
        props.setformindex(props.formindex + 1);
      }
    } else {
      toast.warn("Modules cannot be empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const adder = () => {
    if (!singleModule == "") {
      setproject({
        ...project,
        projectModules: [...project.projectModules, singleModule],
      });
      setsingleModule(singleModuleSchema);
    } else {
      toast.error("Module value cannot be empty!", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const keyhandler = (e) => {
    if (e.key == "Enter") {
      if (!singleModule == "") {
        setproject({
          ...project,
          projectModules: [...project.projectModules, singleModule],
        });
        setsingleModule(singleModuleSchema);
      } else {
        toast.error("Module value cannot be empty!", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  const updateModules = (index) => {
    const newModules = [...project.projectModules];
    newModules.splice(index, 1);

    setproject({
      ...project,
      projectModules: newModules,
    });
  };
  return (
    <div className="addmodule">
      <div className="background">
        <img
          className="backarrow"
          onClick={() => next("back")}
          src={backarrow2}
          alt="Icon"
        />
        <div className="heading">Modules</div>
        <div className="mbackground">
          <div className="moudlediv">
            {project.projectModules.map((module, index) => {
              return (
                <li className="li" key={index}>
                  <span className="indexvalue">{index + 1}.</span>{" "}
                  {module.moduleName}
                  <img
                    className="del"
                    onClick={() => updateModules(index)}
                    src={del}
                    alt="Icon"
                  />
                </li>
              );
            })}
          </div>
          <input
            value={singleModule.moduleName}
            type="text"
            onKeyDown={(e) => keyhandler(e)}
            placeholder="Module Name here....."
            onChange={(e) =>
              setsingleModule({
                ...singleModuleSchema,
                moduleName: e.target.value,
                moduleID: uuidv4(),
              })
            }
          />
        </div>
        <div className="buttons">
          <button onClick={adder}>+ADD MOUDLE</button>
          <button onClick={() => next("next")}>
            Next
            <img src={rightarrow} alt="Icon" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Moduleform;
