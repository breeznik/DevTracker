import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DevContext = createContext(null);

export const DevContextProvider = (props) => {
  const [devData, setdevData] = useState(
    JSON.parse(localStorage.getItem("Devinfo"))
  );
  const [devEffect, setDevEffect] = useState("");
  useEffect(() => {
    if (window.location.pathname.startsWith("/dev")) {
      localStorage.setItem("Devinfo", JSON.stringify(devData));
    }
  }, [devData]);
  const contextValue = {
    devData,
    setdevData,
    devEffect,
    setDevEffect,
  };
  return (
    <DevContext.Provider value={contextValue}>
      {props.children}
    </DevContext.Provider>
  );
};
