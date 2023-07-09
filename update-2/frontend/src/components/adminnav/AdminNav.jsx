import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./adminnav.scss";
import { LocalContext } from "../../context/localContext";
import logouticon from "../../assets/exit.png";
const AdminNav = () => {
  const { setuserdata, userdata } = useContext(UserContext);
  const { setnavbar, setproject, projectschema } = useContext(LocalContext);
  const currentPath = window.location.pathname;
  const logout = () => {
    localStorage.clear();
    setnavbar("homepage");
    setuserdata("");
    setproject(projectschema);
  };

  if (currentPath == "/admin/dashboard" || "admin/project" || "admin/dev") {
    return (
      <>
        <div className="navbar">
          <div className="logo">
            <Link className="link" to="/admin/dashboard">
              DevTracker
            </Link>
          </div>

          <div className="adminlinks">
            <Link className="link" to="/admin/dashboard">
              Dashbaord
            </Link>
            <Link className="link" to="/admin/project">
              +Project
            </Link>
            <Link className="link" to="/admin/dev">
              +AddDev
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
              {userdata?.email}
            </Link>
            <div className="icondiv">
              <Link
                className="iconlink"
                to={"/"}
                onClick={() => {
                  logout();
                }}
              >
                <img className="icon" src={logouticon}></img>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AdminNav;
