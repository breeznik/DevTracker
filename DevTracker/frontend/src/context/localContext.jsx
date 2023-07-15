import React, { createContext, useEffect, useState } from "react";

export const LocalContext = createContext(null);

const projectschema = {
  projectName: "",
  projectDiscription: "",
  projectDueDate: "",
  projectModules: [],
  assignedDev: [],
};

export const LocalContextProvider = (props) => {
  const [project, setproject] = useState(projectschema);

  const [navbar, setnavbar] = useState(
    localStorage.getItem("navbar") || "homepage"
  );

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      localStorage.setItem("navbar", navbar);
      localStorage.setItem("Projectinfo", JSON.stringify(project));
    }
  }, [navbar, project]);

  const contextValue = {
    navbar,
    setnavbar,
    project,
    setproject,
    projectschema,
  };

  return (
    <LocalContext.Provider value={contextValue}>
      {props.children}
    </LocalContext.Provider>
  );
};
