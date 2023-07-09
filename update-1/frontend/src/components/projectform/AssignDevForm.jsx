import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./projectformcss/assigndevform.scss";
import backarrow2 from "../../assets/leftarrow2.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { LocalContext } from "../../context/localContext";

const AssignDevForm = (props) => {
  const { userdata, setUserEffect } = useContext(UserContext);
  const { project, setproject, projectschema } = useContext(LocalContext);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (!userdata) {
      setUserEffect(Math.random().toString(36).substring(2, 4));
    }
    setproject({ ...project, assignedDev: selectedOptions });
  }, [selectedOptions]);

  const back = () => {
    props.setformindex(props.formindex - 1);
  };

  const handleSelection = (devobjectid) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(devobjectid)) {
        // If the element exists in the array, remove it
        return prevOptions.filter((option) => option !== devobjectid);
      } else {
        // If the element doesn't exist, add it
        return [...prevOptions, devobjectid];
      }
    });
  };

  const projectsubmit = async () => {
    if (selectedOptions.length === 0) {
      return toast.warn("Assign A Dev to Project", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/admin/addproject`,
        {
          adminid: userdata.id,
          projectName: project.projectName,
          description: project.projectDiscription,
          dueDate: project.projectDueDate,
          modules: project.projectModules,
          assignedDev: project.assignedDev,
        }
      );

      setproject(projectschema);
      props.setformindex(0);
      localStorage.clear("Projectinfo");
      setUserEffect(Math.random().toString(36).substring(2, 4));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="assigndev">
      <div className="background">
        <img className="backarrow" onClick={back} src={backarrow2} alt="Icon" />
        <div className="heading">Assign Devs</div>
        <div className="mbackground">
          {userdata.devs.map((dev, index) => (
            <li
              key={index}
              value={dev.devname}
              onClick={() => handleSelection(dev._id)}
              style={
                selectedOptions.includes(dev._id)
                  ? { backgroundColor: "rgba(62, 128, 116, 0.6)" }
                  : {}
              }
            >
              {dev.devname}
            </li>
          ))}
        </div>
        <div className="buttons">
          <button onClick={projectsubmit}>FINISH</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AssignDevForm;
