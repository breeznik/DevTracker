import "./devdisplay.scss";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import del from "../../assets/minus.png";
import axios from "axios";

const DevDisplay = () => {
  const { userdata, setuserdata, setUserEffect } = useContext(UserContext);
  const [hit, sethit] = useState("");

  useEffect(() => {
    if (userdata.devs === undefined) {
      // setuserdata(JSON.parse(localStorage.getItem("userinfo")));
      // console.log(
      //   "usereffect hit by display : ",
      //   JSON.parse(localStorage.getItem("userinfo"))
      // );
    }
  }, [hit]);

  const deleter = async (devid) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/${devid}`
      );
      if (response) {
        console.log(response.data.user);
        setUserEffect(Math.random().toString(36).substring(2, 4));
        // sethit(Math.random().toString(36).substring(2, 4));
      } else {
        console.log("no response ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!userdata?.devs || userdata?.devs.length === 0) {
    console.log("Array is empty");
    return null; // Return null when userdata.devs is undefined or the array is empty, component won't be rendered
  }

  return (
    <div className="devlist">
      <div className="heading">Devs</div>
      <div className="devnames">
        {userdata.devs.map((dev, index) => {
          return (
            <li key={index}>
              <span className="indexvalue">{index + 1}.</span> {dev.devname}
              <img
                className="del"
                src={del}
                alt="Icon"
                onClick={() => deleter(dev._id)}
              />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default DevDisplay;
