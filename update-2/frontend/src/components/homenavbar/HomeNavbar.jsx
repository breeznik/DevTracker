import { useEffect, useContext } from "react";
import "./homenav.scss";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "../adminnav/AdminNav";
import { LocalContext } from "../../context/localContext";
import DevNav from "../../dev/components/devnav/DevNav";
import { UserContext } from "../../context/userContext";
import { DevLocalContext } from "../../dev/Context/devLocalContext";

const HomeNavbar = ({ setActiveForm, activeForm }) => {
  const { navbar } = useContext(LocalContext);
  const { devnavbar } = useContext(DevLocalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const devinfo = localStorage.getItem("Devinfo");
    if (userInfo) {
      navigate("/admin/dashboard");
    } else if (devinfo) {
      navigate("/dev/dashboard");
    }
  }, []);

  const handleClick = (form) => {
    setActiveForm(form);
  };

  if (navbar === "admin") {
    return <AdminNav> </AdminNav>;
  }

  if (devnavbar === "dev") {
    return <DevNav></DevNav>;
  }

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link className="link" to="/">
            DevTracker
          </Link>
        </div>
        <div className="links">
          <Link className="link" onClick={() => handleClick("login")} to="/">
            Login
          </Link>
          <Link
            className="link"
            onClick={() => handleClick("adminlogin")}
            to="/"
          >
            Admin
          </Link>
        </div>
        <div className="aboutus">
          <Link className="link" onClick={() => handleClick("aboutus")}>
            AboutUs
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
