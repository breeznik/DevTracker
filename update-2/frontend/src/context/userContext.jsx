import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [userdata, setuserdata] = useState("");

  useEffect(() => {
    console.log("userContext hit---------");
    const localdata = JSON.parse(localStorage.getItem("userinfo"));
    if (userdata) {
      localStorage.setItem("userinfo", JSON.stringify(userdata));
    } else if (localdata) {
      console.log("settingn userdata to localdata --> ", localdata);
      setuserdata(localdata);
    }
  }, [userdata]);

  const contextValue = {
    userdata,
    setuserdata,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
