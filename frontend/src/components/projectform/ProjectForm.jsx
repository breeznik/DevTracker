import rightarrow from "../../assets/right-arrow.png";
import "./projectformcss/projectform.scss";
import React, { useContext } from "react";
import { LocalContext } from "../../context/localContext";
const ProjectForm = (props) => {
  const { project, setproject } = useContext(LocalContext);

  const next = () => {
    if (
      project.projectName &&
      project.projectDiscription &&
      project.projectDueDate
    ) {
      props.setformindex(props.formindex + 1);
    }
  };

  const datahandler = (e, dataName) => {
    if (dataName === "projectname") {
      setproject({
        ...project,
        projectName: e.target.value,
      });
    }

    if (dataName === "desc") {
      setproject({
        ...project,
        projectDiscription: e.target.value,
      });
    }
    if (dataName === "date") {
      setproject({
        ...project,
        projectDueDate: e.target.value,
      });
    }
  };

  return (
    <div className="addproject">
      <div className="background">
        <form>
          <div className="logo">Project Form</div>
          <p>
            <label>Project Name</label>
            <input
              value={project.projectName}
              type="text"
              required
              onChange={(e) => datahandler(e, "projectname")}
            ></input>
          </p>
          <p>
            <label>Discription</label>
            <textarea
              value={project.projectDiscription}
              type="text"
              onChange={(e) => datahandler(e, "desc")}
              required
            ></textarea>
          </p>
          <p>
            <label>Due_Date</label>
            <input
              value={project.projectDueDate}
              type="date"
              onChange={(e) => datahandler(e, "date")}
              required
            ></input>
          </p>

          <button onClick={next}>
            Next
            <img src={rightarrow} alt="Icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
