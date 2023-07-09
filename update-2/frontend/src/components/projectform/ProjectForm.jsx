import rightarrow from "../../assets/right-arrow.png";
import "./projectformcss/projectform.scss";
import React, { useContext, useState } from "react";
import { LocalContext } from "../../context/localContext";
import { ToastContainer, toast } from "react-toastify";

const ProjectForm = (props) => {
  const { project, setproject } = useContext(LocalContext);
  const next = (e) => {
    const selectedDate = new Date(project.projectDueDate);
    const currentDate = new Date();
    e.preventDefault();
    if (
      project.projectName &&
      project.projectDiscription &&
      project.projectDueDate
    ) {
      if (selectedDate.getTime() > currentDate.getTime()) {
        props.setformindex(props.formindex + 1);
      } else if (selectedDate.getTime() < currentDate.getTime()) {
        toast.warning("Please Select A date in Future", {
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
      const selectedDate = new Date(e.target.value);
      const currentDate = new Date();

      setproject({
        ...project,
        projectDueDate: e.target.value,
      });

      if (selectedDate.getTime() < currentDate.getTime()) {
        toast.warning("Please Select A date in Future", {
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

  return (
    <div className="addproject">
      <div className="background">
        <form>
          <div className="logo">Project Form</div>
          <p>
            <label>Project Name</label>
            <input
              placeholder="Project Name...."
              value={project.projectName}
              type="text"
              required
              onChange={(e) => datahandler(e, "projectname")}
            ></input>
          </p>
          <p>
            <label>Discription</label>
            <textarea
              placeholder="Project Discription here....."
              value={project.projectDiscription}
              type="text"
              onChange={(e) => datahandler(e, "desc")}
              required
              className="textareaclass"
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

          <button type="submit" onClick={next}>
            Next
            <img src={rightarrow} alt="Icon" />
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProjectForm;
