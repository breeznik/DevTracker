import React, { useState, useContext } from "react";
import "./devcreationform.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { LocalContext } from "../../context/localContext";

const DevCreationForm = () => {
  const [devname, setdevname] = useState("");
  const [devid, setdevid] = useState("");
  const [password, setpassword] = useState("");
  const { userdata, setUserEffect } = useContext(UserContext);

  const handlesubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/user/register`, {
        adminid: userdata.id,
        devname,
        devid,
        password,
        type: "dev",
      });
      setdevname("");
      setdevid("");
      setpassword("");
      console.log(" from devcreationform - > response  : ", response);
      // Show success message
      toast.success("Developer account created successfully", {
        autoClose: 3000,
      });
      setUserEffect(Math.random().toString(36).substring(2, 4));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="devcreationform">
      <div className="heading">Dev Creation Form </div>
      <form onSubmit={(e) => handlesubmission(e)}>
        <p>
          <label>Dev Name</label>
          <input
            value={devname}
            onChange={(e) => setdevname(e.target.value)}
            required
          ></input>
        </p>
        <p>
          <label>Developer ID</label>
          <input
            required
            value={devid}
            onChange={(e) => setdevid(e.target.value)}
          ></input>
        </p>
        <p>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          ></input>
        </p>
        <button type="submit">Create Account</button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DevCreationForm;
