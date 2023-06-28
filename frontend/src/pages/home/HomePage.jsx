import React, { useContext, useEffect } from "react";
import AdminLoginForm from "../../components/adminlogin/AdminLoginForm";
import DevLoginForm from "../../dev/components/devlogin/DevLoginForm";
import "./homepage.scss";
import { AboutUs } from "./AboutUs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { DevContext } from "../../dev/Context/devContext";

const HomePage = ({ activeForm }) => {
  const { userdata, setuserdata } = useContext(UserContext);
  const { setdevData } = useContext(DevContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("homepage hit -----------");

    const logged = JSON.parse(localStorage.getItem("userinfo"));
    const devlogged = JSON.parse(localStorage.getItem("Devinfo"));

    if (logged) {
      setuserdata(JSON.parse(localStorage.getItem("userinfo")));
      localStorage.setItem("navbar", "admin");
      navigate("/admin/dashboard");
    } else if (devlogged) {
      setdevData(JSON.parse(localStorage.getItem("Devinfo")));
      localStorage.setItem("navbar", "dev");
      navigate("/dev/dashboard");
    } else {
      localStorage.clear();
      navigate("/");
    }
  }, []);
  return (
    <div className="homepage">
      {activeForm === "login" && <DevLoginForm />}
      {activeForm === "adminlogin" && <AdminLoginForm />}
      {activeForm === "aboutus" && <AboutUs />}
    </div>
  );
};

export default HomePage;
