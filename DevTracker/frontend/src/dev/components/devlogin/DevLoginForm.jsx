import React, { useContext, useState } from "react";
import "./devlogin.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DevContext } from "../../Context/devContext";
import { DevLocalContext } from "../../Context/devLocalContext";
import { Navigate, useNavigate } from "react-router-dom";

const DevLoginForm = () => {
  const navigate = useNavigate();
  const [devid, setdevid] = useState("");
  const [password, setpassword] = useState("");
  const { devData, setdevData } = useContext(DevContext);
  const { devnavbar, devsetnavbar } = useContext(DevLocalContext);

  const handlesubmission = async () => {
    if (!devid || !password === "") {
      return toast.error("Please fill in all fields.", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        devid,
        password,
        type: "dev",
      });

      if (response) {
        //local storage setup for dev
        localStorage.setItem(
          "Devinfo",
          JSON.stringify(response.data.userinfo.user)
        );
        //dev context data set
        setdevData(response.data.userinfo.user);
        //checkmark
        console.log(" dev login request response : ", response);
        console.log(
          "Dev Login page -> ",
          "Local storage devinfo : ",
          JSON.parse(localStorage.getItem("Devinfo"))
        );

        //navigation bar setup to local storage
        localStorage.setItem("navbar", "dev");
        //navigation after login
        navigate("/dev/dashboard");
        devsetnavbar("dev");
        //checkmark
        console.log("[devlogin page ] navbar = ", devnavbar);

        setdevid("");
        setpassword("");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="devlogin">
      <div className="background">
        <div className="formcontent">
          <p>
            <label>developer ID</label>
            <input
              value={devid}
              onChange={(e) => setdevid(e.target.value)}
            ></input>
          </p>
          <p>
            <label>Passowrd</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
          </p>
        </div>
        <button type="submit" onClick={handlesubmission}>
          login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DevLoginForm;
