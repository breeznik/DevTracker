import "./adminAppCss/addproject.scss";
import ProjectForm from "../../components/projectform/ProjectForm";
import { useState } from "react";
import Moduleform from "../../components/projectform/Moduleform";
import AssignDevForm from "../../components/projectform/AssignDevForm";
// import { UserContext } from "../../context/userContext";

const AdminAddProject = () => {
  //index number to show form array
  const [formindex, setformindex] = useState(0);
  // const { userdata, fetchdata } = useContext(UserContext);

  const formarray = [
    <ProjectForm
      formindex={formindex}
      setformindex={setformindex}
    ></ProjectForm>,
    <Moduleform formindex={formindex} setformindex={setformindex}></Moduleform>,
    <AssignDevForm
      formindex={formindex}
      setformindex={setformindex}
    ></AssignDevForm>,
  ];

  return formarray[formindex];
};

export default AdminAddProject;
