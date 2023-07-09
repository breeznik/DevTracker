import React from "react";
import DevCreationForm from "../../components/devsignup/devCreationForm";
import "./adminAppCss/add_dev.scss";
import DevDisplay from "../../components/devsignup/DevDisplay";
const AdminAddDev = () => {
  return (
    <div className="devcreationpage">
      <DevCreationForm></DevCreationForm>
      <DevDisplay></DevDisplay>
    </div>
  );
};

export default AdminAddDev;
