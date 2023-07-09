import "./devdisplay.scss";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import del from "../../assets/minus.png";
import axios from "axios";

const DevDisplay = () => {
  const { userdata, setuserdata } = useContext(UserContext);

  const deleter = async (devid) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/${devid}`
      );
      if (response.data) {
        const updatedDevs = userdata.devs.filter(
          (dev) => dev.devid !== response.data.devid
        );
        setuserdata({ ...userdata, devs: updatedDevs });
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
                onClick={() => deleter(dev.devid)}
              />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default DevDisplay;
