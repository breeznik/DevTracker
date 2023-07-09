import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [userdata, setuserdata] = useState("");
  const [userEffect, setUserEffect] = useState("");
  const [localuserinfo, setlocaluserinfo] = useState(
    JSON.parse(localStorage.getItem("userinfo"))
  );

  const fetchdata = async () => {
    try {
      console.log("fetchdata hit");
      const response = await axios.get(
        `http://localhost:5000/user/admin/${localuserinfo.id}`,
        {
          params: {
            id: userdata.id,
            type: "admin",
          },
        }
      );
      if (response) {
        console.log("fetched throgh context : ", response.data.user);
        setuserdata(response.data.user);
        localStorage.setItem("userinfo", JSON.stringify(response.data.user));
      } else {
        console.log("no response ");
      }
    } catch (error) {
      console.log("logging error from fetched data : ", error);
    }
  };

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      console.log("userdata log from userContext: ", userdata);
      fetchdata();
    }
  }, [userEffect]);

  const contextValue = {
    userdata,
    setuserdata,
    userEffect,
    setUserEffect,
    fetchdata,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
