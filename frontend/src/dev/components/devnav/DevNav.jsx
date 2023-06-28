import React, { useContext, useEffect, useState } from "react";
import { DevContext } from "../../Context/devContext";
import { DevLocalContext } from "../../Context/devLocalContext";
import projecticon from "../../../assets/jobdescription.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./devnav.scss";
import logoutIcon from "../../../assets/exit.png";
const DevNav = () => {
  const { devData, setdevData } = useContext(DevContext);
  const { devsetnavbar, setprojectindex } = useContext(DevLocalContext);
  const [selectedProject, setSelectedProject] = useState(
    devData.project[0]?._id
  );

  const showNavbar = ["/dev/phase", "/dev/test", "/dev/files"].includes(
    window.location.pathname
  );

  useEffect(() => {});
  const logout = () => {
    localStorage.clear();
    devsetnavbar("homepage");
  };

  const handleSelection = (projectID, index) => {
    if (selectedProject !== projectID) {
      setSelectedProject(projectID);
      setprojectindex(index);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link className="link" to="/dev/dashboard">
            DevTracker
          </Link>
        </div>

        <div className="devlinks">
          <Link className="link" to="/dev/dashboard">
            Dashbaord
          </Link>
          <Link className="link" to="/dev/phase">
            Phase_Board
          </Link>
          <Link className="link" to="/dev/test">
            Testing
          </Link>
          <Link className="link" to="/dev/files">
            Files
          </Link>
        </div>

        <div className="logout">
          <Link
            to={"/"}
            className="linklogout"
            onClick={() => {
              logout();
            }}
          >
            {devData.devname}
          </Link>
          <div className="icondiv">
            <Link
              className="iconlink"
              to={"/"}
              onClick={() => {
                logout();
              }}
            >
              <img className="icon" src={logoutIcon}></img>
            </Link>
          </div>
        </div>
      </div>
      {showNavbar && (
        <div className="projects">
          <div className="heading">
            <img src={projecticon} alt="Icon" />
            <span style={{ paddingRight: "28px" }}>Projects - </span>
          </div>
          <div className="projectlist">
            {devData.project.map((project, index) => {
              return (
                <li
                  style={
                    selectedProject === project._id
                      ? { backgroundColor: "#068DA9", color: "black" }
                      : {}
                  }
                  onClick={() => handleSelection(project._id, index)}
                  key={index}
                >
                  {project.projectName}
                </li>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DevNav;
