import React, { createContext, useContext, useEffect, useState } from "react";
import { DevContext } from "./devContext";

export const DevLocalContext = createContext(null);

const projectsSchema = [
  {
    projectName: "",
    projectDiscription: "",
    projectDueDate: "",
    projectModules: [],
    assignedDev: [],
  },
];

export const DevLocalContextProvider = (props) => {
  const [devnavbar, devsetnavbar] = useState(
    localStorage.getItem("navbar") || "homepage"
  );
  const [localDevInfo, setlocalDevInfo] = useState(
    JSON.parse(localStorage.getItem("Devinfo"))
  );
  const [projectindex, setprojectindex] = useState(0);

  useEffect(() => {
    if (window.location.pathname.startsWith("/dev")) {
      localStorage.setItem("navbar", devnavbar);
    }
  }, [devnavbar]);

  const contextValue = {
    devnavbar,
    devsetnavbar,
    projectindex,
    setprojectindex,
    setlocalDevInfo,
  };

  return (
    <DevLocalContext.Provider value={contextValue}>
      {props.children}
    </DevLocalContext.Provider>
  );
};
