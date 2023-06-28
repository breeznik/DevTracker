import React, { useContext, useState } from "react";
import "./adminlogin.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/userContext";
import { LocalContext } from "../../context/localContext";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { setuserdata } = useContext(UserContext);
  const { navbar, setnavbar } = useContext(LocalContext);

  const handlesubmission = async (s) => {
    if (!password || !email === "") {
      return toast.error("Please fill on all the fields", {
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

    //connection to login and register
    try {
      const response = await axios.post(`http://localhost:5000/user/${s}`, {
        email,
        password,
        type: "admin",
      });

      if (response) {
        localStorage.setItem("userinfo", JSON.stringify(response.data.user)); //local storage
        setuserdata(response.data.user); //context data
        console.log("response ", response);
        //checkmark
        console.log(
          "admin login page -> ",
          "local storage : ",
          JSON.parse(localStorage.getItem("userinfo"))
        );

        //navigation bar setup to local storage
        localStorage.setItem("navbar", "admin");
        //navigation after login
        navigate("/admin/dashboard");
        //context for navigation bar
        setnavbar("admin");

        //checkmark
        console.log(navbar);

        // Reset the form
        setemail("");
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
    <div className="adminlogin">
      <div className="background">
        <div className="formcontent">
          <p>
            <label>mail ID</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            ></input>
          </p>
          <p>
            <label>Passowrd</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            ></input>
          </p>
        </div>
        <div className="button">
          <button onClick={() => handlesubmission("login")}>login</button>
          <button onClick={() => handlesubmission("register")}>Register</button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
